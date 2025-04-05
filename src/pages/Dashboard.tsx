
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import MembersTable, { Member } from "@/components/members/MembersTable";
import StatsCard from "@/components/dashboard/StatsCard";
import { Users, CreditCard, Calendar, TrendingUp, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RevenueChart from "@/components/dashboard/RevenueChart";
import SubscriptionChart from "@/components/dashboard/SubscriptionChart";
import PendingPaymentsTable from "@/components/dashboard/PendingPaymentsTable";
import { Button } from "@/components/ui/button";

const Dashboard: FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Mock member data
  const members: Member[] = [
    {
      id: 1,
      uniqueId: "FH10001",
      name: "John Doe",
      age: 28,
      height: 178,
      subscriptionType: 'monthly',
      subscriptionStart: '2025-03-01',
      subscriptionEnd: '2025-04-01',
      paymentStatus: 'paid',
    },
    {
      id: 2,
      uniqueId: "FH10002",
      name: "Emma Wilson",
      age: 24,
      height: 165,
      subscriptionType: 'quarterly',
      subscriptionStart: '2025-02-15',
      subscriptionEnd: '2025-05-15',
      paymentStatus: 'paid',
    },
    {
      id: 3,
      uniqueId: "FH10003",
      name: "Michael Smith",
      age: 32,
      height: 183,
      subscriptionType: 'annual',
      subscriptionStart: '2025-01-10',
      subscriptionEnd: '2026-01-10',
      paymentStatus: 'paid',
    },
    {
      id: 4,
      uniqueId: "FH10004",
      name: "Sarah Johnson",
      age: 29,
      height: 170,
      subscriptionType: 'monthly',
      subscriptionStart: '2025-03-15',
      subscriptionEnd: '2025-04-15',
      paymentStatus: 'pending',
    },
    {
      id: 5,
      uniqueId: "FH10005",
      name: "Robert Brown",
      age: 35,
      height: 180,
      subscriptionType: 'quarterly',
      subscriptionStart: '2024-12-20',
      subscriptionEnd: '2025-03-20',
      paymentStatus: 'overdue',
    },
    {
      id: 6,
      uniqueId: "FH10006",
      name: "Lisa Cooper",
      age: 27,
      height: 163,
      subscriptionType: 'annual',
      subscriptionStart: '2024-09-05',
      subscriptionEnd: '2025-09-05',
      paymentStatus: 'paid',
    },
  ];

  const pendingMembers = members.filter(member => 
    member.paymentStatus === 'pending' || member.paymentStatus === 'overdue'
  );

  const handleViewMember = (member: Member) => {
    toast({
      title: "View Member",
      description: `Viewing ${member.name}'s information.`,
    });
  };

  const handleDeleteMember = (id: number) => {
    toast({
      title: "Delete Member",
      description: "Member has been deleted successfully.",
      variant: "destructive",
    });
  };

  const handleCardClick = (section: string) => {
    if (section === 'members') {
      navigate('/members');
    } else {
      setActiveSection(activeSection === section ? null : section);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Members"
          value="120"
          icon={<Users className="h-6 w-6 text-fitness-purple" />}
          trend={{ value: 8, isPositive: true }}
          description="vs last month"
          onClick={() => handleCardClick('members')}
          className="cursor-pointer hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Revenue"
          value="$8,250"
          icon={<CreditCard className="h-6 w-6 text-fitness-purple" />}
          trend={{ value: 12, isPositive: true }}
          description="vs last month"
          onClick={() => handleCardClick('revenue')}
          className="cursor-pointer hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Active Subscriptions"
          value="105"
          icon={<Calendar className="h-6 w-6 text-fitness-purple" />}
          trend={{ value: 3, isPositive: true }}
          description="vs last month"
          onClick={() => handleCardClick('subscriptions')}
          className="cursor-pointer hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Pending Payments"
          value="5"
          icon={<TrendingUp className="h-6 w-6 text-fitness-purple" />}
          trend={{ value: 2, isPositive: false }}
          description="vs last month"
          onClick={() => handleCardClick('pendingPayments')}
          className="cursor-pointer hover:shadow-md transition-shadow"
        />
      </div>
      
      {activeSection === 'revenue' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Revenue Trends</h2>
          <RevenueChart />
        </div>
      )}
      
      {activeSection === 'subscriptions' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Subscription Trends</h2>
          <SubscriptionChart />
        </div>
      )}
      
      {activeSection === 'pendingPayments' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Pending Payments</h2>
          <PendingPaymentsTable data={pendingMembers} onEdit={handleViewMember} onDelete={handleDeleteMember} />
        </div>
      )}
      
      {!activeSection && (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Members</h2>
              <Button 
                onClick={() => navigate('/members')}
                variant="outline" 
                className="text-fitness-purple border-fitness-purple hover:bg-fitness-purple hover:text-white"
              >
                Show More <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <MembersTable 
              data={members.slice(0, 10)} 
              onView={handleViewMember}
              onEdit={handleViewMember}
              onDelete={handleDeleteMember}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
