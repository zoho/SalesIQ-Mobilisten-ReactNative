/**
 * The `ChatActions` namespace mirrors the native `ZohoSalesIQ.ChatActions` API — it lets
 * you register custom actions (buttons) that appear in the chat and are handled by your app.
 *
 * Register an action, then respond to it via the
 * {@link ZSIQListenerEventsType.EVENT_PERFORM_CHAT_ACTION chat-action event listener}.
 *
 * > Note: native registers an action *object* (with a display label and type). The RN bridge
 * > currently registers by action **name** only; richer object-based registration is pending a
 * > native-bridge addition.
 */
export interface ZSIQChatActionsTypes {
  /** The custom chat action methods exposed under `ZohoSalesIQ.ChatActions`. */
  ChatActions: {
    /**
     * Registers a custom chat action by name so it can be surfaced in the chat window.
     *
     * @param actionName - The unique name of the custom action (must match the action configured in the SalesIQ portal).
     *
     * @example
     * ```ts
     * ZohoSalesIQ.ChatActions.register('escalate_to_human');
     * ```
     */
    register: (actionName: string) => void;

    /**
     * Unregisters a previously registered custom chat action.
     *
     * @param actionName - The name of the action to unregister.
     */
    unregister: (actionName: string) => void;

    /**
     * Unregisters every custom chat action registered via {@link register}.
     */
    unregisterAll: () => void;

    /**
     * Sets how long the SDK waits for your app to handle a custom action before timing out.
     *
     * @param timeoutInSec - The timeout, in seconds.
     */
    setTimeout: (timeoutInSec: number) => void;
  };
}
