/**
 * The `Tracking` namespace mirrors the native `ZohoSalesIQ.Tracking` API — it records
 * the visitor's in-app footpath so operators see which screens a visitor viewed.
 */
export interface ZSIQTrackingTypes {
  /** The visitor footpath tracking methods exposed under `ZohoSalesIQ.Tracking`. */
  Tracking: {
    /**
     * Records the title of the screen the visitor is currently viewing, adding it to
     * the visitor's footpath in the SalesIQ operator console.
     *
     * Call this on each screen navigation to build an accurate footpath trail.
     *
     * @param title - A human-readable title for the current screen (e.g. `"Cart"`, `"Product — Shoes"`).
     *
     * @example
     * ```ts
     * ZohoSalesIQ.Tracking.setPageTitle('Checkout');
     * ```
     */
    setPageTitle: (title: string) => void;
  };
}
