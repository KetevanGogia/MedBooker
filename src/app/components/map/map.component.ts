import { Component, OnInit } from '@angular/core';
import { map } from '@firebase/util';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { Position } from 'src/app/models/booking.model';
import { DoctorsService } from 'src/app/services/doctors.service';
const markerPositions = [
  { lat: 41.7167, lng: 44.7833 },
  { lat: 42.2636, lng: 42.6947 },
  { lat: 41.635, lng: 42.9654 },
  { lat: 41.8236, lng: 44.7181 },
];
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public _map: google.maps.Map | undefined;
  markers: google.maps.Marker[] | undefined;
  ngOnInit() {
    this.loadMap();
  }
  loadMap() {
    const loader = new Loader({
      apiKey: environment.MAP_API,
    });
    loader.load().then(() => {
      this._map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat: 42.3154, lng: 43.3569 },
          zoom: 7,
          mapTypeId: 'hybrid',
          heading: 90,
          tilt: 45,
        }
      );
      Object.values(markerPositions).forEach((position) => {
        new google.maps.Marker({
          position: position,
          map: this._map,
        });
      });
    });
  }
}
