
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, HardDrive, Activity, Zap, Database, Network } from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';
import { apiService } from '@/services/mockApiService';

const DeveloperMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await apiService.getDeveloperMetrics();
        setMetrics(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch developer metrics:', error);
        setIsLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading || !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Developer Metrics</h2>
        <p className="text-gray-500 mt-1">System-wide performance and infrastructure metrics</p>
      </div>

      {/* System Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="System Throughput"
          value={`${metrics.systemThroughput}/sec`}
          change="+7.8%"
          changeType="positive"
          icon={Zap}
          trend="up"
        />
        <MetricCard
          title="Global Error Rate"
          value={`${metrics.errorRate.toFixed(2)}%`}
          change="-0.8%"
          changeType="positive"
          icon={Activity}
          trend="down"
        />
        <MetricCard
          title="Avg Latency"
          value={`${metrics.avgLatency}ms`}
          change="-12.3%"
          changeType="positive"
          icon={Network}
          trend="down"
        />
      </div>

      {/* Infrastructure Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center space-x-2">
              <Cpu className="h-5 w-5 text-blue-600" />
              <span>Resource Usage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">CPU Usage</span>
                  <span className="text-sm font-bold text-gray-900">{metrics.cpuUsage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.cpuUsage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Memory Usage</span>
                  <span className="text-sm font-bold text-gray-900">{metrics.memoryUsage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.memoryUsage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-green-600" />
              <span>Queue Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Connections</span>
                <span className="text-lg font-bold text-gray-900">{metrics.activeConnections}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Queue Depth</span>
                <span className="text-lg font-bold text-gray-900">{metrics.queueDepth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Processing Rate</span>
                <span className="text-lg font-bold text-green-600">Normal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Health */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle>Service Health Status</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Event Ingestion', status: 'healthy', uptime: '99.9%' },
              { name: 'Data Processing', status: 'healthy', uptime: '99.8%' },
              { name: 'Storage Layer', status: 'healthy', uptime: '99.9%' },
              { name: 'API Gateway', status: 'healthy', uptime: '99.7%' },
            ].map((service, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{service.name}</span>
                  <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500">Uptime: {service.uptime}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperMetrics;
