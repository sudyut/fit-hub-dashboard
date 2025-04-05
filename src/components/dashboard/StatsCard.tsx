
import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void; // Add onClick prop
}

const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
  onClick, // Include onClick in the destructured props
}) => {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col",
        onClick && "cursor-pointer hover:shadow-md transition-shadow",
        className
      )}
      onClick={onClick} // Add onClick handler
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  "text-sm font-medium flex items-center",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
                <svg
                  className={cn(
                    "w-3 h-3 ml-1",
                    trend.isPositive ? "rotate-0" : "rotate-180"
                  )}
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 2.5V9.5M6 2.5L2.5 6M6 2.5L9.5 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {description && (
                <span className="text-xs text-gray-500 ml-1">{description}</span>
              )}
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-gray-50">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
