import { CommunicationMode } from '../../core/enums/salesiq_core_enums';

/* ----------  Department  ---------- */
/**
 * Common fields shared by every {@link SalesIQDepartment} variant.
 */
interface SalesIQDepartmentBase {
  /** Whether the department currently has operators available to attend conversations. */
  available?: boolean;
  /** The modes of communication (chat, call, or both) supported by the department. */
  communicationMode: CommunicationMode;
}

/**
 * A department that a chat or call can be routed to.
 *
 * At least one of `id` or `name` must be provided to identify the department; the
 * other is optional.
 */
export type SalesIQDepartment =
  | (SalesIQDepartmentBase & {
      /** The department's unique identifier. */
      id: string;
      /** The department's display name. */
      name?: string;
    })
  | (SalesIQDepartmentBase & {
      /** The department's display name. */
      name: string;
      /** The department's unique identifier. */
      id?: string;
    });
