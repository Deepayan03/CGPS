import React, { useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import StudentSidebar from "./StudentSidebar";

interface Job {
  _id: string;
  title: string;
  company: string;
  postedBy: string;
  salary: number;
  jobType: string;
  applications: string[];
}

interface Application {
  _id: string;
  student: string;
  job: Job;
  status: string;
  createdAt: string;
}

interface ApplicationsTableProps {
  applications: Application[];
  header: string;
  isAllJob?: boolean;
  isRecruiter?: boolean;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  header,
  isAllJob = false,
  isRecruiter = false,
}) => {
  const [applicationData, setApplications] = useState<Application[]>(applications);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const nodeRefs = useRef<Map<string, React.RefObject<HTMLTableRowElement>>>(new Map());

  const cancelApplication = async (applicationId: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/api/applications/cancel/${applicationId}`
      );
      toast.success(response.data.message);
      setApplications((prev) =>
        prev.filter((app) => app._id !== applicationId)
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to cancel application."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentSidebar >
      <div className="p-3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{header}</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse text-gray-700">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600 uppercase text-sm">
                <th className="p-4">Job Title</th>
                <th className="p-4">Company</th>
                <th className="p-4">Salary</th>
                <th className="p-4">Job Type</th>
                {isRecruiter ? (
                  <th className="p-4">Applicants</th>
                ) : (
                  <th className="p-4">Applications</th>
                )}
                <th className="p-4">Status</th>
                {!isRecruiter && <th className="p-4">Recruiter</th>}
                {!isRecruiter && !isAllJob && (
                  <th className="p-4">Cancel application</th>
                )}
            
                {!isRecruiter && isAllJob && (
                  <th className="p-4">View Job details</th>
                )}
              </tr>
            </thead>
            <TransitionGroup component="tbody">
              {applicationData.map((app) => {
                const id  = app._id;
                if (!nodeRefs.current.has(app._id)) {
                  nodeRefs.current.set(app._id, React.createRef() as React.RefObject<HTMLTableRowElement>);
                }
                const nodeRef = nodeRefs.current.get(app._id);
                return (
                  <CSSTransition
                    key={app._id}
                    classNames="fade"
                    timeout={300}
                    nodeRef={nodeRef}
                  >
                    <tr className="border-t" ref={nodeRef}>
                      <td className="p-4">{app.job.title}</td>
                      <td className="p-4">{app.job.company}</td>
                      <td className="p-4">
                        ₹{app.job.salary.toLocaleString()}
                      </td>
                      <td className="p-4 capitalize">{app.job.jobType}</td>
                      <td className="p-4">{app.job.applications.length}</td>
                      <td className="p-4 capitalize font-medium">
                        {app.status}
                      </td>
                      {!isRecruiter && (
                        <td className="p-4">
                          <button
                            onClick={() =>
                              navigate(`/profile/${app.job.postedBy}`)
                            }
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                          >
                            View Recruiter Profile
                          </button>
                        </td>
                      )}
                      {!isRecruiter && !isAllJob && (
                        <td className="p-4">
                          {app.status === "pending" ? (
                            <button
                              onClick={() => cancelApplication(app._id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                              disabled={loading}
                            >
                              {loading ? "Cancelling..." : "Cancel Application"}
                            </button>
                          ) : (
                            app.status.charAt(0).toUpperCase() + app.status.slice(1)
                          )}
                        </td>
                      )}
                      {!isRecruiter && isAllJob && (
                        <td className="p-4">
                            <button
                              onClick={() => navigate(`/job/${app.job._id}`)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                              disabled={loading}
                            >
                              View Job
                            </button>
                          
                        </td>
                      )}
                    </tr>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </table>
        </div>
      </div>
    </StudentSidebar>
  );
};

export default ApplicationsTable;
