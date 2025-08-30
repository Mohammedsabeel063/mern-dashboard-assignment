export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: 'admin' | 'operator' | 'viewer';
    createdAt: string;
    lastLogin: string;
  }
  
  export interface Tractor {
    id: string;
    model: string;
    batteryLevel: number;
    location: {
      lat: number;
      lng: number;
      address: string;
    };
    status: 'active' | 'idle' | 'maintenance' | 'charging';
    efficiency: number;
    totalDistance: number;
    operatingHours: number;
    lastMaintenance: string;
    operator: string;
  }
  
  export interface AnalyticsData {
    period: string;
    energyConsumption: number;
    distanceCovered: number;
    efficiency: number;
    carbonSaved: number;
    revenue: number;
  }
  
  export interface Notification {
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
  }