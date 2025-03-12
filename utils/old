// src/utils/mapUtils.js
import { Plane } from 'lucide-react';

/**
 * Creates an arc path between two points for flying routes
 * @param {Array} start - [lat, lng] coordinates of start point
 * @param {Array} end - [lat, lng] coordinates of end point 
 * @param {Number} arcFactor - Controls the height of the arc (0.2 to 0.5 recommended)
 * @param {Number} pointsCount - Number of points to generate along the arc
 * @returns {Array} Array of [lat, lng] coordinates forming the arc
 */
export const createArcPath = (start, end, arcFactor = 0.08, pointsCount = 30) => {
  const points = [];
  
  // Convert to radians for spherical calculations
  const startLat = start[0] * Math.PI / 180;
  const startLng = start[1] * Math.PI / 180;
  const endLat = end[0] * Math.PI / 180;
  const endLng = end[1] * Math.PI / 180;
  
  // Calculate the great circle distance
  const d = 2 * Math.asin(
    Math.sqrt(
      Math.pow(Math.sin((startLat - endLat) / 2), 2) +
      Math.cos(startLat) * Math.cos(endLat) * 
      Math.pow(Math.sin((startLng - endLng) / 2), 2)
    )
  );
  
  // Generate points along the arc
  for (let i = 0; i <= pointsCount; i++) {
    const f = i / pointsCount;
    
    // Linear interpolation would give a straight line
    // We add a sine wave to create an arc
    const arcHeight = Math.sin(f * Math.PI) * arcFactor;
    
    // Interpolate between the points with added height
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    
    // Calculate the point with added arc height
    const x = A * Math.cos(startLat) * Math.cos(startLng) + 
              B * Math.cos(endLat) * Math.cos(endLng);
    const y = A * Math.cos(startLat) * Math.sin(startLng) + 
              B * Math.cos(endLat) * Math.sin(endLng);
    const z = A * Math.sin(startLat) + 
              B * Math.sin(endLat) + 
              arcHeight;
    
    // Convert back to latitude and longitude
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) * 180 / Math.PI;
    const lng = Math.atan2(y, x) * 180 / Math.PI;
    
    points.push([lat, lng]);
  }
  
  return points;
};

/**
 * Determines the position of a shipment along a route based on progress
 * @param {Array} routeCoords - Array of [lat, lng] coordinates forming the route
 * @param {Number} progress - Percentage of journey completed (0-100)
 * @returns {Array} [lat, lng] coordinates of the current position
 */
export const getPositionAlongRoute = (routeCoords, progress) => {
  if (!routeCoords || routeCoords.length < 2) return null;
  
  // Handle edge cases
  if (progress <= 0) return routeCoords[0];
  if (progress >= 100) return routeCoords[routeCoords.length - 1];
  
  // Find the index based on progress percentage
  const index = Math.floor((progress / 100) * (routeCoords.length - 1));
  
  // Ensure we don't go out of bounds
  if (index >= routeCoords.length - 1) return routeCoords[routeCoords.length - 1];
  
  // Calculate the fine position between the two nearest points
  const remaining = (progress / 100) * (routeCoords.length - 1) - index;
  
  // Linear interpolation between the two points
  const startPoint = routeCoords[index];
  const endPoint = routeCoords[index + 1];
  
  return [
    startPoint[0] + (endPoint[0] - startPoint[0]) * remaining,
    startPoint[1] + (endPoint[1] - startPoint[1]) * remaining
  ];
};

/**
 * Creates a custom SVG icon for Leaflet
 * @param {String} type - Type of transport ('plane', 'truck', 'ship')
 * @param {Number} progress - Progress percentage to determine rotation
 * @param {Array} startCoord - Start coordinates [lat, lng]
 * @param {Array} endCoord - End coordinates [lat, lng]
 * @returns {Object} Leaflet divIcon configuration
 */
export const createTransportIcon = (L, type, progress, routeCoords) => {
  // Determine icon and color based on transport type
  let iconSvg, bgColor;
  
  switch (type) {
    case 'plane':
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>`;
      bgColor = '#3b82f6'; // Blue
      break;
    case 'truck':
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`;
      bgColor = '#8b5cf6'; // Purple
      break;
    case 'ship':
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"></path><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"></path></svg>`;
      bgColor = '#0891b2'; // Cyan
      break;
    default:
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;
      bgColor = '#6b7280'; // Gray
  }
  
  // Calculate rotation angle if we have route coordinates
  let rotationAngle = 0;
  let planeRotationOffset = 0;
  
  if (routeCoords && routeCoords.length >= 2 && type === 'plane') {
    // Apply 90-degree counterclockwise rotation for plane icons
    planeRotationOffset = -90;
    
    // Get current position and the next position
    const currentIndex = Math.min(
      Math.floor((progress / 100) * (routeCoords.length - 1)),
      routeCoords.length - 2
    );
    
    const p1 = routeCoords[currentIndex];
    const p2 = routeCoords[currentIndex + 1];
    
    // Calculate bearing between points
    const lat1 = p1[0] * Math.PI / 180;
    const lat2 = p2[0] * Math.PI / 180;
    const lng1 = p1[1] * Math.PI / 180;
    const lng2 = p2[1] * Math.PI / 180;
    
    const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
    
    rotationAngle = Math.atan2(y, x) * 180 / Math.PI;
  }
  
  // Create the icon HTML with rotation
  const iconHtml = `
    <div style="
      background-color: ${bgColor}; 
      width: 32px; 
      height: 32px; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      transform: rotate(${rotationAngle + planeRotationOffset}deg);
    ">
      ${iconSvg}
    </div>
  `;
  
  return L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

/**
 * Draws a route on the map based on transport type
 * @param {Object} L - Leaflet library instance
 * @param {Object} map - Leaflet map instance
 * @param {Object} shipment - Shipment data object
 * @returns {Object} Object containing route line and vehicle marker
 */
export const drawShipmentRoute = async (L, map, shipment) => {
  if (!map || !shipment || !shipment.checkpoints) return null;
  
  const layers = {
    routeLine: null,
    vehicleMarker: null
  };
  
  // Get coordinates based on transport type
  let routeCoords = [];
  
  if (shipment.mode === 'Air') {
    // For air transport, create an arc between completed checkpoints
    const completedCheckpoints = shipment.checkpoints.filter(cp => cp.completed);
    
    if (completedCheckpoints.length >= 2) {
      // Last completed checkpoint
      const lastCompleted = completedCheckpoints[completedCheckpoints.length - 1];
      
      // Get the next checkpoint (not completed yet)
      const nextCheckpoint = shipment.checkpoints.find(cp => !cp.completed);
      
      if (nextCheckpoint) {
        // Create arc path between the last completed checkpoint and the next one
        const arcRouteCoords = createArcPath(
          lastCompleted.coords,
          nextCheckpoint.coords
        );
        
        // Add all completed checkpoints and the arc path
        routeCoords = [
          ...shipment.checkpoints
            .filter(cp => cp.completed)
            .map(cp => cp.coords)
            .slice(0, -1), // exclude the last completed point as it's the start of the arc
          ...arcRouteCoords
        ];
      } else {
        // If all checkpoints are completed, use them directly
        routeCoords = shipment.checkpoints.map(cp => cp.coords);
      }
    } else {
      // Not enough completed checkpoints, use all available
      routeCoords = shipment.checkpoints.map(cp => cp.coords);
    }
  } else {
    // For other transport modes, use straight lines
    routeCoords = shipment.checkpoints.map(cp => cp.coords);
  }
  
  // Draw the route line
  layers.routeLine = L.polyline(routeCoords, {
    color: shipment.mode === 'Air' ? '#3b82f6' : 
           shipment.mode === 'Land' ? '#8b5cf6' : 
           shipment.mode === 'Ocean' ? '#0891b2' : '#6b7280',
    weight: 3,
    opacity: 0.7,
    dashArray: shipment.mode === 'Air' ? '5, 10' : '0'
  }).addTo(map);
  
  // Calculate vehicle position based on progress
  let vehiclePosition;
  
  // Special handling for ship/ocean transport
  if (shipment.mode === 'Ocean' && shipment.transportType === 'ship') {
    // For ocean shipments, calculate a position along the route manually
    // Get the origin and destination points
    const origin = shipment.checkpoints[0].coords;
    const destination = shipment.checkpoints[shipment.checkpoints.length - 1].coords;
    
    // Calculate position 40% of the way between origin and destination
    vehiclePosition = [
      origin[0] + (destination[0] - origin[0]) * 0.4,
      origin[1] + (destination[1] - origin[1]) * 0.4
    ];
  } else {
    // For other shipment types, use the standard progress calculation
    vehiclePosition = getPositionAlongRoute(routeCoords, shipment.progress);
  }
  
  if (vehiclePosition) {
    // Create a marker for the vehicle
    layers.vehicleMarker = L.marker(vehiclePosition, {
      icon: createTransportIcon(L, shipment.transportType, shipment.progress, routeCoords)
    }).addTo(map);
    
    // Add popup with current location info
    layers.vehicleMarker.bindPopup(`
      <b>${shipment.id}</b><br>
      Current: ${shipment.currentLocation}<br>
      Status: ${shipment.status}<br>
      <small>Updated: ${shipment.lastUpdate}</small>
    `);
  }
  
  // Fit map bounds to show the entire route
  if (routeCoords.length > 1) {
    map.fitBounds(routeCoords);
  }
  
  return layers;
};
