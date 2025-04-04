
import { FC } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

// Mock revenue data for the past 6 months
const revenueData = [
  { month: "Jan", revenue: 5800 },
  { month: "Feb", revenue: 6200 },
  { month: "Mar", revenue: 6800 },
  { month: "Apr", revenue: 7300 },
  { month: "May", revenue: 7900 },
  { month: "Jun", revenue: 8250 },
];

const RevenueChart: FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6930c3" />
            <YAxis stroke="#6930c3" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#fff", 
                border: "1px solid #e0e0e0",
                borderRadius: "4px"
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8B5CF6" 
              activeDot={{ r: 8 }}
              name="Revenue ($)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Revenue by Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6930c3" />
            <YAxis stroke="#6930c3" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#fff", 
                border: "1px solid #e0e0e0",
                borderRadius: "4px"
              }} 
            />
            <Legend />
            <Bar 
              dataKey="revenue" 
              fill="#9b87f5" 
              name="Revenue ($)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Revenue Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-purple-800 mb-2">Growth Rate</h4>
            <p className="text-2xl font-bold text-purple-900">42.2%</p>
            <p className="text-xs text-purple-700 mt-1">Yearly growth</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-purple-800 mb-2">Average Revenue</h4>
            <p className="text-2xl font-bold text-purple-900">$7,042</p>
            <p className="text-xs text-purple-700 mt-1">Per month</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-purple-800 mb-2">Revenue Forecast</h4>
            <p className="text-2xl font-bold text-purple-900">$9,120</p>
            <p className="text-xs text-purple-700 mt-1">Next month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
