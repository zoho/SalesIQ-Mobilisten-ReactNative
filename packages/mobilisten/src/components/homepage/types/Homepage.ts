/**
 * Represents the widget types available on the SalesIQ Homepage.
 *
 * Use with {@link ZSIQHomepageTypes.Homepage.setVisibility} to control
 * the visibility of individual homepage widgets.
 */
export enum SIQWidget {
  /** The chat widget to start a new conversation. */
  CHAT = 'HOMEPAGE_WIDGET_CHAT',
  /** The call widget to initiate a support call. */
  CALL = 'HOMEPAGE_WIDGET_CALL',
  /** The knowledge base articles widget. */
  ARTICLES = 'HOMEPAGE_WIDGET_ARTICLES',
  /** The widget displaying previous chat and call history. */
  PREVIOUS_CONVERSATION = 'HOMEPAGE_WIDGET_PREVIOUS_CONVERSATION',
  /** A card displaying a promotional or informational image. */
  IMAGE_CARD = 'HOMEPAGE_WIDGET_IMAGE_CARD',
  /** A card displaying a promotional or informational video. */
  VIDEO_CARD = 'HOMEPAGE_WIDGET_VIDEO_CARD',
}

export interface ZSIQHomepageTypes {
  /** Namespace for the SalesIQ Homepage — enabling it and controlling the visibility of individual widgets. */
  Homepage: {
    /**
     * Controls the visibility of individual widgets on the SalesIQ Homepage.
     *
     * @param widget - The widget type to control. Use {@link SIQWidget} values.
     * @param visible - `true` to show the widget, `false` to hide it.
     *
     * @example
     * ```ts
     * // Hide the chat widget
     * ZohoSalesIQ.Homepage.setVisibility(SIQWidget.CHAT, false);
     *
     * // Show the articles widget
     * ZohoSalesIQ.Homepage.setVisibility(SIQWidget.ARTICLES, true);
     * ```
     *
     * @see {@link SIQWidget} for all available widget types.
     */
    setVisibility: (widget: SIQWidget, visible: boolean) => void;

    /**
     * Enables or disables the entire SalesIQ Homepage.
     *
     * When disabled, the homepage will not be displayed or accessible to users.
     * This setting persists for the current session.
     *
     * @param enabled - `true` to enable the homepage, `false` to disable it.
     *
     * @example
     * ```ts
     * // Disable the homepage
     * ZohoSalesIQ.Homepage.setEnabled(false);
     *
     * // Enable the homepage
     * ZohoSalesIQ.Homepage.setEnabled(true);
     * ```
     */
    setEnabled: (enabled: boolean) => void;

    /** Available widget types for use with {@link setVisibility}. */
    Widget: typeof SIQWidget;
  };
}
