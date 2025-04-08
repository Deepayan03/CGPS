import React, { useEffect } from "react";
import ApplicationsTable from "../ApplicationTable";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const StudentApplications = () => {
  const [applications, setApplications] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const getApplicationsData = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        "/api/applications/my-applications"
      );
      setApplications(data.applications);
      setLoading(false);
      console.log(data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch applications. Please try again."
      );
      setLoading(false);
    }
  };

  useEffect(()=>{
    getApplicationsData();
  },[]);
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <ApplicationsTable applications={applications} header="My Applications" />
  );
};

export default StudentApplications;
