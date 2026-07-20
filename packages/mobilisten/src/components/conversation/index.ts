import { getBase64EncodedImage, SalesIQConversationAttributes } from "@react-native-zohosalesiq/mobilisten-core";
import RNZohoSalesIQ from "../../commons/utils";
import { ZSIQConversationTypes, SalesIQConversationDataProvider } from "./types/Conversation";
import { NativeEventEmitter } from "react-native";

// Store the conversation data provider globally
let conversationDataProvider: SalesIQConversationDataProvider | null = null;

// Create event emitter for conversation events
let conversationEventEmitter: NativeEventEmitter | null = null;

const ConversationBridgeEvents = {
    SECRET_FIELDS_REQUEST: 'conversationSecretFieldsRequest',
    SECRET_FIELDS_RESPONSE: 'conversationSecretFieldsResponse',
    DISPLAY_FIELDS_REQUEST: 'conversationDisplayFieldsRequest',
    DISPLAY_FIELDS_RESPONSE: 'conversationDisplayFieldsResponse',
} as const;

// Set up event listeners for conversation delegate calls from native
const setupConversationEventListeners = () => {
    if (conversationEventEmitter) {
        return; // Already set up
    }
    
    try {
        conversationEventEmitter = new NativeEventEmitter(RNZohoSalesIQ);
        
        // Listen for secret fields request from native
        conversationEventEmitter.addListener(ConversationBridgeEvents.SECRET_FIELDS_REQUEST, async (event) => {
            if (!conversationDataProvider) {
                return;
            }

            const requestId = event?.requestId;
            if (!requestId) {
                return;
            }
            
            try {
                // Use the getSecretFields method if provided, otherwise return empty object
                const fields = conversationDataProvider.getSecretFields
                    ? await conversationDataProvider.getSecretFields(event.chat)
                    : {};
                // Send results back to native via sendEvent
                RNZohoSalesIQ.sendEvent(ConversationBridgeEvents.SECRET_FIELDS_RESPONSE, [{ requestId, fields: fields ?? {} }]);
            } catch (error) {
                console.error(`Error in ${ConversationBridgeEvents.SECRET_FIELDS_REQUEST}:`, error);
                RNZohoSalesIQ.sendEvent(ConversationBridgeEvents.SECRET_FIELDS_RESPONSE, [{ requestId, fields: {} }]);
            }
        });
        
        // Listen for display fields request from native
        conversationEventEmitter.addListener(ConversationBridgeEvents.DISPLAY_FIELDS_REQUEST, async (event) => {
            if (!conversationDataProvider) {
                return;
            }

            const requestId = event?.requestId;
            if (!requestId) {
                return;
            }
            
            try {
                // Use the getDisplayFields method if provided, otherwise return empty object
                const fields = conversationDataProvider.getDisplayFields
                    ? await conversationDataProvider.getDisplayFields(event.chat) : {};
                // Send results back to native via sendEvent
                RNZohoSalesIQ.sendEvent(ConversationBridgeEvents.DISPLAY_FIELDS_RESPONSE, [{ requestId, fields: fields ?? {} }]);
            } catch (error) {
                console.error(`Error in ${ConversationBridgeEvents.DISPLAY_FIELDS_REQUEST}:`, error);
                RNZohoSalesIQ.sendEvent(ConversationBridgeEvents.DISPLAY_FIELDS_RESPONSE, [{ requestId, fields: {} }]);
            }
        });
    } catch (error) {
        console.warn('Could not set up conversation event listeners:', error);
    }
};

export const ZSIQConversation = {
    Conversation: {
        getDepartments: function () {
            return RNZohoSalesIQ.fetchDepartments();
        },
        setAttributes: async function (attributes: SalesIQConversationAttributes) {
            let dp = attributes?.displayPicture;
            let base64Image = await getBase64EncodedImage(dp);
            let finalAttributes = {
                ...attributes,
                displayPicture: base64Image
            };
            return RNZohoSalesIQ.setAttributes(finalAttributes);
        },
        
        /**
         * Set the conversation data provider with async callbacks
         * @param dataProvider - Object with getSecretFields and getDisplayFields async functions
         * 
         * @example
         * const conversationDataProvider: SalesIQConversationDataProvider = {
         *   getSecretFields: async (conversation) => {
         *     return {
         *       "token": "secret_token_123",
         *       "sessionId": conversation.id
         *     };
         *   },
         *   getDisplayFields: async (conversation) => {
         *     return {
         *       "topic": "Support Request",
         *       "department": conversation.departmentName ?? "general"
         *     };
         *   }
         * };
         * 
         * ZohoSalesIQ.Conversation.setDataProvider(conversationDataProvider);
         */
        setDataProvider: function (dataProvider: SalesIQConversationDataProvider) {
            conversationDataProvider = dataProvider;
            setupConversationEventListeners();

            // Notify native with only bridge-safe provider capability flags.
            RNZohoSalesIQ.setDataProvider({
                secretFieldsEnabled: !!dataProvider.getSecretFields,
                customInfoEnabled: !!dataProvider.getDisplayFields,
            });
        }
    }
};

export const ZSIQConversationAPI = {
    ...ZSIQConversation
} as ZSIQConversationTypes;