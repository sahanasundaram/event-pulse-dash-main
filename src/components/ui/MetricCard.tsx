
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'stable';
}

const MetricCard = ({ title, value, change, changeType, icon: Icon, trend }: MetricCardProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            <div className="flex items-center space-x-1">
              {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
              {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
              <span className={cn(
                "text-sm font-medium",
                changeType === 'positive' ? "text-green-600" : 
                changeType === 'negative' ? "text-red-600" : "text-gray-600"
              )}>
                {change}
              </span>
              <span className="text-sm text-gray-500">vs last hour</span>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
