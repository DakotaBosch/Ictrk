import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';
import EnvironmentalCharts from './EnvironmentalCharts';

const ShipmentDetails = ({ selectedShipment }) => {
  // If no shipment is selected, show a placeholder
  if (!selectedShipment) {
    return (
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Shipment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center">
            <p className="text-gray-500">Select a shipment to view details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Find the current checkpoint for environmental data
  const currentCheckpoint = selectedShipment.checkpoints?.find(
    cp => cp.location === selectedShipment.currentLocation
  );

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Package className="w-5 h-5 mr-2 text-teal-500" />
          Shipment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Shipment ID</p>
            <p className="font-medium">{selectedShipment.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Carrier</p>
            <p className="font-medium">{selectedShipment.carrier}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Origin</p>
            <p className="font-medium">{selectedShipment.origin}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Destination</p>
            <p className="font-medium">{selectedShipment.destination}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estimated Delivery</p>
            <p className="font-medium">{selectedShipment.estimatedDelivery}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Update</p>
            <p className="font-medium">{selectedShipment.lastUpdate}</p>
          </div>
        </div>

        {/* Environmental Data Summary (Current Status) */}
        {currentCheckpoint && currentCheckpoint.envData && (
          <div className="mt-4 border-t pt-4">
            <p className="font-medium mb-3">Current Environmental Data</p>
            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <span className="text-red-500 text-xs">°C</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Temperature</p>
                  <p className="font-medium">
                    {currentCheckpoint.envData.temperature !== null 
                      ? `${currentCheckpoint.envData.temperature}°C` 
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-500 text-xs">%</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Humidity</p>
                  <p className="font-medium">
                    {currentCheckpoint.envData.humidity !== null 
                      ? `${currentCheckpoint.envData.humidity}%` 
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <span className="text-yellow-500 text-xs">lx</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Light Level</p>
                  <p className="font-medium">
                    {currentCheckpoint.envData.lux !== null 
                      ? `${currentCheckpoint.envData.lux} lux` 
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-500 text-xs">%</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Battery Life</p>
                  <p className="font-medium">
                    {currentCheckpoint.envData.batteryLife !== null 
                      ? `${currentCheckpoint.envData.batteryLife}%` 
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Environmental Data Charts */}
        <EnvironmentalCharts shipment={selectedShipment} />
      </CardContent>
    </Card>
  );
};

export default ShipmentDetails;