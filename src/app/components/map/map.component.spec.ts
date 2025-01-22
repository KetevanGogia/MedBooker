import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
const markerPositions = [
  { lat: 41.7167, lng: 44.7833 },
  { lat: 42.2636, lng: 42.6947 },
  { lat: 41.635, lng: 42.9654 },
  { lat: 41.8236, lng: 44.7181 },
];
describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
