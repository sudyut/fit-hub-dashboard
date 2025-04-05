
import { FC, ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change: number;
  isPositive: boolean;
}

const KpiCard: FC<KpiCardProps> = ({ title, value, icon, change, isPositive }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="text-2xl font-bold">{value}</div>
          </div>
          <div className="p-2 bg-fitness-purple/10 rounded-full text-fitness-purple">
            {icon}
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-sm">
          <div 
            className={cn(
              "flex items-center font-medium",
              isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            {isPositive ? (
              <ArrowUp className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4" />
            )}
            {Math.abs(change)}%
          </div>
          <span className="text-muted-foreground ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
