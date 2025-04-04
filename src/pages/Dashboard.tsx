
import { FC } from "react";
import MembersTable, { Member } from "@/components/members/MembersTable";
import StatsCard from "@/components/dashboard/StatsCard";
import { Users, CreditCard, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard: FC = () => {
  const { toast } = useToast();

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

  const handleEditMember = (member: Member) => {
    toast({
      title: "Edit Member",
      description: `Editing ${member.name}'s information.`,
    });
  };

  const handleDeleteMember = (id: number) => {
    toast({
      title: "Delete Member",
      description: "Member has been deleted successfully.",
      variant: "destructive",
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Members"
          value="120"
          icon={<Users className="h-6 w-6 text-fitness-blue" />}
          trend={{ value: 8, isPositive: true }}
          description="vs last month"
        />
        <StatsCard
          title="Revenue"
          value="$8,250"
          icon={<CreditCard className="h-6 w-6 text-fitness-green" />}
          trend={{ value: 12, isPositive: true }}
          description="vs last month"
        />
        <StatsCard
          title="Active Subscriptions"
          value="105"
          icon={<Calendar className="h-6 w-6 text-fitness-purple" />}
          trend={{ value: 3, isPositive: true }}
          description="vs last month"
        />
        <StatsCard
          title="Pending Payments"
          value="5"
          icon={<TrendingUp className="h-6 w-6 text-fitness-red" />}
          trend={{ value: 2, isPositive: false }}
          description="vs last month"
        />
      </div>
      
      <MembersTable 
        data={members} 
        onEdit={handleEditMember}
        onDelete={handleDeleteMember}
      />
    </>
  );
};

export default Dashboard;
