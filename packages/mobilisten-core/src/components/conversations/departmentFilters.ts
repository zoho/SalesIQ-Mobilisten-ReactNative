import { CommunicationMode } from '../core/enums/salesiq_core_enums';
import { SalesIQDepartment } from './types/SalesIQDepartment';

/**
 * Filters a department list to those usable for **chat** — i.e. `communicationMode` is `CHAT` or
 * `CHAT_AND_CALL`. Null-safe (returns `[]` for null/undefined).
 *
 * Cross-platform counterpart of the Android SDK's `List<SIQDepartment>.chatDepartments()` extension
 * (com.zoho.livechat.android.modules.extensions.SIQDepartmentExtensions). Use it after
 * `Conversation.getDepartments()` to show only chat-capable departments.
 */
export function chatDepartments(
  departments: SalesIQDepartment[] | null | undefined
): SalesIQDepartment[] {
  if (!departments) {
    return [];
  }
  return departments.filter(
    (department) =>
      department.communicationMode === CommunicationMode.CHAT ||
      department.communicationMode === CommunicationMode.CHAT_AND_CALL
  );
}

/**
 * Filters a department list to those usable for **calls** — i.e. `communicationMode` is `CALL` or
 * `CHAT_AND_CALL`. Null-safe (returns `[]` for null/undefined).
 *
 * Cross-platform counterpart of the Android SDK's `List<SIQDepartment>.callDepartments()` extension.
 * `CHAT_AND_CALL` departments intentionally appear in both {@link chatDepartments} and this list.
 */
export function callDepartments(
  departments: SalesIQDepartment[] | null | undefined
): SalesIQDepartment[] {
  if (!departments) {
    return [];
  }
  return departments.filter(
    (department) =>
      department.communicationMode === CommunicationMode.CALL ||
      department.communicationMode === CommunicationMode.CHAT_AND_CALL
  );
}
