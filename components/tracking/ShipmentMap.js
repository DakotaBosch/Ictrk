// components/tracking/ShipmentMap.jsx
import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Map, Truck } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { drawShipmentRoute } from '@/utils/mapUtils';

const ShipmentMap = ({ selectedShipment }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerRef = useRef(null);

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

  // Initialize Leaflet map when component mounts and when selectedShipment changes
  useEffect(() => {
    if (!selectedShipment || !mapRef.current) return;

    // Dynamically import Leaflet (to avoid SSR issues)
    const initMap = async () => {
      if (typeof window !== 'undefined') {
        const L = await import('leaflet');

        // If map already exists, remove it first
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        // Create new map instance
        mapInstanceRef.current = L.map(mapRef.current);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstanceRef.current);

        // Add markers for checkpoints
        selectedShipment.checkpoints.forEach((checkpoint) => {
          const isCompleted = checkpoint.completed;
          const isCurrent = checkpoint.location === selectedShipment.currentLocation;

          let markerColor = "#9ca3af"; // gray for future
          if (isCompleted) markerColor = "#10b981"; // green for completed
          //if (isCurrent) markerColor = "#3b82f6"; // blue for current

          // Create a simple circle marker for checkpoints
          const markerIcon = L.divIcon({
            html: `<div style="background-color: ${markerColor}; width: 16px; height: 16px; border-radius: 50%;"></div>`,
            className: '',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });

          // Create a more detailed popup that includes environmental data
          let popupContent = `
            <div style="min-width: 200px;">
              <h4 style="margin: 0 0 5px; font-weight: bold;">${checkpoint.location}</h4>
              <p style="margin: 0 0 5px;"><strong>${checkpoint.status}</strong><br><small>${checkpoint.time}</small></p>
          `;

          // Add environmental data if available
          if (checkpoint.envData) {
            const envData = checkpoint.envData;
            popupContent += `<div style="margin-top: 8px; border-top: 1px solid #eee; padding-top: 6px;">
              <p style="margin: 0 0 3px; font-size: 12px; display: flex; justify-content: space-between;">
                <span>Temperature:</span> <strong>${envData.temperature !== null ? envData.temperature + '°C' : 'N/A'}</strong>
              </p>
              <p style="margin: 0 0 3px; font-size: 12px; display: flex; justify-content: space-between;">
                <span>Humidity:</span> <strong>${envData.humidity !== null ? envData.humidity + '%' : 'N/A'}</strong>
              </p>
              <p style="margin: 0 0 3px; font-size: 12px; display: flex; justify-content: space-between;">
                <span>Light Level:</span> <strong>${envData.lux !== null ? envData.lux + ' lux' : 'N/A'}</strong>
              </p>
              <p style="margin: 0 0 3px; font-size: 12px; display: flex; justify-content: space-between;">
                <span>Battery:</span> <strong>${envData.batteryLife !== null ? envData.batteryLife + '%' : 'N/A'}</strong>
              </p>
            </div>`;
          }

          popupContent += `</div>`;

          L.marker(checkpoint.coords, {icon: markerIcon})
            .addTo(mapInstanceRef.current)
            .bindPopup(popupContent);
        });

        // Use our updated utility function to draw the route
        // This will now use Mapbox for routing if available
        try {
          const routeLayers = await drawShipmentRoute(L, mapInstanceRef.current, selectedShipment);
          if (routeLayers) {
            routeLayerRef.current = routeLayers;
          }
        } catch (error) {
          console.error('Error drawing shipment route:', error);
        }
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedShipment]);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Map className="w-5 h-5 mr-2 text-teal-500" />
            Shipment Route Map
          </CardTitle>
          {selectedShipment && (
            <Badge className={getStatusColor(selectedShipment.status)}>
              {selectedShipment.status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {selectedShipment ? (
          <div ref={mapRef} className="h-140 rounded-lg border bg-gray-50" />
        ) : (
          <div className="h-140 flex items-center justify-center bg-gray-50 rounded-lg border">
            <div className="text-center">
              <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Select a shipment to view route map</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShipmentMap;
