"use client";
import React, { useState, useEffect } from 'react';
import ActiveShipmentsList from '@/components/tracking/ActiveShipmentsList';
import PastShipmentsList from '@/components/tracking/PastShipmentsList';
import ShipmentMap from '@/components/tracking/ShipmentMap';
import ShipmentDetails from '@/components/tracking/ShipmentDetails';

// Import shipment data from separate file
import { activeShipments, pastShipments } from '@/data/shipmentData';

const TrackPage = () => {
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Set the second shipment as selected by default
  useEffect(() => {
    // Select the second shipment (index 1) by default
    if (activeShipments.length >= 2) {
      setSelectedShipment(activeShipments[0]);
    }
  }, []);

  // Function to select a shipment
  const handleSelectShipment = (shipment) => {
    setSelectedShipment(shipment);
  };

  return (
    <div className="px-12 py-6 max-w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Track Shipments</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column - 3 columns on large screens */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Active Shipments List */}
            <ActiveShipmentsList 
              shipments={activeShipments}
              selectedShipmentId={selectedShipment?.id}
              onSelectShipment={handleSelectShipment}
            />

            {/* Past Shipments */}
            <PastShipmentsList 
              shipments={pastShipments}
              isOpen={isHistoryOpen}
              onOpenChange={setIsHistoryOpen}
            />
          </div>
        </div>

        {/* Right column - 9 columns on large screens */}
        <div className="lg:col-span-9">
          <div className="space-y-6">
            {/* Leaflet Map at the top */}
            <ShipmentMap selectedShipment={selectedShipment} />

            {/* Shipment Details */}
            <ShipmentDetails selectedShipment={selectedShipment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
