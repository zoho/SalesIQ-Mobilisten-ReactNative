import { getBase64EncodedImage } from "@react-native-zohosalesiq/mobilisten-core";
import RNZohoSalesIQ from "../../commons/utils";
import { ZSIQConversationTypes } from "./types/Conversation";

export const ZSIQConversation = {
    Conversation: {
        getDepartments: function () {
            return RNZohoSalesIQ.fetchDepartments();
        },
        setAttributes: async function (attributes) {
            let dp = attributes?.displayPicture;
            let base64Image = await getBase64EncodedImage(dp);
            let finalAttributes = {
                ...attributes,
                displayPicture: base64Image
            };
            return RNZohoSalesIQ.setAttributes(finalAttributes);
        }
    }
} as ZSIQConversationTypes;