
import { FC } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

const Reports: FC = () => {
  return (
    <div className="flex h-screen bg-fitness-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName="Mike" />
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Reports & Analytics</h1>
          <p className="text-gray-500">Detailed gym reports and analytics will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
