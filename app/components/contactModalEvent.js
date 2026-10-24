// Contact links anywhere in the nav open the contact modal (owned by CaseNav)
// instead of leaving the page. Modified clicks still follow the /contact link.
export const CONTACT_OPEN_EVENT = "contact:open";

export function openContactFromClick(e) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return false;
  e.preventDefault();
  window.dispatchEvent(new Event(CONTACT_OPEN_EVENT));
  return true;
}
