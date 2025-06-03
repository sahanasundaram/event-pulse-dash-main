
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';
import RealtimeChart from '@/components/ui/RealtimeChart';
import EventMap from '@/components/ui/EventMap';
import { apiService } from '@/services/mockApiService';

const Overview = () => {
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    eventsPerSecond: 0,
    errorRate: 0,
    avgLatency: 0,
    activeUsers: 0,
    systemHealth: 'healthy'
  });

  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await apiService.getSystemMetrics();
        setMetrics(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
        setIsLoading(false);
      }
    };

    const fetchChartData = async () => {
      try {
        const data = await apiService.getEventTrends();
        setChartData(data);
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    };

    // Initial fetch
    fetchMetrics();
    fetchChartData();

    // Set up real-time updates
    const metricsInterval = setInterval(fetchMetrics, 2000);
    const chartInterval = setInterval(fetchChartData, 5000);

    return () => {
      clearInterval(metricsInterval);
      clearInterval(chartInterval);
    };
  }, []);

  if (isLoading) {
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
          <h2 className="text-3xl font-bold text-gray-900">System Overview</h2>
          <p className="text-gray-500 mt-1">Real-time event processing metrics and insights</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-full">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">Live Data</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Events Processed"
          value={metrics.totalEvents.toLocaleString()}
          change="+12.5%"
          changeType="positive"
          icon={Activity}
          trend="up"
        />
        <MetricCard
          title="Events/Second"
          value={metrics.eventsPerSecond.toString()}
          change="+8.2%"
          changeType="positive"
          icon={Zap}
          trend="up"
        />
        <MetricCard
          title="Error Rate"
          value={`${metrics.errorRate.toFixed(2)}%`}
          change="-0.3%"
          changeType="positive"
          icon={AlertCircle}
          trend="down"
        />
        <MetricCard
          title="Avg Latency"
          value={`${metrics.avgLatency}ms`}
          change="-5.1%"
          changeType="positive"
          icon={Clock}
          trend="down"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Event Throughput</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <RealtimeChart data={chartData} />
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span>Event Sources</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <EventMap />
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>System Health</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Ingestion</h3>
              <p className="text-sm text-green-600">Healthy</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Processing</h3>
              <p className="text-sm text-green-600">Healthy</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Storage</h3>
              <p className="text-sm text-green-600">Healthy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
