import type { CallbackError } from '../../../types/ZSIQWrapperTypes';

export interface ZSIQHelpCenterTypes {
  /** Namespace for the SalesIQ Help Center — presenting the AI assistant, knowledge base, or live-agent chat. */
  HelpCenter: {
    /**
     * Opens the Help Center interface — powered by an AI assistant, knowledge base, or live agent chat,
     * depending on your configuration.
     *
     * @param question - A question to start the conversation (optional).
     * @returns A promise that resolves with `true` when the Help Center is presented, and rejects with a {@link CallbackError} on failure.
     *
     * @example
     * ```ts
     * // Open the Help Center
     * ZohoSalesIQ.HelpCenter.ask();
     *
     * // Open with a prefilled question
     * ZohoSalesIQ.HelpCenter.ask('How can I reset my password?')
     *   .catch((error) => console.error(`Error code: ${error.code}, message: ${error.message}`));
     * ```
     */
    ask: (question?: string) => Promise<boolean>;
  };
}
