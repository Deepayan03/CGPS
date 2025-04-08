import React, { useState } from "react";

import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";


const JobListing: React.FC = () => {
  const [jobListings, setJobListings] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const nodeRefs = React.useRef<Map<string, React.RefObject<HTMLTableRowElement>>>(
    new Map()
  );
  const navigate = useNavigate();
  const getAllListings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/api/jobs');
      setJobListings(data);
      console.log(data)
      toast.success("Job listings fetched successfully");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch job listings."
      );
    }finally{
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllListings();
  }, []);

  return (
    <StudentSidebar>
  <div className="p-3">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      {"All applications"}
    </h2>
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="w-full border-collapse text-gray-700">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-600 uppercase text-sm">
            <th className="p-4">Job Title</th>
            <th className="p-4">Company</th>
            <th className="p-4">Salary</th>
            <th className="p-4">Job Type</th>
            <th className="p-4">Applications</th>
            <th className="p-4">Recruiter</th>
            <th className="p-4">View Job details</th>
          </tr>
        </thead>
        <TransitionGroup component="tbody">
          {jobListings.map((app: any) => {
            if (!nodeRefs.current.has(app._id)) {
              nodeRefs.current.set(
                app._id,
                React.createRef() as React.RefObject<HTMLTableRowElement>
              );
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
                  <td className="p-4">{app.title}</td>
                  <td className="p-4">{app.company}</td>
                  <td className="p-4">₹{app.salary.toLocaleString()}</td>
                  <td className="p-4 capitalize">{app.jobType}</td>
                  <td className="p-4">{app.applications.length}</td>
                
                  <td className="p-4">
                    <button
                      onClick={() => navigate(`/profile/${app.postedBy}`)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      View Recruiter Profile
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => navigate(`/job/${app._id}`)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                      disabled={loading}
                    >
                      View Job
                    </button>
                  </td>
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

export default JobListing;
