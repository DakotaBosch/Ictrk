'use client';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  origin: [number, number];
  destination: [number, number];
  currentLocation?: [number, number];
  waypoints?: [number, number][];
}

const ShipmentMap: React.FC = ({
  origin,
  destination,
  currentLocation,
  waypoints = []
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapboxgl.supported()) {
      console.error('Your browser does not support Mapbox GL');
      return;
    }
    // Initialize map only once
    if (!map.current && mapContainer.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: origin,
        zoom: 3
      });
      map.current.on('load', () => {
        setLoaded(true);
      });
    }
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [origin]);

  // Add route and markers when map is loaded
  useEffect(() => {
    if (!loaded || !map.current) return;
    // Add origin marker
    new mapboxgl.Marker({ color: '#3b82f6' })
      .setLngLat(origin)
      .addTo(map.current);
    // Add destination marker
    new mapboxgl.Marker({ color: '#ef4444' })
      .setLngLat(destination)
      .addTo(map.current);
    // Add current location marker if available
    if (currentLocation) {
      new mapboxgl.Marker({ color: '#10b981' })
        .setLngLat(currentLocation)
        .addTo(map.current);
    }
    // Add waypoint markers
    waypoints.forEach(waypoint => {
      new mapboxgl.Marker({ color: '#a3a3a3', scale: 0.7 })
        .setLngLat(waypoint)
        .addTo(map.current);
    });
    // Draw the route (simplified for demo)
    const points = [
      origin,
      ...waypoints,
      destination
    ];
    // Add route line
    if (map.current.getSource('route')) {
      (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: points
        }
      });
    } else {
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: points
          }
        }
      });
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 4,
          'line-opacity': 0.7
        }
      });
    }
    // Fit bounds to show the entire route
    const bounds = new mapboxgl.LngLatBounds();
    points.forEach(point => bounds.extend(point as mapboxgl.LngLatLike));
    map.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 12
    });
  }, [loaded, origin, destination, currentLocation, waypoints]);

  return (
    
      
    
  );
};

export default ShipmentMap;
