import { SalesIQConversationAttributes, SalesIQDepartment } from "@react-native-zohosalesiq/mobilisten-core";
import type { SalesIQChat } from "../../chat/types/SalesIQChat";

export interface ConversationDelegateFields {
    [key: string]: any;
}

/**
 * Conversation Data Provider for handling secret and display fields
 * Similar to Flutter's SalesIQConversationDataProvider
 * Both methods are optional - if not provided, empty objects will be returned
 */
export interface SalesIQConversationDataProvider {
    /**
     * Optional async callback to provide secret fields for a conversation
     * @param chat - The chat/conversation object
     * @returns Promise that resolves to secret fields object
     */
    getSecretFields?: (chat: SalesIQChat) => Promise<ConversationDelegateFields>;
    
    /**
     * Optional async callback to provide display fields for a conversation
     * @param chat - The chat/conversation object
     * @returns Promise that resolves to display fields object
     */
    getDisplayFields?: (chat: SalesIQChat) => Promise<ConversationDelegateFields>;
}

export interface ZSIQConversationTypes {
    Conversation: {
        /**
         * This API allows you to get a list of all the departments that have been associated with the brand in which Mobilisten is configured.
         * @param callback
         * @returns
         * A promise that resolves to an array of SalesIQDepartment objects.
         */
        getDepartments: () => Promise<SalesIQDepartment[]>;

        setAttributes: (attributes: SalesIQConversationAttributes) => Promise<void>;

        /**
         * Set the conversation data provider for handling secret and display fields
         * Both methods are optional - if not provided, empty objects will be returned by default
         * @param dataProvider - The data provider with optional getSecretFields and getDisplayFields callbacks
         * 
         * @example
         * ```typescript
         * // Full implementation with both methods
         * ZohoSalesIQ.Conversation.setDataProvider({
         *   getSecretFields: async (chat) => ({
         *     "token": "secret_token_123",
         *     "sessionId": chat.id
         *   }),
         *   getDisplayFields: async (chat) => ({
         *     "topic": "Support Request",
         *     "department": chat.departmentName ?? "general"
         *   })
         * });
         * 
         * // Minimal - empty object (returns empty fields)
         * ZohoSalesIQ.Conversation.setDataProvider({});
         *
         * // Partial - only secret fields
         * ZohoSalesIQ.Conversation.setDataProvider({
         *   getSecretFields: async (chat) => ({
         *     "apiKey": "secret_key_123",
         *     "chatId": chat.id
         *   })
         * });
         * ```
         */
        setDataProvider: (dataProvider: SalesIQConversationDataProvider) => void;
    };
}