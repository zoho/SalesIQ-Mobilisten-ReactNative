/**
 * Holds the presentation mode used by the in-app call status view. The value is
 * read by the Android call status banner component to decide between a floating
 * or banner layout.
 */
class SalesIQCallsHelper {
  /** The current call status view mode. Defaults to `'floating'`. */
  static callStatusViewMode: 'floating' | 'banner' = 'floating';

  /**
   * Sets the call status view mode.
   *
   * @param mode - `'floating'` to show a floating view, `'banner'` to show a banner.
   */
  static setCallStatusViewMode(mode: 'floating' | 'banner') {
    this.callStatusViewMode = mode;
  }

  /**
   * Returns the current call status view mode.
   *
   * @returns The current mode, either `'floating'` or `'banner'`.
   */
  static getCallStatusViewMode(): 'floating' | 'banner' {
    return this.callStatusViewMode;
  }
}

export default SalesIQCallsHelper;
