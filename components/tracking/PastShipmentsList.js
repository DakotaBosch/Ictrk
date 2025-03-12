import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MapPin, Calendar, History, ChevronDown, ChevronUp } from 'lucide-react';

const PastShipmentsList = ({ shipments, isOpen, onOpenChange }) => {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onOpenChange}
      className="shadow-md rounded-lg border"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 border-b hover:bg-gray-50">
        <div className="flex items-center">
          <History className="w-5 h-5 mr-2 text-teal-500" />
          <span className="font-medium">Past Shipments</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <div className="space-y-3">
          {shipments.map((shipment) => (
            <div
              key={shipment.id}
              className="p-3 border rounded-lg hover:border-gray-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium">{shipment.id}</p>
                <Badge className="bg-green-500">Delivered</Badge>
              </div>
              <div className="flex items-center text-sm mb-2">
                <MapPin className="w-3 h-3 text-gray-500 mr-1" />
                <span className="text-xs">{shipment.origin}</span>
                <span className="mx-2 text-xs text-gray-400">to</span>
                <MapPin className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs">{shipment.destination}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Delivered: {shipment.deliveryDate}</span>
                <span className="mx-1 text-gray-300">•</span>
                <span>{shipment.carrier}</span>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PastShipmentsList;