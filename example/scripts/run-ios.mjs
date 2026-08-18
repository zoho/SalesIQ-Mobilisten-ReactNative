// Runs `react-native run-ios` with the push mode that matches config/push.ts (PUSH_MODE).
// Mirrors run-android.mjs: config/push.ts is the single source of truth for the dev flow.
//
// Before building, writes SIQPushMode to ios/mobilistensampleapp/Info.plist so the native
// AppDelegate sees the same mode that the JS layer is configured for.
//
// Also runs `pod install` automatically when Podfile.lock and Pods/Manifest.lock are out of sync,
// so the build never fails with the CocoaPods sandbox error.
//
// Any extra args are forwarded, and an explicit `--push-mode=...` wins over the configured default:
//   npm run ios                          → uses PUSH_MODE from config/push.ts
//   npm run ios -- --push-mode=js        → forces js mode (requires GoogleService-Info.plist)
import {execFileSync, execSync, spawnSync} from 'node:child_process';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const configPath = join(root, 'config', 'push.ts');
const infoPlist = join(root, 'ios', 'mobilistensampleapp', 'Info.plist');
const podfileLock = join(root, 'ios', 'Podfile.lock');
const manifestLock = join(root, 'ios', 'Pods', 'Manifest.lock');

/** Reads PUSH_MODE ('native' | 'js') from config/push.ts; defaults to 'native' if not found. */
function readPushMode() {
  try {
    const src = readFileSync(configPath, 'utf8');
    const match = src.match(/PUSH_MODE\s*=\s*['"](native|js)['"]/);
    return match ? match[1] : 'native';
  } catch {
    return 'native';
  }
}

/** Writes PUSH_MODE back to config/push.ts so the JS layer stays in sync with the native layer. */
function writePushMode(mode) {
  const src = readFileSync(configPath, 'utf8');
  const updated = src.replace(
    /PUSH_MODE\s*=\s*'(native|js)'\s*as\s*PushMode/,
    `PUSH_MODE = '${mode}' as PushMode`,
  );
  if (updated !== src) {
    writeFileSync(configPath, updated, 'utf8');
    console.log(`[run-ios] config/push.ts updated: PUSH_MODE="${mode}"`);
  }
}

/** Returns true if Podfile.lock and Pods/Manifest.lock differ (build would fail). */
function podSyncNeeded() {
  if (!existsSync(podfileLock) || !existsSync(manifestLock)) return true;
  return readFileSync(podfileLock, 'utf8') !== readFileSync(manifestLock, 'utf8');
}

/** Runs pod install, trying bundle exec first then falling back to the gem bin path. */
function podInstall() {
  console.log('[run-ios] Pods out of sync — running pod install...');
  const iosDir = join(root, 'ios');
  const gemfile = join(root, 'Gemfile');
  try {
    // Prefer bundle exec so the Gemfile-pinned CocoaPods version is used.
    execSync('bundle exec pod install', {
      cwd: iosDir,
      env: {...process.env, BUNDLE_GEMFILE: gemfile},
      stdio: 'inherit',
    });
  } catch {
    // Fallback: invoke pod directly from the user gem bin path.
    const podPath = `${process.env.HOME}/.gem/bin/pod`;
    execFileSync(podPath, ['install'], {cwd: iosDir, stdio: 'inherit'});
  }
}

const passthrough = process.argv.slice(2);
const explicitFlag = passthrough.find(arg => arg.startsWith('--push-mode='));
const mode = explicitFlag ? explicitFlag.split('=')[1] : readPushMode();
const rnArgs = passthrough.filter(arg => !arg.startsWith('--push-mode='));

// When mode is explicit, write it back so config/push.ts (JS layer) matches the native layer.
if (explicitFlag) {
  writePushMode(mode);
}

// Sync SIQPushMode in Info.plist before the Xcode build reads it.
console.log(`[run-ios] PUSH_MODE="${mode}" (config/push.ts) → setting SIQPushMode=${mode} in Info.plist`);
execFileSync('/usr/libexec/PlistBuddy', ['-c', `Set :SIQPushMode ${mode}`, infoPlist]);

if (podSyncNeeded()) {
  podInstall();
}

const result = spawnSync('npx', ['react-native', 'run-ios', ...rnArgs], {stdio: 'inherit'});
process.exit(result.status ?? 1);
