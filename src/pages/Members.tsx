
import { FC, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import MembersTable from "@/components/members/MembersTable";
import MemberDetails from "@/components/members/MemberDetails";
import AddMemberDialog from "@/components/members/AddMemberDialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Member } from "@/components/members/MembersTable";

const Members: FC = () => {
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Transform Supabase data to match the Member interface
      const formattedMembers = data.map(member => ({
        id: member.id,
        uniqueId: member.unique_id,
        name: member.name,
        age: member.age || 0,
        dateOfBirth: member.date_of_birth || "",
        phone: member.phone || "",
        email: member.email || "",
        address: member.address || "",
        emergencyContact: member.emergency_contact || "",
        height: member.height || 0,
        weight: member.weight || 0,
        bodyFat: member.body_fat || 0,
        subscriptionType: member.subscription_type as 'monthly' | 'quarterly' | 'annual',
        subscriptionStart: member.subscription_start,
        subscriptionEnd: member.subscription_end,
        paymentStatus: member.payment_status as 'paid' | 'pending' | 'overdue',
      }));
      
      setMembers(formattedMembers);
    } catch (error: any) {
      console.error("Error fetching members:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

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

  const handleMemberAdded = () => {
    fetchMembers();
    toast({
      title: "Success",
      description: "New member has been added successfully.",
    });
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setMembers(members.filter(member => member.id !== id));
      toast({
        title: "Member Deleted",
        description: "The member has been successfully deleted.",
      });
    } catch (error: any) {
      console.error("Error deleting member:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete member",
        variant: "destructive",
      });
    }
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
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Members</h1>
                <AddMemberDialog onMemberAdded={handleMemberAdded} />
              </div>
              
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
                onDelete={handleDelete}
                loading={loading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
