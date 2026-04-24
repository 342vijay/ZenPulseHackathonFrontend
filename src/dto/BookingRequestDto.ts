export interface BookingRequestDto {
  roomId: number;
  fromDate: string;   // DateOnly → string (ISO format: yyyy-MM-dd)
  toDate: string;
  customerName: string;
}