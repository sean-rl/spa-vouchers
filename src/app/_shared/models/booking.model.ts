export interface VenueBooking {
  id: string;
  venueId: any;
  venueName: string;
  venueAddr: string;
  venuePck: string;
  packageId: any;
  name: string;
  phone: string;
  email: string;
  date: Date;
  bookingValue: number;
  voucher: string;
  voucherValue: number;
  request: string;
  balanceValue: number;
  valid: boolean;
  validation: string[];
  submitted: Date;
  updated: Date;
  created: Date;
}
