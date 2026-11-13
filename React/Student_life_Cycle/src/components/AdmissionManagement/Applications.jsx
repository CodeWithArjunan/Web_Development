import { Fragment, useMemo, useState } from "react";
import downloadCsv from "../../utils/downloadCsv";
import {
  APPLICATION_STATUS_OPTIONS,
  APPLICATION_STATUS_STAGES,
  createPendingApplicationStages,
} from "../MaatramStudentAdmission/applicationStatus";

const cycleOptions = ["AY 2025-26", "AY 2024-25", "AY 2023-24"];
import { PageHeading } from "./shared";

export default function Applications({
  applicants,
  setApplicants,
  query,
  setQuery,
  cycle,
  setCycle,
  cycles,
  onNavigate,
  addAudit,
  onToast,
}) {
  const [status, setStatus] = useState("All statuses");
  const [verification, setVerification] = useState("All documents");
  const [quota, setQuota] = useState("All streams & quotas");
  const [sort, setSort] = useState("Newest first");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [statusEditorId, setStatusEditorId] = useState(null);

  const updateApplicationStage = (applicant, stage, value) => {
    const statusStages = {
      ...createPendingApplicationStages(),
      ...applicant.statusStages,
      [stage.key]: value,
    };
    const finalApplicationStatus =
      stage.key !== "finalStatus"
        ? {}
        : {
            status:
              value === "Completed"
                ? "Approved"
                : value === "Rejected"
                  ? "Rejected"
                  : "Under review",
          };
    setApplicants((items) =>
      items.map((item) =>
        item.id === applicant.id
          ? { ...item, statusStages, ...finalApplicationStatus }
          : item,
      ),
    );
    addAudit(`${stage.label} for ${applicant.id} marked ${value.toLowerCase()}`);
    onToast(`${stage.label} status updated.`);
  };

  const filtered = useMemo(() => {
    const searchText = query.trim().toLowerCase();
    return applicants
      .filter((applicant) => {
        const matchesSearch =
          !searchText ||
          [
            applicant.id,
            applicant.name,
            applicant.district,
            applicant.email,
            applicant.course,
            applicant.quota,
          ].some((value) => value.toLowerCase().includes(searchText));
        return (
          matchesSearch &&
          (status === "All statuses" || applicant.status === status) &&
          (verification === "All documents" ||
            applicant.verification === verification) &&
          (quota === "All streams & quotas" || applicant.quota === quota) &&
          applicant.cycle === cycle
        );
      })
      .sort((a, b) =>
        sort === "Highest score"
          ? b.score - a.score
          : sort === "Lowest score"
            ? a.score - b.score
            : applicants.indexOf(a) - applicants.indexOf(b),
      );
  }, [applicants, query, status, verification, quota, cycle, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const selectOne = (id) =>
    setSelected((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  const updateSelected = (nextStatus) => {
    if (!selected.length)
      return onToast("Select at least one applicant first.");
    setApplicants(
      applicants.map((applicant) =>
        selected.includes(applicant.id)
          ? { ...applicant, status: nextStatus }
          : applicant,
      ),
    );
    addAudit(
      `updated ${selected.length} selected applications to ${nextStatus.toLowerCase()}`,
    );
    onToast(`${selected.length} applicants updated.`);
    setSelected([]);
  };
  const resetFilters = () => {
    setQuery("");
    setStatus("All statuses");
    setVerification("All documents");
    setQuota("All streams & quotas");
    setCycle("AY 2025-26");
    setSort("Newest first");
    setPage(1);
  };
  const exportRows = () =>
    downloadCsv(
      "maatram-applications.csv",
      filtered.map(
        ({
          id,
          name,
          district,
          email,
          phone,
          course,
          quota,
          status: appStatus,
          verification: docs,
          score,
          reviewer,
        }) => ({
          id,
          name,
          district,
          email,
          phone,
          course,
          quota,
          status: appStatus,
          documents: docs,
          score,
          reviewer,
        }),
      ),
    );

  return (
    <>
      <PageHeading
        title={
          <>
            Applications Management{" "}
            <span className="count-pill">
              {filtered.length} shown · {applicants.length} sample records
            </span>
          </>
        }
        crumb="APPLICATIONS"
        subtitle="Search, filter, inspect, and process applicants across admission cycles"
      >
        <button className="button" onClick={exportRows}>
          ⇩ Export CSV
        </button>
        <button
          className="button button-primary"
          onClick={() => setSelected(visible.map((a) => a.id))}
        >
          Select page ({selected.length})
        </button>
      </PageHeading>
      <div className="mini-stats">
        {[
          [
            "UNDER REVIEW",
            applicants.filter((a) => a.status === "Under review").length,
          ],
          [
            "DOC ACTIONS",
            applicants.filter((a) => a.verification === "Action needed").length,
          ],
          [
            "SHORTLISTED",
            applicants.filter((a) => a.status === "Shortlisted").length,
          ],
          [
            "FINAL APPROVED",
            applicants.filter((a) => a.status === "Approved").length,
          ],
        ].map(([label, value]) => (
          <div key={label}>
            <small>{label}</small>
            <b>{value}</b>
          </div>
        ))}
      </div>
      <section className="panel filters">
        <div className="filter-line">
          <label className="search-field">
            ⌕
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search name, application ID, district, or course…"
            />
            <button aria-label="Clear search" onClick={() => setQuery("")}>
              ×
            </button>
          </label>
          <label className="sort-control">
            SORT
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option>Newest first</option>
              <option>Highest score</option>
              <option>Lowest score</option>
            </select>
          </label>
        </div>
        <div className="filter-selects">
          <label>
            ADMISSION CYCLE
            <select
              value={cycle}
              onChange={(event) => setCycle(event.target.value)}
            >
              {[
                ...new Set([
                  ...cycleOptions,
                  ...cycles.map((item) => item.name),
                ]),
              ].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            APPLICATION STATUS
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {[
                "All statuses",
                "Under review",
                "Pending",
                "Needs attention",
                "Shortlisted",
                "Approved",
                "Rejected",
              ].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            DOCUMENT VERIFICATION
            <select
              value={verification}
              onChange={(event) => setVerification(event.target.value)}
            >
              {["All documents", "Verified", "Action needed"].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            STREAM / QUOTA
            <select
              value={quota}
              onChange={(event) => setQuota(event.target.value)}
            >
              {[
                "All streams & quotas",
                ...new Set(applicants.map((a) => a.quota)),
              ].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="active-filters">
          Showing {filtered.length} matching records
          {query && <span>Search: “{query}”</span>}
          {status !== "All statuses" && <span>{status}</span>}
          {verification !== "All documents" && <span>{verification}</span>}
          {quota !== "All streams & quotas" && <span>{quota}</span>}
          <button onClick={resetFilters}>↻ Reset filters</button>
        </div>
      </section>
      {selected.length > 0 && (
        <div className="bulk-bar">
          <div>
            <b>{selected.length} applicants selected</b>
            <small>Use a bulk action to change their stage.</small>
          </div>
          <button
            className="button"
            onClick={() => updateSelected("Shortlisted")}
          >
            ✦ Shortlist
          </button>
          <button
            className="button button-primary"
            onClick={() => updateSelected("Approved")}
          >
            Approve
          </button>
          <button
            className="button danger"
            onClick={() => updateSelected("Rejected")}
          >
            Reject
          </button>
          <button className="clear" onClick={() => setSelected([])}>
            Clear selection
          </button>
        </div>
      )}
      <div className="panel table-panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    aria-label="Select visible applicants"
                    checked={
                      visible.length > 0 &&
                      visible.every((a) => selected.includes(a.id))
                    }
                    onChange={(event) =>
                      setSelected(
                        event.target.checked
                          ? [
                              ...new Set([
                                ...selected,
                                ...visible.map((a) => a.id),
                              ]),
                            ]
                          : selected.filter(
                              (id) => !visible.some((a) => a.id === id),
                            ),
                      )
                    }
                  />
                  )
                </th>
                <th>APPLICATION ID</th>
                <th>APPLICANT & DISTRICT</th>
                <th>CONTACT</th>
                <th>PROGRAM & QUOTA</th>
                <th>APPLIED</th>
                <th>STATUS</th>
                <th>DOCUMENTS</th>
                <th>APPLICATION PROGRESS</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((a) => (
                <Fragment key={a.id}>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Select ${a.name}`}
                      checked={selected.includes(a.id)}
                      onChange={() => selectOne(a.id)}
                    />
                  </td>
                  <td>
                    <b className="id-text">{a.id}</b>
                  </td>
                  <td>
                    <div className="person-cell">
                      <span
                        className={`person-avatar ${a.status === "Needs attention" ? "red" : "blue"}`}
                      >
                        {a.initials}
                      </span>
                      <div>
                        <b>{a.name}</b>
                        <small>⌖ {a.district}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    {a.email}
                    <small>{a.phone}</small>
                  </td>
                  <td>
                    {a.course}
                    <small className="sub-row">{a.quota}</small>
                  </td>
                  <td>{a.date}</td>
                  <td>
                    <span
                      className={`status ${a.status === "Approved" ? "green" : a.status === "Rejected" ? "red" : a.status === "Shortlisted" ? "gold" : a.status === "Needs attention" ? "pink" : "blue"}`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="text-link"
                      onClick={() => onNavigate("Document Verification", a.id)}
                    >
                      Review →
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-link"
                      aria-expanded={statusEditorId === a.id}
                      onClick={() =>
                        setStatusEditorId(statusEditorId === a.id ? null : a.id)
                      }
                    >
                      {statusEditorId === a.id ? "Close progress" : "Update progress"}
                    </button>
                  </td>
                </tr>
                {statusEditorId === a.id && (
                  <tr key={`${a.id}-progress`}>
                    <td colSpan="9">
                      <div className="application-stage-editor">
                        <div>
                          <b>Admission progress · {a.id}</b>
                          <small>Changes are saved immediately and visible to the linked student.</small>
                        </div>
                        {APPLICATION_STATUS_STAGES.map((stage) => (
                          <label key={stage.key}>
                            {stage.label}
                            <select
                              value={a.statusStages?.[stage.key] || "Pending"}
                              onChange={(event) =>
                                updateApplicationStage(a, stage, event.target.value)
                              }
                            >
                              {APPLICATION_STATUS_OPTIONS.map((option) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          </label>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
                </Fragment>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td className="empty-cell" colSpan="9">
                    No applicants match these filters. Try resetting the search
                    or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>
            Showing {filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–
            {Math.min(currentPage * pageSize, filtered.length)} of{" "}
            {filtered.length} records
          </span>
          <div>
            <label>
              Rows per page{" "}
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
              >
                {[5, 10, 25].map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </label>
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            <span className="page-current">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
