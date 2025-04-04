
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Mock subscription data over time
const subscriptionData = [
  { month: "Jan", monthly: 40, quarterly: 30, annual: 15, total: 85 },
  { month: "Feb", monthly: 45, quarterly: 32, annual: 18, total: 95 },
  { month: "Mar", monthly: 50, quarterly: 32, annual: 20, total: 102 },
  { month: "Apr", monthly: 48, quarterly: 34, annual: 21, total: 103 },
  { month: "May", monthly: 52, quarterly: 35, annual: 23, total: 110 },
  { month: "Jun", monthly: 55, quarterly: 35, annual: 25, total: 115 },
];

// Distribution by subscription type
const subscriptionTypeData = [
  { name: "Monthly", value: 55, color: "#9b87f5" },
  { name: "Quarterly", value: 35, color: "#6930c3" },
  { name: "Annual", value: 25, color: "#3a0ca3" },
];

const COLORS = ["#9b87f5", "#6930c3", "#3a0ca3"];

const SubscriptionChart: FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Subscription Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={subscriptionData}>
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
              dataKey="total" 
              stroke="#8B5CF6" 
              activeDot={{ r: 8 }}
              name="Total Subscriptions"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Subscription Types</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={subscriptionTypeData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
              labelLine={false}
            >
              {subscriptionTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} subscriptions`, 'Count']}
              contentStyle={{ 
                backgroundColor: "#fff", 
                border: "1px solid #e0e0e0",
                borderRadius: "4px"
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Subscription Type Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={subscriptionData}>
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
            <Area 
              type="monotone" 
              dataKey="monthly" 
              stackId="1" 
              stroke="#9b87f5" 
              fill="#9b87f5" 
              name="Monthly"
            />
            <Area 
              type="monotone" 
              dataKey="quarterly" 
              stackId="1" 
              stroke="#6930c3" 
              fill="#6930c3" 
              name="Quarterly"
            />
            <Area 
              type="monotone" 
              dataKey="annual" 
              stackId="1" 
              stroke="#3a0ca3" 
              fill="#3a0ca3" 
              name="Annual"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubscriptionChart;
