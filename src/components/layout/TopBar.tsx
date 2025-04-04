
import { FC } from "react";
import { Bell, Search } from "lucide-react";

interface TopBarProps {
  userName?: string;
}

const TopBar: FC<TopBarProps> = ({ userName = "Admin" }) => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-medium">
          Welcome <span className="font-bold">{userName}</span>, {greeting()}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-fitness-red focus:border-fitness-red"
          />
        </div>
        <button className="relative p-2 text-gray-600 hover:text-fitness-red transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-fitness-red"></span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
