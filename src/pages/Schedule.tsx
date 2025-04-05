
import { FC, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Link as LinkIcon, Copy, Check, Video, Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, addHours, parseISO, isSameDay } from "date-fns";

interface Meeting {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  attendees: string[];
  meetingType: string;
  meetingLink?: string;
  description?: string;
}

const Schedule: FC = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: "1",
      title: "Morning Fitness Class",
      date: new Date(),
      startTime: "08:00",
      endTime: "09:00",
      attendees: ["John Doe", "Emma Wilson"],
      meetingType: "In Person",
      description: "High-intensity interval training for beginners"
    },
    {
      id: "2",
      title: "Personal Training - Michael",
      date: new Date(),
      startTime: "10:30",
      endTime: "11:30",
      attendees: ["Michael Smith"],
      meetingType: "In Person",
      description: "Strength training session"
    },
    {
      id: "3",
      title: "Nutrition Consultation",
      date: new Date(),
      startTime: "14:00",
      endTime: "15:00",
      attendees: ["Sarah Johnson"],
      meetingType: "Zoom",
      meetingLink: "https://zoom.us/j/123456789",
      description: "Diet planning and nutritional advice"
    }
  ]);
  
  const [newMeeting, setNewMeeting] = useState<Partial<Meeting>>({
    date: new Date(),
    meetingType: "In Person"
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  const filteredMeetings = selectedDate 
    ? meetings.filter(meeting => isSameDay(meeting.date, selectedDate))
    : [];
    
  const handleCreateMeeting = () => {
    if (!newMeeting.title || !newMeeting.startTime || !newMeeting.endTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const meeting: Meeting = {
      id: Date.now().toString(),
      title: newMeeting.title!,
      date: newMeeting.date!,
      startTime: newMeeting.startTime!,
      endTime: newMeeting.endTime!,
      attendees: newMeeting.attendees || [],
      meetingType: newMeeting.meetingType!,
      meetingLink: newMeeting.meetingLink,
      description: newMeeting.description
    };
    
    setMeetings([...meetings, meeting]);
    setNewMeeting({
      date: new Date(),
      meetingType: "In Person"
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Meeting created",
      description: `${meeting.title} has been scheduled.`
    });
  };
  
  const copyMeetingLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    
    toast({
      title: "Link copied",
      description: "Meeting link copied to clipboard."
    });
    
    setTimeout(() => setLinkCopied(false), 3000);
  };
  
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour < 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourFormatted = hour.toString().padStart(2, '0');
        const minuteFormatted = minute.toString().padStart(2, '0');
        slots.push(`${hourFormatted}:${minuteFormatted}`);
      }
    }
    return slots;
  };
  
  return (
    <div className="flex h-screen bg-fitness-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName="Mike" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Schedule</h1>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-fitness-purple hover:bg-fitness-lightpurple">
                  <Plus className="h-4 w-4 mr-2" /> Create Meeting
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Create New Meeting</DialogTitle>
                  <DialogDescription>
                    Add details for your new meeting or class.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Meeting title"
                      className="col-span-3"
                      value={newMeeting.title || ""}
                      onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <div className="col-span-3">
                      <Calendar
                        mode="single"
                        selected={newMeeting.date}
                        onSelect={(date) => setNewMeeting({...newMeeting, date})}
                        className="border rounded-md p-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <div className="col-span-3 flex gap-2">
                      <Select 
                        value={newMeeting.startTime} 
                        onValueChange={(value) => setNewMeeting({...newMeeting, startTime: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTimeSlots().map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="flex items-center">to</span>
                      <Select 
                        value={newMeeting.endTime} 
                        onValueChange={(value) => setNewMeeting({...newMeeting, endTime: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTimeSlots().map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select 
                      value={newMeeting.meetingType} 
                      onValueChange={(value) => setNewMeeting({...newMeeting, meetingType: value})}
                    >
                      <SelectTrigger className="w-full col-span-3">
                        <SelectValue placeholder="Meeting type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Person">In Person</SelectItem>
                        <SelectItem value="Zoom">Zoom</SelectItem>
                        <SelectItem value="Google Meet">Google Meet</SelectItem>
                        <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {newMeeting.meetingType && newMeeting.meetingType !== "In Person" && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="link" className="text-right">
                        Meeting Link
                      </Label>
                      <Input
                        id="link"
                        placeholder="Paste meeting link here"
                        className="col-span-3"
                        value={newMeeting.meetingLink || ""}
                        onChange={(e) => setNewMeeting({...newMeeting, meetingLink: e.target.value})}
                      />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="attendees" className="text-right">
                      Attendees
                    </Label>
                    <Input
                      id="attendees"
                      placeholder="Enter names separated by commas"
                      className="col-span-3"
                      value={newMeeting.attendees?.join(", ") || ""}
                      onChange={(e) => setNewMeeting({
                        ...newMeeting, 
                        attendees: e.target.value.split(",").map(name => name.trim()).filter(Boolean)
                      })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      placeholder="Meeting description"
                      className="col-span-3"
                      value={newMeeting.description || ""}
                      onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateMeeting}>
                    Create Meeting
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="w-full"
                />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>
                  {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No Date Selected"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredMeetings.length > 0 ? (
                  <div className="space-y-4">
                    {filteredMeetings.map((meeting) => (
                      <Card key={meeting.id} className="overflow-hidden">
                        <div className="flex border-l-4 border-fitness-purple">
                          <div className="p-4 text-center flex flex-col justify-center bg-gray-50 w-24">
                            <div className="text-sm text-gray-500">
                              {meeting.startTime}
                            </div>
                            <div className="text-sm text-gray-500">
                              {meeting.endTime}
                            </div>
                          </div>
                          <CardContent className="p-4 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">{meeting.title}</h3>
                                {meeting.description && (
                                  <p className="text-sm text-gray-500 mt-1">{meeting.description}</p>
                                )}
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {meeting.attendees.map((attendee, index) => (
                                    <span 
                                      key={index}
                                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-fitness-purple/10 text-fitness-purple"
                                    >
                                      {attendee}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-fitness-purple">
                                  {meeting.meetingType}
                                </span>
                                
                                {meeting.meetingLink && (
                                  <Button 
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2"
                                    onClick={() => copyMeetingLink(meeting.meetingLink!)}
                                  >
                                    {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No meetings scheduled</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      There are no meetings scheduled for this day. Create a new meeting to get started.
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="mt-6 bg-fitness-purple hover:bg-fitness-lightpurple">
                          <Plus className="h-4 w-4 mr-2" /> Create Meeting
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        {/* Same dialog content as above */}
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
