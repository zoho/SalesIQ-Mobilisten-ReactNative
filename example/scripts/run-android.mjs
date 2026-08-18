// Runs `react-native run-android` with the Android product flavor that matches the push mode configured
// in example/config/push.ts (PUSH_MODE). This keeps config/push.ts as the single source of truth for the
// dev flow: `npm run android` picks nativePushDebug or jsPushDebug automatically, instead of failing with
// "task 'installDebug' is ambiguous" (the pushMode flavor dimension removes the plain `debug` variant).
//
// Note: we resolve to a real variant and pass it via `--mode`, because the RN CLI uses the variant name
// for BOTH the install task and the post-install app launch — a fake `debug` alias would break the launch.
//
// Any extra args are forwarded, and an explicit `--mode=...` wins over the configured default:
//   npm run android                     → uses PUSH_MODE from config/push.ts
//   npm run android -- --mode=jsPushDebug  → forces that variant
import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const configPath = join(here, '..', 'config', 'push.ts');

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
    console.log(`[run-android] config/push.ts updated: PUSH_MODE="${mode}"`);
  }
}

const passthrough = process.argv.slice(2);
const explicitModeArg = passthrough.find(arg => arg.startsWith('--mode='));
const hasExplicitMode = passthrough.some(arg => arg === '--mode' || arg.startsWith('--mode='));

const args = ['react-native', 'run-android'];
if (!hasExplicitMode) {
  const mode = readPushMode();
  const variant = mode === 'js' ? 'jsPushDebug' : 'nativePushDebug';
  console.log(`[run-android] PUSH_MODE="${mode}" (config/push.ts) → building "${variant}"`);
  args.push(`--mode=${variant}`);
} else if (explicitModeArg) {
  // Sync config/push.ts so the JS layer matches the explicit native flavor.
  const variant = explicitModeArg.split('=')[1];
  const mode = variant.startsWith('js') ? 'js' : 'native';
  writePushMode(mode);
  console.log(`[run-android] explicit --mode="${variant}" → PUSH_MODE="${mode}"`);
}
args.push(...passthrough);

const result = spawnSync('npx', args, {stdio: 'inherit'});
process.exit(result.status ?? 1);
