import { SalesIQDepartment } from "./SalesIQDepartment";

export interface SalesIQConversationAttributes {
    name?: string | null;
    additionalInfo?: string | null;
    displayPicture?: any | null;
    departments?: SalesIQDepartment[] | null;
}