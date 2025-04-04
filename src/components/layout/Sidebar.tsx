
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Settings, HelpCircle, LogOut, Users, Calendar, BarChart3, Mail } from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar: FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  
  const navigationItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Members",
      href: "/members",
      icon: Users,
    },
    {
      name: "Schedule",
      href: "/schedule",
      icon: Calendar,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      name: "Help",
      href: "/help",
      icon: HelpCircle,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div
      className={cn(
        "h-screen w-64 flex flex-col bg-white border-r border-gray-200 p-4",
        className
      )}
    >
      <div className="flex items-center gap-2 p-2 mb-8">
        <div className="h-8 w-8 rounded-md bg-fitness-red flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
          >
            <path
              d="M4 7.8C4 6.11984 4 5.27976 4.32698 4.63803C4.6146 4.07354 5.07354 3.6146 5.63803 3.32698C6.27976 3 7.11984 3 8.8 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V16.2C20 17.8802 20 18.7202 19.673 19.362C19.3854 19.9265 18.9265 20.3854 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V7.8Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 13.6667C9 12.9594 9 12.6058 9.15224 12.3297C9.28527 12.0864 9.50255 11.8926 9.76295 11.7799C10.0622 11.6524 10.4283 11.6786 11.1605 11.731C11.4438 11.7524 11.7346 11.7631 12 11.7631C12.2654 11.7631 12.5562 11.7524 12.8395 11.731C13.5717 11.6786 13.9378 11.6524 14.2371 11.7799C14.4975 11.8926 14.7147 12.0864 14.8478 12.3297C15 12.6058 15 12.9594 15 13.6667C15 14.374 15 14.7276 14.8478 15.0037C14.7147 15.247 14.4975 15.4408 14.2371 15.5535C13.9378 15.681 13.5717 15.6548 12.8395 15.6024C12.5562 15.581 12.2654 15.5703 12 15.5703C11.7346 15.5703 11.4438 15.581 11.1605 15.6024C10.4283 15.6548 10.0622 15.681 9.76295 15.5535C9.50255 15.4408 9.28527 15.247 9.15224 15.0037C9 14.7276 9 14.374 9 13.6667Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 8H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-xl font-bold text-fitness-red">FitHub</span>
      </div>

      <nav className="flex-1 space-y-1 mt-4">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md transition-colors",
              isActive(item.href)
                ? "bg-fitness-red text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 pt-4 mt-auto">
        <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 mb-2">
          <Mail className="h-5 w-5" />
          <span className="truncate">mike@fithub.com</span>
        </div>
        <button className="flex w-full items-center gap-3 px-3 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
