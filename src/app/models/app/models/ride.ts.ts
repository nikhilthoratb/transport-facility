export interface Ride {
  id: string;             // unique ride id (uuid or timestamp)
  ownerEmployeeId: string; // who posted the ride
  vehicleType: 'Bike' | 'Car';
  vehicleNo: string;
  vacantSeats: number;
  timeISO: string;        // ISO timestamp string for ride time (date+time)
  pickupPoint: string;
  destination: string;
  bookedBy?: string[];    // list of employee IDs who booked
}
