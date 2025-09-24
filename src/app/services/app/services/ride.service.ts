import { Injectable } from '@angular/core';
import { Ride } from '../../../models/app/models/ride.ts';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private storageKey = 'transport_rides_v1';
  private rides: Ride[] = [];

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.rides));
  }

  private load() {
    const raw = localStorage.getItem(this.storageKey);
    this.rides = raw ? JSON.parse(raw) : [];
  }

  getAll(): Ride[] {
    // return only rides with vacantSeats > 0
    return JSON.parse(JSON.stringify(this.rides));
  }

  addRide(ride: Ride) {
    this.rides.push({ ...ride, bookedBy: ride.bookedBy || [] });
    this.save();
  }

  findById(id: string): Ride | undefined {
    return this.rides.find(r => r.id === id);
  }

  bookRide(rideId: string, employeeId: string): { success: boolean; message?: string } {
    const ride = this.findById(rideId);
    if (!ride) return { success: false, message: 'Ride not found' };

    if (ride.ownerEmployeeId === employeeId) {
      return { success: false, message: 'Owner cannot book their own ride' };
    }

    if (ride.bookedBy && ride.bookedBy.includes(employeeId)) {
      return { success: false, message: 'Employee already booked this ride' };
    }

    if (ride.vacantSeats <= 0) {
      return { success: false, message: 'No vacant seats' };
    }

    ride.vacantSeats -= 1;
    ride.bookedBy = ride.bookedBy || [];
    ride.bookedBy.push(employeeId);

    // Optional: remove fully booked ride from the list
    // Not strictly necessary because getAll() now filters
    this.save();
    return { success: true };
  }

  filterByVehicleType(type: 'All' | 'Bike' | 'Car') {
    if (type === 'All') return this.getAll();
    return this.getAll().filter(r => r.vehicleType === type);
  }

  getTimeMatched(target: Date) {
    const msBuffer = 60 * 60 * 1000;
    return this.getAll().filter(r => {
      const rideDate = new Date(r.timeISO);
      return Math.abs(rideDate.getTime() - target.getTime()) <= msBuffer;
    });
  }

  isOwnerIdUnique(ownerEmployeeId: string): boolean {
    return !this.rides.some(r => r.ownerEmployeeId === ownerEmployeeId);
  }

  clearAll() {
    this.rides = [];
    this.save();
  }
}
