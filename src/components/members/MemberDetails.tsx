import { FC, useState } from "react";
import { Member } from "./MembersTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Award, Activity, Plus, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface MemberDetailsProps {
  member: Member;
  onBack: () => void;
}

const MemberDetails: FC<MemberDetailsProps> = ({ member, onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("physical");
  const [showGeneratePanel, setShowGeneratePanel] = useState<string | null>(null);

  const calculateBMI = () => {
    if (!member.weight) return "N/A";
    const heightInM = member.height / 100;
    const bmi = member.weight / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  const handleGeneratePlan = (type: string) => {
    setShowGeneratePanel(type);
  };

  const handleSavePlan = (type: string) => {
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Plan Saved`,
      description: `The ${type} plan has been saved successfully.`,
    });
    setShowGeneratePanel(null);
  };

  const isDataAvailable = (section: string) => {
    switch (section) {
      case "physical":
        return Boolean(member.physicalDetails);
      case "goals":
        return Boolean(member.goalsPreferences);
      case "activity":
        return Boolean(member.activityPerformance);
      default:
        return false;
    }
  };

  const formSchema = z.object({
    planType: z.enum(["beginner", "intermediate", "advanced"], {
      required_error: "Please select a plan type.",
    }),
    duration: z.enum(["4weeks", "8weeks", "12weeks"], {
      required_error: "Please select a duration.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planType: "intermediate",
      duration: "8weeks",
    },
  });

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Member Profile: {member.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Unique ID</p>
                <p>{member.uniqueId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p>{member.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Age</p>
                <p>{member.age} years</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                <p>{member.dateOfBirth || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p>{member.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{member.email || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Subscription Type</p>
                <p className="capitalize">{member.subscriptionType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Payment Status</p>
                <p className="capitalize">{member.paymentStatus}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Start Date</p>
                <p>{member.subscriptionStart}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">End Date</p>
                <p>{member.subscriptionEnd}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p>{member.address || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Emergency Contact</p>
              <p>{member.emergencyContact || "Not provided"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="physical" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Physical Details
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Goals & Preferences
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity & Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="physical">
          {isDataAvailable("physical") ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Body Measurements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Height</p>
                      <p>{member.height} cm</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Weight</p>
                      <p>{member.weight ? `${member.weight} kg` : "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Body Fat</p>
                      <p>{member.bodyFat ? `${member.bodyFat}%` : "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">BMI</p>
                      <p>{calculateBMI()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detailed Measurements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Chest</p>
                      <p>{member.physicalDetails?.bodyMeasurements?.chest ? `${member.physicalDetails.bodyMeasurements.chest} cm` : "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Waist</p>
                      <p>{member.physicalDetails?.bodyMeasurements?.waist ? `${member.physicalDetails.bodyMeasurements.waist} cm` : "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Hips</p>
                      <p>{member.physicalDetails?.bodyMeasurements?.hips ? `${member.physicalDetails.bodyMeasurements.hips} cm` : "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Arms</p>
                      <p>{member.physicalDetails?.bodyMeasurements?.arms ? `${member.physicalDetails.bodyMeasurements.arms} cm` : "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Legs</p>
                      <p>{member.physicalDetails?.bodyMeasurements?.legs ? `${member.physicalDetails.bodyMeasurements.legs} cm` : "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Fitness Level</p>
                      <p>{member.physicalDetails?.fitnessLevel || "Not provided"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Data Available</CardTitle>
                <CardDescription>
                  The member has not updated their physical details yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Please ask the member to update their physical details from their dashboard.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="goals">
          {isDataAvailable("goals") ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fitness Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Goals</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {member.goalsPreferences?.goals?.map((goal) => (
                            <Badge key={goal} className="bg-fitness-purple">
                              {goal.charAt(0).toUpperCase() + goal.slice(1)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Timeline</p>
                        <p className="capitalize">{member.goalsPreferences?.timeline || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Workout Frequency</p>
                        <p>{member.goalsPreferences?.workoutFrequency ? `${member.goalsPreferences.workoutFrequency} times/week` : "Not specified"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Workout & Diet Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Workout Styles</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {member.goalsPreferences?.workoutStyles?.map((style) => (
                            <Badge key={style} className="bg-fitness-purple">
                              {style.charAt(0).toUpperCase() + style.slice(1)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Diet Preference</p>
                        <p className="capitalize">{member.goalsPreferences?.dietPreference || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Diet Remarks</p>
                        <p>{member.goalsPreferences?.dietRemarks || "None"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personalized Plan Generation</CardTitle>
                    <CardDescription>
                      Generate customized workout and diet plans for this member.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-4">
                    <Button
                      className="bg-fitness-purple hover:bg-fitness-lightpurple"
                      onClick={() => handleGeneratePlan("workout")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Generate Workout Plan
                    </Button>
                    <Button
                      className="bg-fitness-purple hover:bg-fitness-lightpurple"
                      onClick={() => handleGeneratePlan("diet")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Generate Diet Plan
                    </Button>
                  </CardContent>
                </Card>

                {showGeneratePanel && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Generate {showGeneratePanel.charAt(0).toUpperCase() + showGeneratePanel.slice(1)} Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form className="space-y-4">
                          <FormField
                            control={form.control}
                            name="planType"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel>Plan Type</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-4"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="beginner" id="beginner" />
                                      <label htmlFor="beginner">Beginner</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="intermediate" id="intermediate" />
                                      <label htmlFor="intermediate">Intermediate</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="advanced" id="advanced" />
                                      <label htmlFor="advanced">Advanced</label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-4"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="4weeks" id="4weeks" />
                                      <label htmlFor="4weeks">4 weeks</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="8weeks" id="8weeks" />
                                      <label htmlFor="8weeks">8 weeks</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="12weeks" id="12weeks" />
                                      <label htmlFor="12weeks">12 weeks</label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowGeneratePanel(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-fitness-purple hover:bg-fitness-lightpurple"
                        onClick={() => handleSavePlan(showGeneratePanel)}
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Generate Plan
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Data Available</CardTitle>
                <CardDescription>
                  The member has not updated their goals and preferences yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Please ask the member to update their goals and preferences from their dashboard.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity">
          {isDataAvailable("activity") ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance & Achievement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-fitness-purple h-2.5 rounded-full" 
                          style={{ width: `${member.activityPerformance?.attendance || 0}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-1">{member.activityPerformance?.attendance || 0}%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Goal Achievement</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-fitness-purple h-2.5 rounded-full" 
                          style={{ width: `${member.activityPerformance?.goalAchievement || 0}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-1">{member.activityPerformance?.goalAchievement || 0}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Workouts</CardTitle>
                </CardHeader>
                <CardContent>
                  {member.activityPerformance?.workoutHistory?.length ? (
                    <div className="space-y-4">
                      {member.activityPerformance.workoutHistory.map((workout, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{workout.workout}</p>
                            <p className="text-sm text-gray-500">{workout.date}</p>
                          </div>
                          <p className="text-sm">{workout.duration} min</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No workout history available.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Progress Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  {member.activityPerformance?.progressLogs?.length ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Date</th>
                            <th className="text-left py-2">Weight (kg)</th>
                            <th className="text-left py-2">Body Fat (%)</th>
                            <th className="text-left py-2">Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {member.activityPerformance.progressLogs.map((log, index) => {
                            const prevLog = index > 0 ? member.activityPerformance?.progressLogs?.[index - 1] : null;
                            const weightChange = prevLog ? log.weight - prevLog.weight : 0;
                            const bodyFatChange = prevLog ? log.bodyFat - prevLog.bodyFat : 0;
                            
                            return (
                              <tr key={index} className="border-b">
                                <td className="py-2">{log.date}</td>
                                <td className="py-2">{log.weight}</td>
                                <td className="py-2">{log.bodyFat}%</td>
                                <td className="py-2">
                                  {index > 0 ? (
                                    <div className="space-y-1">
                                      <p className={weightChange > 0 ? "text-red-500" : "text-green-500"}>
                                        {weightChange > 0 ? "+" : ""}{weightChange.toFixed(1)} kg
                                      </p>
                                      <p className={bodyFatChange > 0 ? "text-red-500" : "text-green-500"}>
                                        {bodyFatChange > 0 ? "+" : ""}{bodyFatChange.toFixed(1)}%
                                      </p>
                                    </div>
                                  ) : (
                                    "Baseline"
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No progress logs available.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Data Available</CardTitle>
                <CardDescription>
                  The member has not recorded any activity or performance data yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Activity data will be recorded automatically as the member attends sessions and logs their progress.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberDetails;
