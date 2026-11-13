export const APPLICATION_STATUS_OPTIONS = ["Pending", "Completed", "Rejected"];

export const APPLICATION_STATUS_STAGES = [
  { key: "documentVerification", label: "Document Verification" },
  { key: "telephoneVerification", label: "Telephone Verification" },
  { key: "physicalVerification", label: "Physical Verification" },
  { key: "onlineInterview", label: "Online Interview" },
  { key: "offlineInterview", label: "Offline Interview" },
  { key: "finalStatus", label: "Final Status" },
];

export function createPendingApplicationStages() {
  return Object.fromEntries(
    APPLICATION_STATUS_STAGES.map(({ key }) => [key, "Pending"]),
  );
}

export function normalizeApplicationStages(stages = {}) {
  return Object.fromEntries(
    APPLICATION_STATUS_STAGES.map(({ key }) => [
      key,
      APPLICATION_STATUS_OPTIONS.includes(stages[key])
        ? stages[key]
        : "Pending",
    ]),
  );
}
