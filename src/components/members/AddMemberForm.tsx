
import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const memberFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().optional().transform(val => val ? parseInt(val) : undefined),
  dateOfBirth: z.date().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  height: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  weight: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  bodyFat: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  subscriptionType: z.enum(["monthly", "quarterly", "annual"]),
  subscriptionStart: z.date(),
  subscriptionEnd: z.date(),
  paymentStatus: z.enum(["paid", "pending", "overdue"]),
});

type MemberFormValues = z.infer<typeof memberFormSchema>;

interface AddMemberFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddMemberForm: FC<AddMemberFormProps> = ({ onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: "",
      age: undefined,
      dateOfBirth: undefined,
      phone: "",
      email: "",
      address: "",
      emergencyContact: "",
      height: undefined,
      weight: undefined,
      bodyFat: undefined,
      subscriptionType: "monthly",
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      paymentStatus: "pending",
    },
  });

  const handleSubscriptionTypeChange = (value: "monthly" | "quarterly" | "annual") => {
    const startDate = form.getValues("subscriptionStart");
    let endDate = new Date(startDate);
    
    if (value === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (value === "quarterly") {
      endDate.setMonth(endDate.getMonth() + 3);
    } else if (value === "annual") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    form.setValue("subscriptionEnd", endDate);
  };

  const handleStartDateChange = (date: Date) => {
    form.setValue("subscriptionStart", date);
    const subscriptionType = form.getValues("subscriptionType");
    let endDate = new Date(date);
    
    if (subscriptionType === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (subscriptionType === "quarterly") {
      endDate.setMonth(endDate.getMonth() + 3);
    } else if (subscriptionType === "annual") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    form.setValue("subscriptionEnd", endDate);
  };

  const onSubmit = async (data: MemberFormValues) => {
    setIsSubmitting(true);
    try {
      // Format dates for PostgreSQL
      const formattedData = {
        ...data,
        date_of_birth: data.dateOfBirth ? format(data.dateOfBirth, 'yyyy-MM-dd') : null,
        subscription_start: format(data.subscriptionStart, 'yyyy-MM-dd'),
        subscription_end: format(data.subscriptionEnd, 'yyyy-MM-dd'),
        // Remove fields that don't match the database column names
        dateOfBirth: undefined,
        subscriptionStart: undefined,
        subscriptionEnd: undefined,
        bodyFat: data.bodyFat,
        subscription_type: data.subscriptionType,
        payment_status: data.paymentStatus,
      };

      const { data: member, error } = await supabase
        .from('members')
        .insert([formattedData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Member Added",
        description: `${data.name} has been successfully added.`,
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error adding member:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="25" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="123 Main St, City, State 12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Emergency Contact</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe: +1 (555) 987-6543" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="175" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="70" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bodyFat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body Fat (%)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subscriptionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription Type*</FormLabel>
                <Select
                  onValueChange={(value: "monthly" | "quarterly" | "annual") => {
                    field.onChange(value);
                    handleSubscriptionTypeChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subscription type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Status*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subscriptionStart"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          handleStartDateChange(date);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subscriptionEnd"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date*</FormLabel>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className="pl-3 text-left font-normal bg-gray-100"
                    disabled
                  >
                    {field.value ? format(field.value, "PPP") : "Calculated end date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Member"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddMemberForm;
