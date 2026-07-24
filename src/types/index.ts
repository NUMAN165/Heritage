export type UserRole = 'user' | 'admin';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isEmailVerified: boolean;
  wishlist?: string[];
  createdAt: string;
  updatedAt: string;
}

export type HeritageCategory =
  | 'Fort'
  | 'Tomb'
  | 'Palace'
  | 'Cave'
  | 'Temple'
  | 'Ancient Monument'
  | 'Museum';

export interface TicketPricing {
  domesticPrice: number;
  foreignerPrice: number;
  saarcPrice: number;
  childPrice: number;
}

export interface OperatingHours {
  openTime: string;
  closeTime: string;
  closedDays: string[];
}

export interface HeritageSite {
  _id: string;
  name: string;
  slug: string;
  description: string;
  historicalContext?: string;
  location: {
    state: string;
    city: string;
    address: string;
    coordinates?: {
      type: 'Point';
      coordinates: [number, number];
    };
  };
  category: HeritageCategory;
  images: string[];
  ticketPricing: TicketPricing;
  operatingHours: OperatingHours;
  maxCapacityPerSlot: number;
  rules: string[];
  isFeatured: boolean;
  rating: {
    avgRating: number;
    numReviews: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Slot {
  _id: string;
  site: string;
  date: string;
  timeSlot: string;
  capacity: number;
  bookedCount: number;
  availableCount: number;
}

export type VisitorNationality = 'DOMESTIC' | 'FOREIGNER' | 'SAARC';

export interface VisitorInput {
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  nationality: VisitorNationality;
  idProofType: 'AADHAAR' | 'PASSPORT' | 'DRIVING_LICENSE' | 'VOTER_ID';
  idProofNumber: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'EXPIRED';

export interface BookingVisitor extends VisitorInput {
  ticketType: 'ADULT' | 'CHILD';
  price: number;
}

export interface Booking {
  _id: string;
  bookingReference: string;
  user: User | string;
  site: HeritageSite | string;
  slot: Slot | string;
  visitDate: string;
  timeSlot: string;
  visitors: BookingVisitor[];
  totalAmount: number;
  status: BookingStatus;
  qrCodeUrl?: string;
  ticketPdfUrl?: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
