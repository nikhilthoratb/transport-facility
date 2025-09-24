import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RideService } from '../../../../services/app/services/ride.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit {
  form: FormGroup;
  todayDateStr: string; // YYYY-MM-DD for input min

  constructor(private fb: FormBuilder, protected rideService: RideService) {
    this.form = this.fb.group({
      ownerEmployeeId: ['', [Validators.required]],
      vehicleType: ['Bike', Validators.required],
      vehicleNo: ['', Validators.required],
      vacantSeats: [1, [Validators.required, Validators.min(1)]],
      time: ['', Validators.required],
      pickupPoint: ['', Validators.required],
      destination: ['', Validators.required]
    });
    const today = new Date();
    this.todayDateStr = today.toISOString().slice(0, 10);
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.invalid) return;

    const ownerId = this.form.value.ownerEmployeeId.trim();
    const existingRides = this.rideService.getAll(); // assume this returns an array of rides

    // Check if ownerEmployeeId already exists
    if (existingRides.some(r => r.ownerEmployeeId === ownerId)) {
      alert('Please enter a unique Employee ID. This ID already has a ride.');
      return;
    }

    // Prepare ride object
    const date = new Date();
    const [hh, mm] = this.form.value.time.split(':').map((s: string) => parseInt(s, 10));
    date.setHours(hh, mm, 0, 0);

    const ride = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, // ride ID can still be generated
      ownerEmployeeId: ownerId,
      vehicleType: this.form.value.vehicleType,
      vehicleNo: this.form.value.vehicleNo.trim(),
      vacantSeats: Number(this.form.value.vacantSeats),
      timeISO: date.toISOString(),
      pickupPoint: this.form.value.pickupPoint.trim(),
      destination: this.form.value.destination.trim(),
      bookedBy: []
    };

    this.rideService.addRide(ride);
    this.form.reset({ vehicleType: 'Bike', vacantSeats: 1 });
    alert('Ride added successfully');
  }
}
