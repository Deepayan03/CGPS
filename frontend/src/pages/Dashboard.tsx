
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/commons/Sidebar";
import RecruiterDashboard from "@/pages/RecruiterDashboard";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar>
          <RecruiterDashboard />
        </AppSidebar>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
