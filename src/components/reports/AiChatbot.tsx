
import { FC, useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizontal, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AiChatbot: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your gym analytics assistant. Ask me how to improve your gym's KPIs and performance metrics.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Sample responses based on keywords
  const getAiResponse = (question: string): string => {
    const lowerCaseQuestion = question.toLowerCase();
    
    if (lowerCaseQuestion.includes('revenue') || lowerCaseQuestion.includes('income')) {
      return "To improve revenue, consider: 1) Introducing premium membership tiers, 2) Adding specialized classes with separate fees, 3) Implementing personal training packages, 4) Creating seasonal promotions, 5) Starting a referral program that rewards existing members.";
    } else if (lowerCaseQuestion.includes('attendance') || lowerCaseQuestion.includes('visit')) {
      return "To increase gym attendance: 1) Create a loyalty program with rewards for frequent visits, 2) Introduce group challenges and competitions, 3) Improve class variety and scheduling, 4) Send personalized reminders, 5) Consider extended hours for early birds or night owls.";
    } else if (lowerCaseQuestion.includes('retention') || lowerCaseQuestion.includes('keep members')) {
      return "To improve member retention: 1) Implement regular fitness assessments to show progress, 2) Create a community through social events, 3) Offer varied workout programs to prevent boredom, 4) Proactively reach out to members who haven't visited recently, 5) Collect and act on member feedback.";
    } else if (lowerCaseQuestion.includes('new members') || lowerCaseQuestion.includes('acquisition')) {
      return "To attract new members: 1) Offer compelling intro deals, 2) Partner with local businesses for cross-promotion, 3) Host free community events, 4) Leverage social media with success stories, 5) Implement a strong referral program with incentives for current members.";
    } else {
      return "I can help you improve various aspects of your gym business including revenue, attendance, member retention, and acquisition. What specific area would you like guidance on?";
    }
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: getAiResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-fitness-purple" />
          AI Analytics Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={cn(
              "flex items-start gap-2 max-w-[85%]",
              message.sender === 'user' ? "ml-auto" : "mr-auto"
            )}
          >
            <div className={cn(
              "rounded-lg p-3",
              message.sender === 'user' 
                ? "bg-fitness-purple text-white rounded-tr-none"
                : "bg-gray-100 text-gray-800 rounded-tl-none"
            )}>
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full gap-2">
          <Input 
            placeholder="Ask how to improve your gym metrics..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="bg-fitness-purple hover:bg-fitness-lightpurple"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AiChatbot;
