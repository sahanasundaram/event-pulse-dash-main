import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Clock, AlertCircle, BarChart } from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';
import { apiService } from '@/services/mockApiService';

const UserInsights = () => {
  const [selectedUser, setSelectedUser] = useState('user_123');
  const [userMetrics, setUserMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserMetrics = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getUserInsights();
        setUserMetrics(data);
      } catch (error) {
        console.error('Failed to fetch user metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserMetrics();
    const interval = setInterval(fetchUserMetrics, 5000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  if (isLoading || !userMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">User Insights</h2>
          <p className="text-gray-500 mt-1">User-specific event processing metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user_123">User 123 (John Doe)</SelectItem>
              <SelectItem value="user_456">User 456 (Jane Smith)</SelectItem>
              <SelectItem value="user_789">User 789 (Bob Wilson)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* User Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Events"
          value={userMetrics.totalEvents.toLocaleString()}
          change="+15.3%"
          changeType="positive"
          icon={BarChart}
          trend="up"
        />
        <MetricCard
          title="Error Rate"
          value={`${userMetrics.errorRate.toFixed(2)}%`}
          change="-0.5%"
          changeType="positive"
          icon={AlertCircle}
          trend="down"
        />
        <MetricCard
          title="Avg Processing Time"
          value={`${userMetrics.avgProcessingTime}ms`}
          change="-8.2%"
          changeType="positive"
          icon={Clock}
          trend="down"
        />
        <MetricCard
          title="Active Sessions"
          value="3"
          change="+2"
          changeType="positive"
          icon={Users}
          trend="up"
        />
      </div>

      {/* Event Breakdown */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle>Event Breakdown by Type</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {userMetrics.eventsByType.map((eventType, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-900 capitalize">
                    {eventType.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{eventType.count.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">events</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium">Event processed successfully</span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(Date.now() - i * 60000).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInsights;
