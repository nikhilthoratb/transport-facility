import { Component } from '@angular/core';
import { RideService } from '../../../services/app/services/ride.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  activeTab: 'find' | 'add' = 'find';

  constructor(private rideService: RideService) {}

  get totalRides() {
    return this.rideService.getAll().length;
  }

  get availableSeats() {
    return this.rideService.getAll().reduce((sum: any, r: { vacantSeats: any; }) => sum + r.vacantSeats, 0);
  }

  get activeBookings() {
    return this.rideService.getAll().reduce((sum: any, r: any) => sum + (r.bookedBy?.length || 0), 0);
  }

  setTab(tab: 'find' | 'add') {
    this.activeTab = tab;
  }
}
