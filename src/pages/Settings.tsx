
import { FC, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  AlertCircle,
  Bell,
  Cog,
  Key,
  Lock,
  RefreshCw,
  Save,
  Shield,
  User,
  Palette,
  MessageSquare,
  FileText,
  UserPlus
} from "lucide-react";

const Settings: FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");
  
  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    name: "Mike Johnson",
    email: "mike@fithub.com",
    phone: "+1 (555) 123-4567",
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    membershipAlerts: true,
    paymentReminders: true,
    marketingEmails: false,
    newMemberJoins: true,
    scheduledMeetings: true,
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: 30,
  });
  
  // Gym settings
  const [gymSettings, setGymSettings] = useState({
    gymName: "FitHub Central",
    address: "123 Fitness Street, Gym City, GC 12345",
    contactEmail: "info@fithub.com",
    contactPhone: "+1 (555) 987-6543",
    openingTime: "06:00",
    closingTime: "22:00",
    maxCapacity: 100,
  });
  
  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings saved",
      description: `Your ${section} settings have been updated.`,
    });
  };
  
  return (
    <div className="flex h-screen bg-fitness-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName="Mike" />
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex flex-wrap">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="gym" className="flex items-center gap-2">
                <Cog className="h-4 w-4" />
                Gym Settings
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="staff" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Staff Management
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Update your personal information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={accountSettings.name}
                          onChange={(e) => setAccountSettings({...accountSettings, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={accountSettings.email}
                          onChange={(e) => setAccountSettings({...accountSettings, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={accountSettings.phone}
                        onChange={(e) => setAccountSettings({...accountSettings, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end">
                    <Button 
                      className="bg-fitness-purple hover:bg-fitness-lightpurple"
                      onClick={() => handleSaveSettings('account')}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Control which notifications you receive.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications about important updates.
                        </p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, emailNotifications: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="membership-alerts">Membership Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about membership renewals and expirations.
                        </p>
                      </div>
                      <Switch 
                        id="membership-alerts" 
                        checked={notificationSettings.membershipAlerts}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, membershipAlerts: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="payment-reminders">Payment Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive reminders about upcoming and overdue payments.
                        </p>
                      </div>
                      <Switch 
                        id="payment-reminders" 
                        checked={notificationSettings.paymentReminders}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, paymentReminders: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional content and special offers.
                        </p>
                      </div>
                      <Switch 
                        id="marketing-emails" 
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, marketingEmails: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-member-joins">New Member Joins</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when a new member joins the gym.
                        </p>
                      </div>
                      <Switch 
                        id="new-member-joins" 
                        checked={notificationSettings.newMemberJoins}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, newMemberJoins: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="scheduled-meetings">Scheduled Meetings</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about scheduled meetings and classes.
                        </p>
                      </div>
                      <Switch 
                        id="scheduled-meetings" 
                        checked={notificationSettings.scheduledMeetings}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, scheduledMeetings: checked})
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      className="bg-fitness-purple hover:bg-fitness-lightpurple"
                      onClick={() => handleSaveSettings('notification')}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and authentication.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="password">Password</Label>
                          <p className="text-sm text-muted-foreground">
                            Change your account password.
                          </p>
                        </div>
                        <Button 
                          variant="outline"
                          className="text-fitness-purple border-fitness-purple hover:bg-fitness-purple hover:text-white"
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account.
                          </p>
                        </div>
                        <Switch 
                          id="two-factor" 
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={(checked) => 
                            setSecuritySettings({...securitySettings, twoFactorAuth: checked})
                          }
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="login-notifications">Login Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified of new logins to your account.
                          </p>
                        </div>
                        <Switch 
                          id="login-notifications" 
                          checked={securitySettings.loginNotifications}
                          onCheckedChange={(checked) => 
                            setSecuritySettings({...securitySettings, loginNotifications: checked})
                          }
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after a period of inactivity.
                        </p>
                        <Input 
                          id="session-timeout" 
                          type="number" 
                          min="5" 
                          max="120" 
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => 
                            setSecuritySettings({
                              ...securitySettings, 
                              sessionTimeout: parseInt(e.target.value)
                            })
                          }
                          className="w-full md:w-1/3"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      className="bg-fitness-purple hover:bg-fitness-lightpurple"
                      onClick={() => handleSaveSettings('security')}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gym">
              <Card>
                <CardHeader>
                  <CardTitle>Gym Settings</CardTitle>
                  <CardDescription>
                    Configure general settings for your gym.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gym-name">Gym Name</Label>
                        <Input 
                          id="gym-name" 
                          value={gymSettings.gymName}
                          onChange={(e) => setGymSettings({...gymSettings, gymName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={gymSettings.address}
                          onChange={(e) => setGymSettings({...gymSettings, address: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input 
                          id="contact-email" 
                          type="email"
                          value={gymSettings.contactEmail}
                          onChange={(e) => setGymSettings({...gymSettings, contactEmail: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">Contact Phone</Label>
                        <Input 
                          id="contact-phone" 
                          value={gymSettings.contactPhone}
                          onChange={(e) => setGymSettings({...gymSettings, contactPhone: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="opening-time">Opening Time</Label>
                        <Input 
                          id="opening-time" 
                          type="time"
                          value={gymSettings.openingTime}
                          onChange={(e) => setGymSettings({...gymSettings, openingTime: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="closing-time">Closing Time</Label>
                        <Input 
                          id="closing-time" 
                          type="time"
                          value={gymSettings.closingTime}
                          onChange={(e) => setGymSettings({...gymSettings, closingTime: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-capacity">Max Capacity</Label>
                        <Input 
                          id="max-capacity" 
                          type="number"
                          min="1"
                          value={gymSettings.maxCapacity}
                          onChange={(e) => setGymSettings({
                            ...gymSettings, 
                            maxCapacity: parseInt(e.target.value)
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      className="bg-fitness-purple hover:bg-fitness-lightpurple"
                      onClick={() => handleSaveSettings('gym')}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Gym Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Appearance settings will be implemented in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="staff">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Management</CardTitle>
                  <CardDescription>
                    Manage staff accounts and permissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Staff management settings will be implemented in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
