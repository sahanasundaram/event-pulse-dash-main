
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Filter } from 'lucide-react';
import { apiService } from '@/services/mockApiService';

const EventStream = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiService.getEventStream();
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
    
    if (autoRefresh) {
      const interval = setInterval(fetchEvents, 2000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusBadge = (status: string) => {
    const variants = {
      processed: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    
    return variants[status] || variants.pending;
  };

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
          <h2 className="text-3xl font-bold text-gray-900">Event Stream</h2>
          <p className="text-gray-500 mt-1">Real-time event processing activity</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              autoRefresh 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            <span>{autoRefresh ? 'Auto Refresh On' : 'Auto Refresh Off'}</span>
          </button>
        </div>
      </div>

      {/* Event List */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center justify-between">
            <span>Recent Events</span>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Stream</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className="p-4 hover:bg-gray-50 transition-colors"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge className={`${getStatusBadge(event.status)} border-0`}>
                        {event.status}
                      </Badge>
                      <span className="font-medium text-gray-900">{event.type}</span>
                      <span className="text-sm text-gray-500">from {event.source}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>ID: {event.id}</span>
                      <span>User: {event.userId}</span>
                      <span>Latency: {event.latency}ms</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventStream;
