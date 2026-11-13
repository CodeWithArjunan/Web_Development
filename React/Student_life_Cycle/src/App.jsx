import { useEffect, useState } from "react";
import { applicants as sampleApplicants, seedAudit } from "./adminData";
import {
  AdmissionCycle,
  AdmissionHistory,
  Applications,
  AuditLogs,
  DocumentVerification,
  FinalApplications,
  Overview,
  Profile,
  Settings,
  ShortlistedApplications,
  StaffReview,
} from "./components/AdmissionManagement";
import {
  AdminHeader,
  AdminSidebar,
} from "./components/AdmissionManagement/AdminShell";
import {
  EducationInformation,
  ParentInformation,
  PersonalInformation,
  ReviewSubmission,
  StudentDashboard,
  SiblingInformation,
  StudentLogin,
} from "./components/MaatramStudentAdmission";
import { createPendingApplicationStages } from "./components/MaatramStudentAdmission/applicationStatus";
import Home from "./pages/Home";
import "./App.css";

const admissionPages = {
  Dashboard: Overview,
  "Admission Cycles": AdmissionCycle,
  Applications,
  "Document Verification": DocumentVerification,
  "Staff Review": StaffReview,
  "Shortlisted Applicants": ShortlistedApplications,
  "Final Approvals": FinalApplications,
  "Admission History": AdmissionHistory,
  "Audit Logs": AuditLogs,
  Settings,
  "My Profile": Profile,
};

const initialStudentDraft = {
  fullName: "",
  emailAddress: "",
  phoneNumber: "",
  dob: "",
  photoName: "",
  gender: "",
  aadhaarNumber: "",
  community: "",
  permanentAddress: "",
  sameAddress: false,
  temporaryAddress: "",
  parentStatus: "Both parents",
  siblings: [],
  noSiblings: false,
  subjectMarks: {},
  educationDeclaration: false,
  submitted: false,
};

function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // The app remains usable if browser storage is disabled.
    }
  }, [key, value]);
  useEffect(() => {
    const syncFromAnotherTab = (event) => {
      if (event.key !== key || event.newValue === null) return;
      try {
        setValue(JSON.parse(event.newValue));
      } catch {
        // Ignore a value written by an interrupted or incompatible update.
      }
    };
    window.addEventListener("storage", syncFromAnotherTab);
    return () => window.removeEventListener("storage", syncFromAnotherTab);
  }, [key]);
  return [value, setValue];
}

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [applicants, setApplicants] = usePersistentState(
    "maatram:applicants",
    sampleApplicants,
  );
  const [studentDraft, setStudentDraft] = usePersistentState(
    "maatram:student-application",
    initialStudentDraft,
  );
  const [selectedApplicantId, setSelectedApplicantId] = useState(
    sampleApplicants[0].id,
  );
  const [query, setQuery] = useState("");
  const [cycle, setCycle] = useState("AY 2025-26");
  const [toast, setToast] = useState("");
  const [audit, setAudit] = usePersistentState("maatram:audit", seedAudit);
  const [cycles, setCycles] = usePersistentState("maatram:cycles", [
    {
      name: "AY 2025-26",
      applications: 4820,
      seats: 500,
      status: "Active",
      deadline: "30 Jun 2026",
    },
    {
      name: "AY 2024-25",
      applications: 4380,
      seats: 480,
      status: "Closed",
      deadline: "15 Jun 2025",
    },
  ]);
  const [settings, setSettings] = usePersistentState("maatram:settings", {
    email: true,
    reminders: true,
    audit: true,
    compact: false,
  });
  const [profile, setProfile] = usePersistentState("maatram:profile", {
    name: "Dr. Anand Kumar",
    email: "anand.kumar@example.test",
  });

  useEffect(() => {
    if (!studentDraft.submitted || !studentDraft.applicationId) return;
    setApplicants((items) => {
      if (items.some((item) => item.id === studentDraft.applicationId))
        return items;
      const submittedAt = studentDraft.submittedAt || new Date().toISOString();
      return [
        {
          id: studentDraft.applicationId,
          name: studentDraft.fullName,
          initials: studentDraft.fullName
            .trim()
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
          district: studentDraft.district || "Not provided",
          email: studentDraft.emailAddress,
          phone: studentDraft.phoneNumber,
          course: studentDraft.course || "Not provided",
          quota: studentDraft.quota || "General",
          date: new Date(submittedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          status: "Pending",
          score: Number(studentDraft.hscMarks) || 0,
          verification: "Action needed",
          reviewer: "Unassigned",
          docs: Array.from({ length: 7 }, () => "Pending"),
          cycle,
          statusStages: createPendingApplicationStages(),
        },
        ...items,
      ];
    });
  }, [
    studentDraft.submitted,
    studentDraft.applicationId,
    studentDraft.submittedAt,
    studentDraft.fullName,
    studentDraft.district,
    studentDraft.emailAddress,
    studentDraft.phoneNumber,
    studentDraft.course,
    studentDraft.quota,
    studentDraft.hscMarks,
    cycle,
    setApplicants,
  ]);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.toastTimer);
    window.toastTimer = window.setTimeout(() => setToast(""), 3200);
  };
  const addAudit = (action) => {
    if (!settings.audit) return;
    setAudit((items) => [
      { actor: profile.name, action, time: "Just now", type: "Admin action" },
      ...items,
    ]);
  };
  const go = (page, applicantId) => {
    setActivePage(page);
    if (applicantId) setSelectedApplicantId(applicantId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const updateStudentField = (key, value) =>
    setStudentDraft((draft) => ({ ...draft, [key]: value }));
  const saveStudentDraft = () => {
    setStudentDraft((draft) => ({
      ...draft,
      savedAt: new Date().toISOString(),
    }));
    notify("Your progress has been saved on this device.");
  };
  const createCycle = () => {
    const year = 2026 + cycles.length - 1;
    const name = `AY ${year}-${String((year + 1) % 100).padStart(2, "0")}`;
    if (cycles.some((item) => item.name === name))
      return notify(`${name} already exists.`);
    setCycles((items) => [
      ...items,
      {
        name,
        applications: 0,
        seats: 500,
        status: "Draft",
        deadline: "Not set",
      },
    ]);
    setCycle(name);
    addAudit(`created ${name} admission cycle`);
    notify(`${name} draft cycle created.`);
    go("Admission Cycles");
  };
  const submitStudentApplication = () => {
    const personalRequired = ["fullName", "emailAddress", "phoneNumber", "dob"];
    const parentRequired =
      studentDraft.parentStatus === "Both parents"
        ? ["fatherName", "motherName"]
        : studentDraft.parentStatus === "Single parent"
          ? ["singleName"]
          : ["guardianName"];
    const educationRequired = ["sslcSchool", "sslcMarks", "hscSchool"];
    const marks = studentDraft.subjectMarks || {};
    const missingPersonal = personalRequired.some(
      (field) => !String(studentDraft[field] || "").trim(),
    );
    const missingParent =
      !studentDraft.parentStatus ||
      parentRequired.some((field) => !String(studentDraft[field] || "").trim());
    const missingEducation =
      educationRequired.some(
        (field) => !String(studentDraft[field] || "").trim(),
      ) ||
      ["physics", "chemistry", "mathematics"].some(
        (field) => !String(marks[field] || "").trim(),
      ) ||
      !studentDraft.educationDeclaration;
    if (missingPersonal || missingParent || missingEducation) {
      const message = missingPersonal
        ? "Complete the required personal details before submitting."
        : missingParent
          ? "Complete the required parent or guardian details before submitting."
          : !studentDraft.educationDeclaration
            ? "Confirm your education details on the Educational Information page before submitting."
            : "Complete the school details and subject marks on the Educational Information page before submitting.";
      notify(message);
      go(
        missingPersonal
          ? "PersonalInformation"
          : missingParent
            ? "ParentInformation"
            : "EducationInformation",
      );
      return false;
    }
    const applicationId =
      studentDraft.applicationId || `MTR-DEMO-${String(Date.now()).slice(-6)}`;
    const submittedAt = new Date().toISOString();
    const submittedApplicant = {
      id: applicationId,
      name: studentDraft.fullName,
      initials: studentDraft.fullName
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      district: studentDraft.district || "Not provided",
      email: studentDraft.emailAddress,
      phone: studentDraft.phoneNumber,
      course: studentDraft.course || "Not provided",
      quota: studentDraft.quota || "General",
      date: new Date(submittedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
      score: Number(studentDraft.hscMarks) || 0,
      verification: "Action needed",
      reviewer: "Unassigned",
      docs: Array.from({ length: 7 }, () => "Pending"),
      cycle,
      statusStages: createPendingApplicationStages(),
    };
    setApplicants((items) =>
      items.some((item) => item.id === applicationId)
        ? items
        : [submittedApplicant, ...items],
    );
    setStudentDraft((draft) => ({
      ...draft,
      applicationId,
      submittedAt,
      submitted: true,
    }));
    go("StudentDashboard");
    notify("Your demo application has been submitted.");
    return true;
  };

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("global-search")?.focus();
      }
      if (event.key === "Escape") setQuery("");
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const studentProps = {
    data: studentDraft,
    onChange: updateStudentField,
    onSave: saveStudentDraft,
    onNavigate: go,
    onHome: () => go("Home"),
  };
  let page;
  if (activePage === "Home") {
    page = (
      <Home
        onStudentLogin={() => go("StudentLogin")}
        onAdminLogin={() => go("Dashboard")}
      />
    );
  } else if (activePage === "StudentLogin") {
    page = (
      <StudentLogin
        onHome={() => go("Home")}
        onToast={notify}
        onLogin={(username) => {
          if (
            studentDraft.submitted &&
            username.trim().toLowerCase() !==
              studentDraft.emailAddress.trim().toLowerCase()
          ) {
            notify("This local application belongs to a different email address.");
            return;
          }
          go(
            studentDraft.submitted
              ? "StudentDashboard"
              : "PersonalInformation",
          );
          notify("Signed in to the local student application demo.");
        }}
      />
    );
  } else if (activePage === "PersonalInformation") {
    page = <PersonalInformation {...studentProps} />;
  } else if (activePage === "ParentInformation") {
    page = <ParentInformation {...studentProps} />;
  } else if (activePage === "SiblingInformation") {
    page = <SiblingInformation {...studentProps} />;
  } else if (activePage === "EducationInformation") {
    page = <EducationInformation {...studentProps} />;
  } else if (
    activePage === "StudentDashboard" ||
    (activePage === "ReviewSubmission" && studentDraft.submitted)
  ) {
    const ownApplication = applicants.find(
      (applicant) => applicant.id === studentDraft.applicationId,
    );
    page = (
      <StudentDashboard
        data={studentDraft}
        applicant={ownApplication}
        onLogout={() => go("Home")}
      />
    );
  } else if (activePage === "ReviewSubmission") {
    page = (
      <ReviewSubmission
        {...studentProps}
        onSubmit={submitStudentApplication}
        submitted={studentDraft.submitted}
      />
    );
  } else {
    const Page = admissionPages[activePage] || Overview;
    const currentCycleApplicants = applicants.filter(
      (applicant) => applicant.cycle === cycle,
    );
    const pageProps = {
      applicants,
      setApplicants,
      cycles,
      setCycles,
      settings,
      setSettings,
      profile,
      setProfile,
      audit,
      addAudit,
      onToast: notify,
      query,
      setQuery,
      go,
      cycle,
      setCycle,
      selectedId: selectedApplicantId,
      setSelectedId: setSelectedApplicantId,
      onNavigate: go,
    };
    if (activePage === "Dashboard") {
      pageProps.applicants = currentCycleApplicants;
      pageProps.go = go;
      pageProps.onExport = () => {
        const columns = [
          "id",
          "name",
          "district",
          "course",
          "status",
          "verification",
          "score",
        ];
        const quote = (value) =>
          `"${String(value ?? "").replaceAll('"', '""')}"`;
        const csv = [
          columns.join(","),
          ...currentCycleApplicants.map((applicant) =>
            columns.map((column) => quote(applicant[column])).join(","),
          ),
        ].join("\r\n");
        const link = document.createElement("a");
        link.href = URL.createObjectURL(
          new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }),
        );
        link.download = "maatram-admission-summary.csv";
        document.body.append(link);
        link.click();
        link.remove();
      };
    }
    if (activePage === "Applications") pageProps.cycles = cycles;
    page = (
      <div className="admin-shell">
        <AdminHeader {...pageProps} onNewCycle={createCycle} />
        <AdminSidebar active={activePage} go={go} onHome={() => go("Home")} />
        <main className="main-content">
          <Page {...pageProps} />
        </main>
      </div>
    );
  }

  return (
    <>
      {page}
      {toast && (
        <div className="toast" role="status">
          ✓ &nbsp;{toast}
        </div>
      )}
    </>
  );
}

export default App;


