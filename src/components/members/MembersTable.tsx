
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
import { ChevronDown, Edit, MoreHorizontal, Trash2 } from "lucide-react";

export interface Member {
  id: number;
  uniqueId: string;
  name: string;
  age: number;
  height: number;
  subscriptionType: 'monthly' | 'quarterly' | 'annual';
  subscriptionStart: string;
  subscriptionEnd: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

interface MembersTableProps {
  data: Member[];
  onEdit?: (member: Member) => void;
  onDelete?: (id: number) => void;
}

const MembersTable: FC<MembersTableProps> = ({ 
  data, 
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
          <Button className="bg-fitness-red hover:bg-fitness-lightred">
            Add New Member
          </Button>
        </div>
      </div>
      
      <div className="table-container overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[80px]">S.No</TableHead>
              <TableHead>Unique ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Height (cm)</TableHead>
              <TableHead>Subscription Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{member.uniqueId}</TableCell>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.age}</TableCell>
                <TableCell>{member.height}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={member.subscriptionType}
                    onValueChange={(value) => handleSubscriptionChange(member.id, value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Subscription" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{member.subscriptionStart}</TableCell>
                <TableCell>{member.subscriptionEnd}</TableCell>
                <TableCell>
                  <Badge className={getPaymentStatusColor(member.paymentStatus)}>
                    {member.paymentStatus.charAt(0).toUpperCase() + member.paymentStatus.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
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
