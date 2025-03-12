// shipmentData.js
// This file contains all the shipment data for the tracking application

export const activeShipments = [
  {
    id: 'SH-2023-9012',
    origin: 'Phoenix, AZ',
    destination: 'Albuquerque, NM',
    status: 'In Transit',
    estimatedDelivery: 'March 3, 2025',
    progress: 97,
    carrier: 'Southwest Trucking Co.',
    mode: 'Land',
    transportType: 'truck',
    lastUpdate: '10 minutes ago',
    checkpoints: [
      {
        time: 'March 2, 2025 - 08:15 AM',
        status: 'Picked Up',
        location: 'Phoenix, AZ',
        completed: true,
        coords: [33.4484, -112.0740],
        envData: {
          temperature: 24.2,
          humidity: 35,
          lux: 1120,
          batteryLife: 100
        }
      },
      {
        time: 'March 2, 2025 - 09:40 AM',
        status: 'In Transit',
        location: 'Apache Junction, AZ',
        completed: true,
        coords: [33.4150, -111.5450],
        envData: {
          temperature: 26.7,
          humidity: 32,
          lux: 1340,
          batteryLife: 97
        }
      },
      {
        time: 'March 2, 2025 - 10:55 AM',
        status: 'In Transit',
        location: 'Globe, AZ',
        completed: true,
        coords: [33.3942, -110.7865],
        envData: {
          temperature: 28.3,
          humidity: 29,
          lux: 1460,
          batteryLife: 95
        }
      },
      {
        time: 'March 2, 2025 - 01:25 PM',
        status: 'In Transit',
        location: 'Show Low, AZ',
        completed: true,
        coords: [34.2542, -110.0298],
        envData: {
          temperature: 26.1,
          humidity: 31,
          lux: 1490,
          batteryLife: 88
        }
      },
      {
        time: 'March 2, 2025 - 02:40 PM',
        status: 'In Transit',
        location: 'Concho, AZ',
        completed: true,
        coords: [34.4784, -109.6209],
        envData: {
          temperature: 24.3,
          humidity: 33,
          lux: 1320,
          batteryLife: 85
        }
      },
      {
        time: 'March 2, 2025 - 03:55 PM',
        status: 'In Transit',
        location: 'St. Johns, AZ',
        completed: true,
        coords: [34.5080, -109.3710],
        envData: {
          temperature: 23.2,
          humidity: 35,
          lux: 1150,
          batteryLife: 81
        }
      },
      {
        time: 'March 2, 2025 - 05:00 PM',
        status: 'Rest Stop',
        location: 'Near Zuni, NM',
        completed: true,
        coords: [35.0681, -108.8494],
        envData: {
          temperature: 21.5,
          humidity: 38,
          lux: 850,
          batteryLife: 78
        }
      },
      {
        time: 'March 2, 2025 - 07:15 PM',
        status: 'In Transit',
        location: 'Gallup, NM',
        completed: true,
        coords: [35.5281, -108.7426],
        envData: {
          temperature: 18.3,
          humidity: 42,
          lux: 320,
          batteryLife: 74
        }
      },
      {
        time: 'March 2, 2025 - 08:30 PM',
        status: 'In Transit',
        location: 'Grants, NM',
        completed: true,
        coords: [35.1480, -107.8514],
        envData: {
          temperature: 16.5,
          humidity: 46,
          lux: 15,
          batteryLife: 70
        }
      },
      {
        time: 'March 3, 2025 - 10:00 AM',
        status: 'In Transit',
        location: 'Los Lunas, NM',
        completed: true,
        coords: [34.8066, -106.7336],
        envData: {
          temperature: 19.2,
          humidity: 40,
          lux: 1100,
          batteryLife: null
        }
      },
      {
        time: 'March 3, 2025 - 11:30 AM',
        status: 'Estimated Delivery',
        location: 'Albuquerque, NM',
        completed: false,
        coords: [35.0844, -106.6504],
        envData: {
          temperature: null,
          humidity: null,
          lux: null,
          batteryLife: null
        }
      }
    ],
    currentLocation: 'Los Lunas, NM',
    currentCoords: [34.8066, -106.7336],
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
      lastScanLocation: 'Los Lunas, NM - GPS Update',
      lastScanTime: 'March 3, 2025 - 10:15 AM',
      nextCheckpoint: 'Albuquerque, NM',
      estimatedArrival: 'March 3, 2025 - 11:30 AM',

      // Vehicle Information
      vehicleId: 'ST-3322',
      driverName: 'Michael Rodriguez',
      driverPhone: '+1 (480) 555-9900',
      averageSpeed: '62 mph',
      distanceTraveled: '458 miles',
      distanceRemaining: '19 miles',
      fuelEfficiency: '7.2 mpg',
      estimatedFuelUsage: '66 gallons'
    }
  },
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
      {
        time: 'Feb 28, 2025 - 08:30 AM',
        status: 'Picked Up',
        location: 'Los Angeles, CA',
        completed: true,
        coords: [34.0522, -118.2437],
        envData: {
          temperature: 22.4, // in Celsius
          humidity: 58, // percentage
          lux: 1240, // light level
          batteryLife: 98 // percentage
        }
      },
      {
        time: 'Feb 28, 2025 - 05:45 PM',
        status: 'In Transit',
        location: 'Phoenix, AZ',
        completed: true,
        coords: [33.4484, -112.0740],
        envData: {
          temperature: 31.2,
          humidity: 30,
          lux: 980,
          batteryLife: 87
        }
      },
      {
        time: 'March 5, 2025 - 02:00 PM',
        status: 'Estimated Delivery',
        location: 'New York, NY',
        completed: false,
        coords: [40.7128, -74.0060],
        envData: {
          temperature: 12.8,
          humidity: 65,
          lux: 950,
          batteryLife: null // Not yet recorded
        }
      }
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
