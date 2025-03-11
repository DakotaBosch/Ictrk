// shipmentData.js
// This file contains all the shipment data for the tracking application

export const activeShipments = [
  {
    id: 'SH-2023-1234',
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
    status: 'In Transit',
    estimatedDelivery: 'March 5, 2025',
    progress: 65,
    carrier: 'Express Logistics',
    mode: 'Air',
    transportType: 'plane',
    lastUpdate: '6 hours ago',
    checkpoints: [
      { time: 'Feb 28, 2025 - 08:30 AM', status: 'Picked Up', location: 'Los Angeles, CA', completed: true, coords: [34.0522, -118.2437] },
      { time: 'Feb 28, 2025 - 05:45 PM', status: 'In Transit', location: 'Phoenix, AZ', completed: true, coords: [33.4484, -112.0740] },
      { time: 'March 5, 2025 - 02:00 PM', status: 'Estimated Delivery', location: 'New York, NY', completed: false, coords: [40.7128, -74.0060] }
    ],
    currentLocation: 'In Flight',
    currentCoords: [37.0902, -95.7129], // Somewhere in the middle of the US
    fullDetails: {
      // Shipment Information
      shipmentId: 'SH-2023-1234',
      customerRefNumber: 'CRN-87622',
      bookingNumber: 'BK-445577',
      carrier: 'Express Logistics',
      transportMode: 'Air Freight',
      serviceLevel: 'Express',
      status: 'In Transit',
      priority: 'High',

      // Origin/Destination
      originLocation: 'Los Angeles, CA',
      originAddress: '1000 Terminal Way, Los Angeles, CA 90045',
      originContactName: 'John Smith',
      originContactPhone: '+1 (213) 555-1234',
      destinationLocation: 'New York, NY',
      destinationAddress: '55 Water St, New York, NY 10041',
      destinationContactName: 'Sarah Johnson',
      destinationContactPhone: '+1 (212) 555-9876',

      // Dates
      bookingDate: 'February 25, 2025',
      pickupDate: 'February 28, 2025',
      estimatedDeliveryDate: 'March 5, 2025',
      actualDeliveryDate: 'Pending',

      // Cargo Details
      packageCount: '3',
      totalWeight: '450 kg',
      totalVolume: '2.8 m³',
      dimensions: '120 x 80 x 110 cm (largest item)',
      cargoDescription: 'Electronic components',
      hazardousMaterials: 'No',
      temperatureControlled: 'No',
      specialHandling: 'Fragile',

      // Financial
      freightCost: '$4,850.00',
      additionalCharges: '$320.00',
      totalCost: '$5,170.00',
      currency: 'USD',
      paymentTerms: 'Net 30',

      // Documents
      commercialInvoice: 'CI-88756',
      airWaybill: 'AWB-123456789',
      packingList: 'PL-88756',
      customsDeclaration: 'CD-34532',

      // Insurance
      insured: 'Yes',
      insuranceValue: '$75,000.00',
      insuranceProvider: 'Global Cargo Insurance Ltd.',

      // Tracking
      lastScanLocation: 'Phoenix Sky Harbor International Airport',
      lastScanTime: 'February 28, 2025 - 07:30 PM',
      nextCheckpoint: 'New York JFK International Airport',
      estimatedArrival: 'March 4, 2025 - 06:15 AM'
    }
  },
  {
    id: 'SH-2023-5678',
    origin: 'Chicago, IL',
    destination: 'Miami, FL',
    status: 'Out for Delivery',
    estimatedDelivery: 'March 2, 2025',
    progress: 85,
    carrier: 'Rapid Transit',
    mode: 'Land',
    transportType: 'truck',
    lastUpdate: '2 hours ago',
    checkpoints: [
      { time: 'Feb 27, 2025 - 10:30 AM', status: 'Picked Up', location: 'Chicago, IL', completed: true, coords: [41.8781, -87.6298] },
      { time: 'Feb 28, 2025 - 02:15 PM', status: 'In Transit', location: 'Indianapolis, IN', completed: true, coords: [39.7684, -86.1581] },
      { time: 'March 1, 2025 - 08:45 AM', status: 'In Transit', location: 'Atlanta, GA', completed: true, coords: [33.7490, -84.3880] },
      { time: 'March 2, 2025 - 09:30 AM', status: 'Out for Delivery', location: 'Miami, FL', completed: true, coords: [25.7617, -80.1918] },
      { time: 'March 2, 2025 - 05:00 PM', status: 'Estimated Delivery', location: 'Miami, FL', completed: false, coords: [25.7617, -80.1918] }
    ],
    currentLocation: 'Miami, FL',
    currentCoords: [25.7617, -80.1918],
    fullDetails: {
      // Shipment Information
      shipmentId: 'SH-2023-5678',
      customerRefNumber: 'CRN-45321',
      bookingNumber: 'BK-778899',
      carrier: 'Rapid Transit',
      transportMode: 'Ground Freight',
      serviceLevel: 'Standard',
      status: 'Out for Delivery',
      priority: 'Medium',

      // Origin/Destination
      originLocation: 'Chicago, IL',
      originAddress: '450 Distribution Way, Chicago, IL 60607',
      originContactName: 'Michael Brown',
      originContactPhone: '+1 (312) 555-4444',
      destinationLocation: 'Miami, FL',
      destinationAddress: '8000 NW 21st St, Miami, FL 33122',
      destinationContactName: 'Carlos Rodriguez',
      destinationContactPhone: '+1 (305) 555-7777',

      // Dates
      bookingDate: 'February 24, 2025',
      pickupDate: 'February 27, 2025',
      estimatedDeliveryDate: 'March 2, 2025',
      actualDeliveryDate: 'Pending',

      // Cargo Details
      packageCount: '8',
      totalWeight: '1,250 kg',
      totalVolume: '5.2 m³',
      dimensions: 'Various',
      cargoDescription: 'Retail merchandise',
      hazardousMaterials: 'No',
      temperatureControlled: 'No',
      specialHandling: 'None',

      // Financial
      freightCost: '$3,200.00',
      additionalCharges: '$475.00',
      totalCost: '$3,675.00',
      currency: 'USD',
      paymentTerms: 'Net 15',

      // Documents
      commercialInvoice: 'CI-34567',
      billOfLading: 'BOL-456788',
      packingList: 'PL-34567',

      // Insurance
      insured: 'Yes',
      insuranceValue: '$50,000.00',
      insuranceProvider: 'Freight Shield Insurance',

      // Tracking
      lastScanLocation: 'Miami Distribution Center',
      lastScanTime: 'March 2, 2025 - 08:15 AM',
      nextCheckpoint: 'Delivery',
      estimatedArrival: 'March 2, 2025 - Between 2:00 PM and 5:00 PM'
    }
  },
  {
    id: 'SH-2023-9012',
    origin: 'Phoenix, AZ',
    destination: 'Albuquerque, NM',
    status: 'In Transit',
    estimatedDelivery: 'March 3, 2025',
    progress: 62,
    carrier: 'Southwest Trucking Co.',
    mode: 'Land',
    transportType: 'truck',
    lastUpdate: '45 minutes ago',
    checkpoints: [
      { time: 'March 2, 2025 - 08:15 AM', status: 'Picked Up', location: 'Phoenix, AZ', completed: true, coords: [33.4484, -112.0740] },
      { time: 'March 2, 2025 - 09:40 AM', status: 'In Transit', location: 'Apache Junction, AZ', completed: true, coords: [33.4150, -111.5450] },
      { time: 'March 2, 2025 - 10:55 AM', status: 'In Transit', location: 'Globe, AZ', completed: true, coords: [33.3942, -110.7865] },
      { time: 'March 2, 2025 - 12:10 PM', status: 'In Transit', location: 'Peridot, AZ', completed: true, coords: [33.3023, -110.4526] },
      { time: 'March 2, 2025 - 01:25 PM', status: 'In Transit', location: 'Show Low, AZ', completed: true, coords: [34.2542, -110.0298] },
      { time: 'March 2, 2025 - 02:40 PM', status: 'In Transit', location: 'Concho, AZ', completed: true, coords: [34.4784, -109.6209] },
      { time: 'March 2, 2025 - 03:55 PM', status: 'In Transit', location: 'St. Johns, AZ', completed: true, coords: [34.5080, -109.3710] },
      { time: 'March 2, 2025 - 05:00 PM', status: 'Rest Stop', location: 'Near Zuni, NM', completed: true, coords: [35.0681, -108.8494] },
      { time: 'March 2, 2025 - 07:15 PM', status: 'In Transit', location: 'Gallup, NM', completed: true, coords: [35.5281, -108.7426] },
      { time: 'March 2, 2025 - 08:30 PM', status: 'In Transit', location: 'Grants, NM', completed: false, coords: [35.1480, -107.8514] },
      { time: 'March 3, 2025 - 10:00 AM', status: 'In Transit', location: 'Los Lunas, NM', completed: false, coords: [34.8066, -106.7336] },
      { time: 'March 3, 2025 - 11:30 AM', status: 'Estimated Delivery', location: 'Albuquerque, NM', completed: false, coords: [35.0844, -106.6504] }
    ],
    currentLocation: 'Grants, NM',
    currentCoords: [35.1480, -107.8514],
    fullDetails: {
      // Shipment Information
      shipmentId: 'SH-2023-9012',
      customerRefNumber: 'CRN-67890',
      bookingNumber: 'BK-112233',
      carrier: 'Southwest Trucking Co.',
      transportMode: 'LTL Trucking',
      serviceLevel: 'Standard',
      status: 'In Transit',
      priority: 'Medium',

      // Origin/Destination
      originLocation: 'Phoenix, AZ',
      originAddress: '2250 W Lower Buckeye Rd, Phoenix, AZ 85009',
      originContactName: 'David Martinez',
      originContactPhone: '+1 (602) 555-7788',
      destinationLocation: 'Albuquerque, NM',
      destinationAddress: '3400 Vassar Dr NE, Albuquerque, NM 87107',
      destinationContactName: 'Laura Thompson',
      destinationContactPhone: '+1 (505) 555-4321',

      // Dates
      bookingDate: 'March 1, 2025',
      pickupDate: 'March 2, 2025',
      estimatedDeliveryDate: 'March 3, 2025',
      actualDeliveryDate: 'Pending',

      // Cargo Details
      packageCount: '12 pallets',
      totalWeight: '4,750 lbs',
      totalVolume: '18 m³',
      dimensions: 'Standard pallets',
      cargoDescription: 'Electronic equipment',
      hazardousMaterials: 'No',
      temperatureControlled: 'No',
      specialHandling: 'Fragile',

      // Financial
      freightCost: '$1,850.00',
      additionalCharges: '$275.00',
      totalCost: '$2,125.00',
      currency: 'USD',
      paymentTerms: 'Net 15',

      // Documents
      commercialInvoice: 'CI-55432',
      billOfLading: 'BOL-789032',
      packingList: 'PL-55432',

      // Insurance
      insured: 'Yes',
      insuranceValue: '$65,000.00',
      insuranceProvider: 'Southwest Insurance Group',

      // Tracking
      lastScanLocation: 'Grants, NM - GPS Update',
      lastScanTime: 'March 2, 2025 - 08:30 PM',
      nextCheckpoint: 'Los Lunas, NM',
      estimatedArrival: 'March 3, 2025 - 10:00 AM',
      
      // Vehicle Information
      vehicleId: 'ST-3322',
      driverName: 'Michael Rodriguez',
      driverPhone: '+1 (480) 555-9900',
      averageSpeed: '62 mph',
      distanceTraveled: '325 miles',
      distanceRemaining: '152 miles',
      fuelEfficiency: '7.2 mpg',
      estimatedFuelUsage: '66 gallons'
    }
  }
];

export const pastShipments = [
  {
    id: 'SH-2023-3456',
    origin: 'Austin, TX',
    destination: 'Portland, OR',
    status: 'Delivered',
    deliveryDate: 'February 25, 2025',
    carrier: 'Southwest Express'
  },
  {
    id: 'SH-2023-7890',
    origin: 'Denver, CO',
    destination: 'Nashville, TN',
    status: 'Delivered',
    deliveryDate: 'February 20, 2025',
    carrier: 'Mountain Logistics'
  },
  {
    id: 'SH-2023-2345',
    origin: 'San Francisco, CA',
    destination: 'Philadelphia, PA',
    status: 'Delivered',
    deliveryDate: 'February 15, 2025',
    carrier: 'Pacific Freight'
  }
];
