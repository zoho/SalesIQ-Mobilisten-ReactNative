/**
 * This file is part of the core package for the SalesIQ plugin.
 * It contains the configuration class for SalesIQ, which includes
 * the app key, access key, and optional call view mode.
 * The SalesIQConfiguration class is used to initialize
 * and manage the configuration settings for SalesIQ in an application.
 * Parameters:
 * - appKey: The unique key generated in SalesIQ.
 * - accessKey: The access key for the brand.
 * - androidCallViewMode: Optional parameter to set the call view mode.
 */

/**
 * The presentation style used for the in-app call status view on Android.
 */
export enum SalesIQCallViewMode {
  /** Show the ongoing-call status as a banner. */
  BANNER = 'BANNER',
  /** Show the ongoing-call status as a floating view. */
  FLOATING = 'FLOATING',
}

/**
 * Configuration for a single font role (e.g. regular or medium) in {@link SalesIQFonts}.
 */
export interface SalesIQFontConfig {
  /** Path/name of the font to apply. */
  path?: string;
}

/**
 * Custom fonts to be applied across the SDK UI.
 * Note: Wired through the native configuration on Android; iOS has no equivalent
 * configuration hook in the native SDK.
 */
export interface SalesIQFonts {
  /** The font used for regular-weight text. */
  regular?: SalesIQFontConfig;
  /** The font used for medium-weight text. */
  medium?: SalesIQFontConfig;
}

/**
 * The configuration used to initialize the SalesIQ SDK.
 */
export interface SalesIQConfiguration {
  /** The app key generated for your application in the SalesIQ portal. */
  appKey: string;
  /** The access key generated for your brand in the SalesIQ portal. */
  accessKey: string;
  /** The presentation style for the in-app call status view (Android only). */
  androidCallViewMode?: SalesIQCallViewMode | null;
  /**
   * Custom fonts for the SDK UI (Android only).
   */
  fonts?: SalesIQFonts | null;
}
