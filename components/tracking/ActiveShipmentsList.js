import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Clock, Calendar, ListFilter } from 'lucide-react';

const ActiveShipmentsList = ({ shipments, selectedShipmentId, onSelectShipment }) => {
  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Picked Up':
        return 'bg-blue-500';
      case 'In Transit':
        return 'bg-yellow-500';
      case 'Out for Delivery':
        return 'bg-purple-500';
      case 'Delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <ListFilter className="w-5 h-5 mr-2 text-teal-500" />
          Active Shipments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-140">
          <div className="space-y-4 pr-4">
            {shipments.map((shipment) => (
              <div
                key={shipment.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedShipmentId === shipment.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => onSelectShipment(shipment)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium">{shipment.id}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>Updated {shipment.lastUpdate}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(shipment.status)}>
                    {shipment.status}
                  </Badge>
                </div>

                <div className="flex items-center text-sm my-2">
                  <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                  <span>{shipment.origin}</span>
                  <span className="mx-2 text-xs text-gray-400">to</span>
                  <MapPin className="w-4 h-4 text-blue-500 mr-1" />
                  <span>{shipment.destination}</span>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{shipment.progress}%</span>
                  </div>
                  <Progress value={shipment.progress} className="h-2" />
                </div>

                <div className="flex items-center text-xs mt-3">
                  <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                  <span>Est. Delivery: {shipment.estimatedDelivery}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActiveShipmentsList;