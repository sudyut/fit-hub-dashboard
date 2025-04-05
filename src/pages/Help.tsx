
import { FC, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  FileQuestion, 
  Search, 
  BookOpen, 
  MessageCircle, 
  Video, 
  Mail, 
  Phone, 
  ExternalLink,
  Users,
  BarChart3,
  CalendarDays,
  Dumbbell,
  CreditCard,
  Settings,
  Send
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Help: FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const faqs = [
    {
      question: "How do I add a new member to the system?",
      answer: "To add a new member, navigate to the Members page and click on the 'Add New Member' button. Fill in the required details in the form and click 'Save' to add the member to the system."
    },
    {
      question: "How do I generate workout and diet plans for members?",
      answer: "To generate plans, go to the Members page, select a member, and navigate to the 'Goals and Preferences' tab. From there, you can click on the 'Generate Workout Plan' or 'Generate Diet Plan' buttons. The AI will create a plan based on the member's preferences and goals which you can then edit and save."
    },
    {
      question: "How can I track member attendance?",
      answer: "Member attendance is tracked in the Activity and Performance section of each member's profile. You can also view overall attendance patterns in the Reports section under the Attendance tab."
    },
    {
      question: "How do I schedule a meeting or class?",
      answer: "Go to the Schedule page and click on the 'Create Meeting' button. Fill in the meeting details, select the date and time, add attendees, and save the meeting. The meeting will appear on the calendar and attendees will be notified."
    },
    {
      question: "Can I export reports and analytics data?",
      answer: "Yes, on the Reports page, you can export data by clicking on the export button available on each report section. You can export the data in CSV or PDF format."
    },
    {
      question: "How do I manage subscription plans and payments?",
      answer: "You can manage subscription plans from the Members page. Select a member and update their subscription details. Payment status can be tracked and updated from the same section."
    },
    {
      question: "How can I customize notification settings?",
      answer: "Go to the Settings page and select the Notifications tab. From there, you can customize which notifications you receive and how you receive them."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, the system is optimized for web browsers but works well on mobile devices. A dedicated mobile app is in development and will be available soon."
    },
  ];
  
  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, this would send the form data to a server
    toast({
      title: "Message sent",
      description: "Your message has been sent. We'll get back to you soon!"
    });
    
    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  
  return (
    <div className="flex h-screen bg-fitness-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName="Mike" />
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Help Center</h1>
          
          <Tabs defaultValue="faqs" className="w-full">
            <TabsList className="mb-6 flex flex-wrap">
              <TabsTrigger value="faqs" className="flex items-center gap-2">
                <FileQuestion className="h-4 w-4" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="documentation" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Documentation
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Video Tutorials
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Contact Support
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="faqs">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find answers to common questions about using the FitHub management system.
                  </CardDescription>
                  <div className="relative mt-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search FAQs..."
                      className="pl-10 pr-4 py-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredFaqs.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFaqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left font-medium">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-8">
                      <FileQuestion className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">No FAQs found</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Try adjusting your search terms or browse through our documentation.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documentation">
              <Card>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>
                    Browse through our comprehensive documentation to learn how to use all features.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="p-3 rounded-full bg-fitness-purple/10 text-fitness-purple mb-4">
                              <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Member Management</h3>
                            <p className="text-sm text-muted-foreground">
                              Learn how to add, edit, and manage member profiles and memberships.
                            </p>
                            <Button variant="link" className="mt-4 text-fitness-purple">
                              Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="p-3 rounded-full bg-fitness-purple/10 text-fitness-purple mb-4">
                              <BarChart3 className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Reports & Analytics</h3>
                            <p className="text-sm text-muted-foreground">
                              Guide to understanding and utilizing the reporting features.
                            </p>
                            <Button variant="link" className="mt-4 text-fitness-purple">
                              Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="p-3 rounded-full bg-fitness-purple/10 text-fitness-purple mb-4">
                              <CalendarDays className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Scheduling</h3>
                            <p className="text-sm text-muted-foreground">
                              Learn how to schedule and manage classes and meetings.
                            </p>
                            <Button variant="link" className="mt-4 text-fitness-purple">
                              Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="p-3 rounded-full bg-fitness-purple/10 text-fitness-purple mb-4">
                              <Dumbbell className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Workout Plans</h3>
                            <p className="text-sm text-muted-foreground">
                              Guide to creating and assigning workout plans to members.
                            </p>
                            <Button variant="link" className="mt-4 text-fitness-purple">
                              Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="p-3 rounded-full bg-fitness-purple/10 text-fitness-purple mb-4">
                              <CreditCard className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Billing & Payments</h3>
                            <p className="text-sm text-muted-foreground">
                              Understand how to manage subscriptions and payments.
                            </p>
                            <Button variant="link" className="mt-4 text-fitness-purple">
                              Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="p-3 rounded-full bg-fitness-purple/10 text-fitness-purple mb-4">
                              <Settings className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">System Settings</h3>
                            <p className="text-sm text-muted-foreground">
                              Learn how to configure and customize your FitHub system.
                            </p>
                            <Button variant="link" className="mt-4 text-fitness-purple">
                              Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="text-center mt-8">
                      <Button className="bg-fitness-purple hover:bg-fitness-lightpurple">
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Full Documentation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tutorials">
              <Card>
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>
                    Watch tutorials to learn how to use FitHub effectively.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                          <Video className="h-12 w-12 text-gray-400" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">Getting Started with FitHub</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            A comprehensive introduction to the FitHub gym management system.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">12:34</span>
                            <Button variant="outline" size="sm" className="h-8">
                              Watch Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                          <Video className="h-12 w-12 text-gray-400" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">Managing Member Profiles</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Learn how to add, edit, and track member information effectively.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">8:45</span>
                            <Button variant="outline" size="sm" className="h-8">
                              Watch Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                          <Video className="h-12 w-12 text-gray-400" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">Creating Workout Plans</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Tutorial for creating personalized workout plans for members.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">15:20</span>
                            <Button variant="outline" size="sm" className="h-8">
                              Watch Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                          <Video className="h-12 w-12 text-gray-400" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">Using the Reports Dashboard</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            How to analyze gym performance using the reporting tools.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">10:15</span>
                            <Button variant="outline" size="sm" className="h-8">
                              Watch Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="text-center mt-8">
                      <Button className="bg-fitness-purple hover:bg-fitness-lightpurple">
                        <Video className="mr-2 h-4 w-4" />
                        View All Tutorials
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Reach out to our support team for assistance with any issues.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-gray-50">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="p-3 rounded-full bg-fitness-purple/10 text-fitness-purple mb-4">
                          <Mail className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Email Support</h3>
                        <p className="text-sm text-muted-foreground">
                          support@fithub.com
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Response time: 24-48 hours
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-50">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="p-3 rounded-full bg-fitness-purple/10 text-fitness-purple mb-4">
                          <Phone className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Phone Support</h3>
                        <p className="text-sm text-muted-foreground">
                          +1 (555) 123-4567
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Mon-Fri, 9am-5pm EST
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-50">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="p-3 rounded-full bg-fitness-purple/10 text-fitness-purple mb-4">
                          <MessageCircle className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Live Chat</h3>
                        <p className="text-sm text-muted-foreground">
                          Available on our website
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          24/7 support for premium users
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Send us a message</h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                          <Input 
                            id="name" 
                            placeholder="Your name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                          <Input 
                            id="email" 
                            type="email"
                            placeholder="Your email address"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                          id="subject" 
                          placeholder="What is your message about?"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                        <Textarea 
                          id="message" 
                          placeholder="How can we help you?"
                          rows={5}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto bg-fitness-purple hover:bg-fitness-lightpurple"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Help;
