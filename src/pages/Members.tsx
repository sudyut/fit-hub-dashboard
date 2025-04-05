
import { FC, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import MembersTable from "@/components/members/MembersTable";
import { useToast } from "@/hooks/use-toast";
import MemberDetails from "@/components/members/MemberDetails";
import { Member } from "@/components/members/MembersTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Members: FC = () => {
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock member data
  const members: Member[] = [
    {
      id: 1,
      uniqueId: "FH10001",
      name: "John Doe",
      age: 28,
      dateOfBirth: "1997-05-15",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      address: "123 Fitness Street, Gym City, GC 12345",
      emergencyContact: "Jane Doe: +1 (555) 987-6543",
      height: 178,
      weight: 75,
      bodyFat: 15,
      subscriptionType: 'monthly',
      subscriptionStart: '2025-03-01',
      subscriptionEnd: '2025-04-01',
      paymentStatus: 'paid',
      physicalDetails: {
        bodyMeasurements: {
          chest: 95,
          waist: 80,
          hips: 90,
          arms: 35,
          legs: 55
        },
        fitnessLevel: "Intermediate"
      },
      goalsPreferences: {
        goals: ["weight loss", "muscle gain"],
        timeline: "short term",
        workoutFrequency: 4,
        workoutStyles: ["strength training", "cardio"],
        dietPreference: "non-vegetarian",
        dietRemarks: "Lactose intolerant"
      },
      activityPerformance: {
        attendance: 80,
        workoutHistory: [
          { date: "2025-03-01", workout: "Upper Body", duration: 60 },
          { date: "2025-03-03", workout: "Lower Body", duration: 45 }
        ],
        progressLogs: [
          { date: "2025-03-01", weight: 76, bodyFat: 15.5 },
          { date: "2025-03-15", weight: 75, bodyFat: 15 }
        ],
        goalAchievement: 65
      }
    },
    {
      id: 2,
      uniqueId: "FH10002",
      name: "Emma Wilson",
      age: 24,
      dateOfBirth: "2001-08-12",
      phone: "+1 (555) 234-5678",
      email: "emma.wilson@example.com",
      address: "456 Health Avenue, Fitness Town, FT 67890",
      emergencyContact: "William Wilson: +1 (555) 876-5432",
      height: 165,
      weight: 58,
      bodyFat: 20,
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
      dateOfBirth: "1993-11-30",
      phone: "+1 (555) 345-6789",
      email: "michael.smith@example.com",
      address: "789 Strength Road, Muscle City, MC 10111",
      emergencyContact: "Sarah Smith: +1 (555) 765-4321",
      height: 183,
      weight: 85,
      bodyFat: 12,
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
      dateOfBirth: "1996-04-22",
      phone: "+1 (555) 456-7890",
      email: "sarah.johnson@example.com",
      address: "101 Cardio Lane, Aerobic District, AD 20222",
      emergencyContact: "Robert Johnson: +1 (555) 654-3210",
      height: 170,
      weight: 62,
      bodyFat: 18,
      subscriptionType: 'monthly',
      subscriptionStart: '2025-03-15',
      subscriptionEnd: '2025-04-15',
      paymentStatus: 'pending',
    },
  ];

  const filteredMembers = searchQuery 
    ? members.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.uniqueId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : members;

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    toast({
      title: "Member Selected",
      description: `Viewing ${member.name}'s details.`,
    });
  };

  const handleGoBack = () => {
    setSelectedMember(null);
  };

  return (
    <div className="flex h-screen bg-fitness-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName="Mike" />
        <div className="flex-1 overflow-y-auto p-6">
          {selectedMember ? (
            <MemberDetails member={selectedMember} onBack={handleGoBack} />
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-6">Members</h1>
              
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search by name, email or ID..."
                  className="pl-10 pr-4 py-2 w-full md:w-1/2 lg:w-1/3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <MembersTable 
                data={filteredMembers} 
                onView={handleViewMember}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
