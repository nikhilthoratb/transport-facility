import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

@Component({ selector: 'app-home', template: '' })
class HomeStubComponent {}

@Component({ selector: 'app-ride-list', template: '' })
class RideListStubComponent {}

@Component({ selector: 'app-add-ride', template: '' })
class AddRideStubComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeStubComponent,
        RideListStubComponent,
        AddRideStubComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // ...other tests
});
