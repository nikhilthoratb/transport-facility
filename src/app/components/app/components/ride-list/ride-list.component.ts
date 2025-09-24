import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Ride } from '../../../../models/app/models/ride.ts';
import { RideService } from '../../../../services/app/services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.scss']
})
export class RideListComponent implements OnInit {
  rides: Ride[] = [];
  vehicleFilter = new FormControl('All');
  timeMatchControl = new FormControl(''); // HH:MM or empty
  bookEmployeeId = new FormControl('');

  constructor(private rideService: RideService) {}

  ngOnInit(): void {
    this.load();
    this.vehicleFilter.valueChanges.subscribe(() => this.load());
    this.timeMatchControl.valueChanges.subscribe(() => this.load());
  }

  load() {
    let data = this.rideService.getAll();

    // filter vehicle type
    const vt = this.vehicleFilter.value;
    if (vt && vt !== 'All') {
      data = data.filter(d => d.vehicleType === vt);
    }

    // time matching if provided
    const t = this.timeMatchControl.value;
    if (t) {
      const [hh, mm] = t.split(':').map((s: string) => parseInt(s, 10));
      const target = new Date();
      target.setHours(hh, mm, 0, 0);
      const msBuffer = 60 * 60 * 1000;
      data = data.filter(r => Math.abs(new Date(r.timeISO).getTime() - target.getTime()) <= msBuffer);
    }

    // only today's rides
    const todayDateStr = new Date().toDateString();
    data = data.filter(r => new Date(r.timeISO).toDateString() === todayDateStr);

    // sort by time
    data.sort((a, b) => new Date(a.timeISO).getTime() - new Date(b.timeISO).getTime());

    this.rides = data;
  }

 onBook(rideId: string) {
  const employeeId = this.bookEmployeeId.value?.trim();
  if (!employeeId) { alert('Enter your Employee ID to book'); return; }

  const res = this.rideService.bookRide(rideId, employeeId);
  if (!res.success) {
    alert(res.message);
    return;
  }

  alert('Booked successfully');
  this.load(); // reloads only rides with vacantSeats > 0
  this.bookEmployeeId.patchValue('',{emitEvent:false,onlySelf:true})
}

}
