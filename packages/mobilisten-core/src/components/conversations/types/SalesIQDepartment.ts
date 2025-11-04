import { CommunicationMode } from "../../core/enums/salesiq_core_enums";

/* ----------  Department  ---------- */
interface SalesIQDepartmentBase {
  available?: boolean;
  communicationMode: CommunicationMode;
}

export type SalesIQDepartment =
  | (SalesIQDepartmentBase & { id: string; name?: string })
  | (SalesIQDepartmentBase & { name: string; id?: string });