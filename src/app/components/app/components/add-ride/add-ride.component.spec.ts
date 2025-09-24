import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRideComponent } from './add-ride.component';
import { RideService } from '../../../../services/app/services/ride.service';

describe('AddRideComponent', () => {
  let component: AddRideComponent;
  let fixture: ComponentFixture<AddRideComponent>;
  let rideServiceSpy: jasmine.SpyObj<RideService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('RideService', ['getAll', 'addRide']);

    await TestBed.configureTestingModule({
      declarations: [AddRideComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: RideService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRideComponent);
    component = fixture.componentInstance;
    rideServiceSpy = TestBed.inject(RideService) as jasmine.SpyObj<RideService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when required fields are empty', () => {
    component.form.patchValue({
      ownerEmployeeId: '',
      vehicleNo: '',
      time: '',
      pickupPoint: '',
      destination: ''
    });
    expect(component.form.invalid).toBeTrue();
  });

  it('should call addRide when form is valid', () => {
    spyOn(window, 'alert');
    rideServiceSpy.getAll.and.returnValue([]); // no duplicates

    component.form.patchValue({
      ownerEmployeeId: 'EMP001',
      vehicleType: 'Car',
      vehicleNo: 'MH12XY1234',
      vacantSeats: 2,
      time: '10:00',
      pickupPoint: 'Gate',
      destination: 'Station'
    });

    component.onSubmit();

    expect(rideServiceSpy.addRide).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Ride added successfully');
  });
});
