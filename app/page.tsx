"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Truck, Package, ChevronDown, ChevronUp, Clock, CheckCircle, Calendar, Phone, Map, History, ListFilter } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import 'leaflet/dist/leaflet.css';
import { drawShipmentRoute } from '@/utils/mapUtils';

// Import shipment data from separate file
import { activeShipments, pastShipments } from '@/data/shipmentData';

const TrackPage = () => {
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerRef = useRef(null);

  // Set the second shipment as selected by default
  useEffect(() => {
    // Select the second shipment (index 1) by default
    if (activeShipments.length >= 2) {
      setSelectedShipment(activeShipments[1]);
    }
  }, []);

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
        mapInstanceRef.current = L.map(mapRef.current).setView(selectedShipment.currentCoords, 4);

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
          if (isCurrent) markerColor = "#3b82f6"; // blue for current

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

        // Use our utility function to draw the route with appropriate styling based on transport mode
        const routeLayers = await drawShipmentRoute(L, mapInstanceRef.current, selectedShipment);
        
        if (routeLayers) {
          routeLayerRef.current = routeLayers;
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
        {/* Left column - 5 columns on large screens */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Active Shipments List */}
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
                    {activeShipments.map((shipment) => (
                      <div 
                        key={shipment.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedShipment && selectedShipment.id === shipment.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                        onClick={() => handleSelectShipment(shipment)}
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
                          <ChevronDown className="w-4 h-4 text-gray-400 mx-1" />
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

            {/* Past Shipments */}
            <Collapsible
              open={isHistoryOpen}
              onOpenChange={setIsHistoryOpen}
              className="shadow-md rounded-lg border"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 border-b hover:bg-gray-50">
                <div className="flex items-center">
                  <History className="w-5 h-5 mr-2 text-teal-500" />
                  <span className="font-medium">Past Shipments</span>
                </div>
                {isHistoryOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4">
                <div className="space-y-3">
                  {pastShipments.map((shipment) => (
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
                        <ChevronDown className="w-3 h-3 text-gray-400 mx-1" />
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
          </div>
        </div>

        {/* Right column - 7 columns on large screens */}
        <div className="lg:col-span-9">
          <div className="space-y-6">
            {/* Leaflet Map at the top */}
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

            {/* Shipment Details */}
            {selectedShipment ? (
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
                  {selectedShipment.checkpoints && selectedShipment.checkpoints.some(cp => cp.location === selectedShipment.currentLocation) && (
                    <div className="mt-4 border-t pt-4">
                      <p className="font-medium mb-3">Current Environmental Data</p>
                      
                      {(() => {
                        const currentCheckpoint = selectedShipment.checkpoints.find(
                          cp => cp.location === selectedShipment.currentLocation
                        );
                        
                        if (currentCheckpoint && currentCheckpoint.envData) {
                          const envData = currentCheckpoint.envData;
                          return (
                            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                  <span className="text-red-500 text-xs">°C</span>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Temperature</p>
                                  <p className="font-medium">{envData.temperature !== null ? `${envData.temperature}°C` : 'N/A'}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                  <span className="text-blue-500 text-xs">%</span>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Humidity</p>
                                  <p className="font-medium">{envData.humidity !== null ? `${envData.humidity}%` : 'N/A'}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                                  <span className="text-yellow-500 text-xs">lx</span>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Light Level</p>
                                  <p className="font-medium">{envData.lux !== null ? `${envData.lux} lux` : 'N/A'}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                  <span className="text-green-500 text-xs">%</span>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Battery Life</p>
                                  <p className="font-medium">{envData.batteryLife !== null ? `${envData.batteryLife}%` : 'N/A'}</p>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          return <p className="text-sm text-gray-500">No environmental data available</p>;
                        }
                      })()}
                    </div>
                  )}

                  <div className="mt-4 border-t pt-4">
                    <p className="font-medium mb-3">Shipment Timeline</p>
                    <div className="space-y-4">
                      {selectedShipment.checkpoints.map((checkpoint, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${checkpoint.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                              {checkpoint.location === selectedShipment.currentLocation ? (
                                <Truck className="w-4 h-4 text-blue-500" />
                              ) : checkpoint.completed ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <Clock className="w-4 h-4" />
                              )}
                            </div>
                            {index < selectedShipment.checkpoints.length - 1 && (
                              <div className={`w-0.5 h-full ${checkpoint.completed ? 'bg-green-200' : 'bg-gray-200'}`}></div>
                            )}
                          </div>
                          <div className="pb-6">
                            <p className={`text-sm font-medium ${checkpoint.location === selectedShipment.currentLocation ? 'text-blue-600' : ''}`}>{checkpoint.status}</p>
                            <p className="text-xs text-gray-500">{checkpoint.time}</p>
                            <p className="text-xs text-gray-500">{checkpoint.location}</p>
                            
                            {checkpoint.envData && (
                              <div className="mt-1 text-xs border-t border-gray-100 pt-1">
                                <div className="grid grid-cols-2 gap-1">
                                  <div className="flex items-center">
                                    <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-1" title="Temperature">
                                      <span className="text-red-500 text-[8px]">°C</span>
                                    </span>
                                    <span>{checkpoint.envData.temperature !== null ? `${checkpoint.envData.temperature}°C` : 'N/A'}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-1" title="Humidity">
                                      <span className="text-blue-500 text-[8px]">%</span>
                                    </span>
                                    <span>{checkpoint.envData.humidity !== null ? `${checkpoint.envData.humidity}%` : 'N/A'}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center mr-1" title="Light Level">
                                      <span className="text-yellow-500 text-[8px]">lx</span>
                                    </span>
                                    <span>{checkpoint.envData.lux !== null ? `${checkpoint.envData.lux} lux` : 'N/A'}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-1" title="Battery Life">
                                      <span className="text-green-500 text-[8px]">%</span>
                                    </span>
                                    <span>{checkpoint.envData.batteryLife !== null ? `${checkpoint.envData.batteryLife}%` : 'N/A'}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </CardContent>
              </Card>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
