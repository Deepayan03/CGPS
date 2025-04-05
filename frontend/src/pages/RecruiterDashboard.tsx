import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const placementsData = [
  { name: "B.Tech", value: 45, color: "#1E40AF" },
  { name: "MBA", value: 15, color: "#60A5FA" },
  { name: "B.Sc", value: 15, color: "#93C5FD" },
];

const jobOpenings = [
  { position: "Software Engineer", applications: 45 },
  { position: "Data Analyst", applications: 30 },
  { position: "Marketing Intern", applications: 25 },
  { position: "Graphic Designer", applications: 20 },
];

const interviews = [
  { candidate: "John Doe", course: "B.Tech" },
  { candidate: "Jane Smith", course: "MBA" },
  { candidate: "Michael Johnson", course: "B.Sc" },
];

const interviewSchedule = [
  { candidate: "Jane Smith", date: "April 29, 2024" },
  { candidate: "Michael Johnson", date: "April 30, 2024" },
  { candidate: "Emily Brown", date: "May 1, 2024" },
];

export default function RecruiterDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center font-semibold">5 Job Openings</CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center font-semibold">120 Candidates</CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center font-semibold">30 Students Placed</CardContent>
        </Card>
      </div>

      {/* Job Openings and Placements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Job Openings</h3>
            <ul>
              {jobOpenings.map((job, idx) => (
                <li key={idx} className="flex justify-between py-1">
                  {job.position} <span className="bg-gray-200 px-2 py-1 rounded">{job.applications}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Placements by Course</h3>
            <PieChart width={300} height={200} className="mx-auto">
              <Pie data={placementsData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" dataKey="value">
                {placementsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Interviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Upcoming Interviews</h3>
            <ul>
              {interviews.map((item, idx) => (
                <li key={idx} className="flex justify-between py-1">
                  {item.candidate} <span>{item.course}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Interview Schedule</h3>
            <ul>
              {interviewSchedule.map((item, idx) => (
                <li key={idx} className="flex justify-between py-1">
                  {item.candidate} <span>{item.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
