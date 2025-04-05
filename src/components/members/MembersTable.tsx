
import { useState, FC } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

export interface Member {
  id: number;
  uniqueId: string;
  name: string;
  age: number;
  dateOfBirth?: string;
  phone?: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  height: number;
  weight?: number;
  bodyFat?: number;
  subscriptionType: 'monthly' | 'quarterly' | 'annual';
  subscriptionStart: string;
  subscriptionEnd: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  physicalDetails?: {
    bodyMeasurements?: {
      chest?: number;
      waist?: number;
      hips?: number;
      arms?: number;
      legs?: number;
    };
    fitnessLevel?: string;
  };
  goalsPreferences?: {
    goals?: string[];
    timeline?: 'short term' | 'long term';
    workoutFrequency?: number;
    workoutStyles?: string[];
    dietPreference?: string;
    dietRemarks?: string;
  };
  activityPerformance?: {
    attendance?: number;
    workoutHistory?: Array<{
      date: string;
      workout: string;
      duration: number;
    }>;
    progressLogs?: Array<{
      date: string;
      weight: number;
      bodyFat: number;
    }>;
    goalAchievement?: number;
  };
}

interface MembersTableProps {
  data: Member[];
  onView?: (member: Member) => void;
  onEdit?: (member: Member) => void;
  onDelete?: (id: number) => void;
}

const MembersTable: FC<MembersTableProps> = ({ 
  data, 
  onView = () => {},
  onEdit = () => {}, 
  onDelete = () => {} 
}) => {
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>(data);

  const handleSubscriptionChange = (memberId: number, value: string) => {
    const updatedMembers = members.map(member => {
      if (member.id === memberId) {
        const subscriptionType = value as 'monthly' | 'quarterly' | 'annual';
        
        // Calculate new end date based on subscription type
        const startDate = new Date(member.subscriptionStart);
        const endDate = new Date(startDate);
        
        if (subscriptionType === 'monthly') {
          endDate.setMonth(endDate.getMonth() + 1);
        } else if (subscriptionType === 'quarterly') {
          endDate.setMonth(endDate.getMonth() + 3);
        } else if (subscriptionType === 'annual') {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }
        
        const formattedEndDate = endDate.toISOString().split('T')[0];
        
        return {
          ...member,
          subscriptionType,
          subscriptionEnd: formattedEndDate
        };
      }
      return member;
    });
    
    setMembers(updatedMembers);
    toast({
      title: "Subscription Updated",
      description: "The member's subscription plan has been updated.",
    });
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Member List</h2>
          <Button className="bg-fitness-purple hover:bg-fitness-lightpurple">
            Add New Member
          </Button>
        </div>
      </div>
      
      <div className="table-container overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[60px]">S.No</TableHead>
              <TableHead>Unique ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Emergency Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{member.uniqueId}</TableCell>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.dateOfBirth || "Not provided"}</TableCell>
                <TableCell>{member.phone || "Not provided"}</TableCell>
                <TableCell>{member.email || "Not provided"}</TableCell>
                <TableCell>{member.address ? (member.address.length > 20 ? member.address.substring(0, 20) + "..." : member.address) : "Not provided"}</TableCell>
                <TableCell>{member.emergencyContact || "Not provided"}</TableCell>
                <TableCell>
                  <Badge className={getPaymentStatusColor(member.paymentStatus)}>
                    {member.paymentStatus.charAt(0).toUpperCase() + member.paymentStatus.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-fitness-purple border-fitness-purple hover:bg-fitness-purple hover:text-white"
                      onClick={() => onView(member)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(member)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => onDelete(member.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MembersTable;
