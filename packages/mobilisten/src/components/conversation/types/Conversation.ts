import { SalesIQConversationAttributes, SalesIQDepartment } from "@react-native-zohosalesiq/mobilisten-core";

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
    }
}