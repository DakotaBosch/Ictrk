// utils/mapboxDirections.js
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');

// Initialize the directions client in a way that's safe for SSR
let directionsService = null;

// Only initialize if we have a token
if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
  try {
    directionsService = mbxDirections({ 
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN 
    });
    console.log('Mapbox directions service initialized successfully');
  } catch (error) {
    console.error('Error initializing Mapbox directions:', error);
  }
}

export async function getRouteCoordinates(checkpoints, transportType = 'driving') {
  // Validate and normalize the transport type to ensure it's a valid Mapbox profile
  let profile = 'driving'; // Default to driving
  
  // Map transport types to valid Mapbox profiles
  if (transportType === 'truck') {
    profile = 'driving-traffic';
  } else if (transportType === 'walking' || transportType === 'pedestrian') {
    profile = 'walking';
  } else if (transportType === 'cycling' || transportType === 'bicycle') {
    profile = 'cycling';
  } else if (transportType !== 'driving' && transportType !== 'driving-traffic') {
    // If it's not one of the valid profiles, use the default
    console.warn(`Invalid transport type "${transportType}", defaulting to "driving"`);
  } else {
    // If it is already a valid profile, use it as is
    profile = transportType;
  }

  console.log("Attempting to get road-snapped route", {
    checkpoints: checkpoints?.length || 0,
    transportType,
    profile,
    hasDirectionsService: !!directionsService,
    mapboxToken: !!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  });
  
  // If directions service isn't available, fall back immediately
  if (!directionsService || !checkpoints || checkpoints.length < 2) {
    console.warn('Mapbox directions service not available or insufficient checkpoints, using fallback route');
    return checkpoints.map(cp => cp.coords);
  }

  try {
    // Validate checkpoint format
    const waypoints = checkpoints.map(checkpoint => {
      if (!checkpoint.coords || !Array.isArray(checkpoint.coords) || checkpoint.coords.length !== 2) {
        console.warn('Invalid checkpoint format', checkpoint);
        return null;
      }
      return {
        coordinates: [checkpoint.coords[1], checkpoint.coords[0]]
      };
    }).filter(wp => wp && wp.coordinates && wp.coordinates[0] !== undefined && wp.coordinates[1] !== undefined);
    
    // Make sure we have enough valid waypoints
    if (waypoints.length < 2) {
      console.warn('Not enough valid waypoints for directions');
      return checkpoints.map(cp => cp.coords);
    }
    
    console.log("Sending request to Mapbox API with profile:", profile);
    const response = await directionsService.getDirections({
      profile: profile,
      waypoints: waypoints.slice(0, 25), // Mapbox has a limit of 25 waypoints
      geometries: 'geojson'
    }).send();
    
    console.log("Mapbox API response received", {
      hasRoutes: !!(response.body.routes && response.body.routes.length > 0),
      coordinatesCount: response.body.routes?.[0]?.geometry?.coordinates?.length || 0
    });
    
    if (response.body.routes && response.body.routes.length > 0) {
      // Return the raw coordinates - we'll convert format in mapUtils
      return response.body.routes[0].geometry.coordinates;
    }
    
    console.warn('No routes found in Mapbox response');
    return checkpoints.map(cp => cp.coords);
  } catch (error) {
    console.error('Error getting directions:', error);
    console.log("Using fallback straight-line route");
    // Fallback to straight lines if the API fails
    return checkpoints.map(cp => cp.coords);
  }
}
