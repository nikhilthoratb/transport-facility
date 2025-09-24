import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RideService } from '../../../services/app/services/ride.service';

// Mock RideService
class MockRideService {
  rides = [
    { vacantSeats: 2, bookedBy: ['u1'] },
    { vacantSeats: 3, bookedBy: ['u2', 'u3'] },
    { vacantSeats: 1, bookedBy: [] }
  ];

  getAll() {
    return this.rides;
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: RideService, useClass: MockRideService }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totals correctly', () => {
    expect(component.totalRides).toBe(3);
    expect(component.availableSeats).toBe(6);
    expect(component.activeBookings).toBe(3);
  });

  it('should switch active tab correctly', () => {
    component.setTab('add');
    expect(component.activeTab).toBe('add');
  });
});
