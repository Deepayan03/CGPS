import { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'flowbite-react';

import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import StudentSidebar from './StudentSidebar';

// const jobData = {
//   _id: '64b8f8e2c9d1a2e4f8e3d9a2',
//   title: 'Software Engineer',
//   company: 'TechCorp',
//   description: 'We are looking for a skilled Software Engineer.',
//   salary: 120000,
//   skillsRequired: ['JavaScript', 'React', 'Node.js'],
//   applications: ['64b8f8e2c9d1a2e4f8e3d9a3', '64b8f8e2c9d1a2e4f8e3d9a4'],
//   jobType: 'full-time',
//   createdAt: '2025-04-01T10:00:00.000Z',
// };



const SingleJob: any = (isStudent = true) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {id} = useParams();
//   console.log(id)
    const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false); // Currently unused, can be removed if not needed
  const getJobData = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/api/jobs/${id}`);
      console.log(data);
      setJob(data);
      
      console.log(data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch job data."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleJobApplication = async () => {
    try {
        const confirmApplication = window.confirm(
            "Are you sure you want to apply to this job ?"
          );
          if (!confirmApplication) {
            setLoading(false);
            return;
          }
      const { data } = await axiosInstance.post(`/api/applications/apply`,{jobId:id});
      toast.success(data.message);
      setJob((prevJob: any) => ({
        ...prevJob,
        applications: [...prevJob.applications, data.applicationId],
      }));
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to apply for the job."
      );
    }
  };

  useEffect(()=>{
    getJobData();
  },[id]);
  if(loading){
    return <div>Loading...</div>;
  }
  return (
    <StudentSidebar>

      {/* Main Content */}
        <h1 className="text-3xl font-semibold mb-6">Job Listing</h1>

        {/* Job Table */}
      {  job && <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Field</TableHeadCell>
              <TableHeadCell>Details</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Title</TableCell>
              <TableCell>{job.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Company</TableCell>
              <TableCell>{job.company}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Description</TableCell>
              <TableCell>{job.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Salary</TableCell>
              <TableCell>${job.salary.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Skills Required</TableCell>
              <TableCell>{job.skillsRequired.join(', ')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Job Type</TableCell>
              <TableCell className="capitalize">{job.jobType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Posted On</TableCell>
              <TableCell>{new Date(job.createdAt).toDateString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Applications</TableCell>
             {!isStudent &&  <TableCell>
                <Button onClick={() => setIsModalOpen(true)}>
                  View Applications ({job.applications.length})
                </Button>
              </TableCell>}
              {isStudent &&  <TableCell>
              { job.applications.includes(user._id) ?( <Button disabled >  
                Applied
                </Button>):(
                <Button color={"alternative"} onClick={handleJobApplication}>
                  Apply for this job
                </Button>
                )}
              </TableCell>}
            </TableRow>
          </TableBody>
        </Table>}

        {/* Applications Modal */}
       {job &&  <Modal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="md"
          popup
        >
          
            <ModalHeader>Applications</ModalHeader>
            <ModalBody>
              {job.applications.length > 0 ? (
                <ul className="list-disc pl-5">
                  {job.applications.map((app:any, index:number) => (
                    <li key={index} className="text-gray-700">
                      Applicant ID: {app}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No applications yet.</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="gray" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          
        </Modal>}
      
    </StudentSidebar>
  );
};

export default SingleJob;
