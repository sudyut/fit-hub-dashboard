
import { FC, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, MessageSquareText, BarChart3, DollarSign, Users, CalendarDays, Dumbbell } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import KpiCard from "@/components/reports/KpiCard";
import AiChatbot from "@/components/reports/AiChatbot";

const Reports: FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAiChat, setShowAiChat] = useState(false);

  // Sample data
  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 5000 },
    { month: 'Mar', revenue: 4800 },
    { month: 'Apr', revenue: 6200 },
    { month: 'May', revenue: 7000 },
    { month: 'Jun', revenue: 6500 },
  ];

  const attendanceData = [
    { day: 'Mon', count: 45 },
    { day: 'Tue', count: 52 },
    { day: 'Wed', count: 58 },
    { day: 'Thu', count: 40 },
    { day: 'Fri', count: 65 },
    { day: 'Sat', count: 78 },
    { day: 'Sun', count: 25 },
  ];

  const membershipData = [
    { name: 'Monthly', value: 35 },
    { name: 'Quarterly', value: 25 },
    { name: 'Annual', value: 40 },
  ];

  const COLORS = ['#8B5CF6', '#9b87f5', '#7E69AB'];

  return (
    <div className="flex h-screen bg-fitness-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName="Mike" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <button 
              onClick={() => setShowAiChat(!showAiChat)}
              className="flex items-center gap-2 px-4 py-2 bg-fitness-purple text-white rounded-md hover:bg-fitness-lightpurple transition-colors"
            >
              <MessageSquareText className="h-5 w-5" />
              {showAiChat ? "Hide AI Assistant" : "Chat with AI Assistant"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <KpiCard 
              title="Monthly Revenue" 
              value="$12,500" 
              icon={<DollarSign className="h-5 w-5" />}
              change={12.5}
              isPositive={true}
            />
            <KpiCard 
              title="Active Members" 
              value="120" 
              icon={<Users className="h-5 w-5" />}
              change={5.2}
              isPositive={true}
            />
            <KpiCard 
              title="Avg. Daily Attendance" 
              value="52" 
              icon={<CalendarDays className="h-5 w-5" />}
              change={-2.1}
              isPositive={false}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  <TabsTrigger value="membership">Membership</TabsTrigger>
                  <TabsTrigger value="performance">Member Performance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Trend</CardTitle>
                      <CardDescription>Monthly revenue for the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#8B5CF6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Weekly Attendance</CardTitle>
                        <CardDescription>Member attendance by day of week</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={attendanceData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="day" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="count" stroke="#8B5CF6" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Membership Distribution</CardTitle>
                        <CardDescription>Distribution by subscription type</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={membershipData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8B5CF6"
                                dataKey="value"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {membershipData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="revenue">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Analytics</CardTitle>
                      <CardDescription>Detailed revenue breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <p className="text-muted-foreground mb-8">
                          More detailed revenue analytics will be implemented here, including revenue by membership type, 
                          personal training revenue, and other income streams.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="attendance">
                  <Card>
                    <CardHeader>
                      <CardTitle>Attendance Patterns</CardTitle>
                      <CardDescription>Track when members visit the gym</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <p className="text-muted-foreground mb-8">
                          Detailed attendance analytics will be implemented here, including peak hours, attendance by day, 
                          and member retention patterns.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="membership">
                  <Card>
                    <CardHeader>
                      <CardTitle>Membership Analytics</CardTitle>
                      <CardDescription>Subscription and retention metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <p className="text-muted-foreground mb-8">
                          Detailed membership analytics will be implemented here, including new vs. returning members, 
                          subscription renewals, and membership churn rates.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="performance">
                  <Card>
                    <CardHeader>
                      <CardTitle>Member Performance</CardTitle>
                      <CardDescription>Track progress and achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <p className="text-muted-foreground mb-8">
                          Member performance analytics will be implemented here, including goal achievement rates, 
                          fitness progress metrics, and personal records.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {showAiChat && (
              <div className="lg:col-span-1">
                <AiChatbot />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
