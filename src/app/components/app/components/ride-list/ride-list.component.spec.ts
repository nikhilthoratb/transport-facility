import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RideListComponent } from './ride-list.component';
import { RideService } from '../../../../services/app/services/ride.service';
import { of } from 'rxjs';

// Mock RideService
class MockRideService {
  rides:any = [
    { id: 'r1', vehicleType: 'Car', vehicleNo: 'MH12AB1234', timeISO: new Date().toISOString(), vacantSeats: 2, pickupPoint: 'Gate', destination: 'Station', ownerEmployeeId: 'EMP1', bookedBy: [] }
  ];

  getAll() {
    return this.rides;
  }

  bookRide(id: string, employeeId: string) {
    const ride = this.rides.find((r :any)=> r.id === id);
    if (!employeeId) return { success: false, message: 'No Employee ID' };
    if (ride && ride.vacantSeats > 0) {
      ride.bookedBy.push(employeeId);
      ride.vacantSeats -= 1;
      return { success: true };
    }
    return { success: false, message: 'Fully booked' };
  }
}

describe('RideListComponent', () => {
  let component: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;
  let rideService: MockRideService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RideListComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: RideService, useClass: MockRideService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RideListComponent);
    component = fixture.componentInstance;
    rideService = TestBed.inject(RideService) as unknown as MockRideService;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should book a ride successfully when valid Employee ID is provided', () => {
    spyOn(window, 'alert');
    component.bookEmployeeId.setValue('EMP2');

    component.onBook('r1');

    expect(rideService.rides[0].bookedBy).toContain('EMP2');
    expect(rideService.rides[0].vacantSeats).toBe(1);
    expect(window.alert).toHaveBeenCalledWith('Booked successfully');
  });
});
