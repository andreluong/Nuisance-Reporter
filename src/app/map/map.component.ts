import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Location } from '../../shared/interfaces/location';
import { ReportListService } from '../report-list.service';
import { LocationCounter } from '../../shared/interfaces/location-counter';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: L.Map
  locations: Location[]

  constructor(private reportListService: ReportListService) {
    this.locations = []
  }

  ngOnInit(): void {
    this.reload()
  }

  reload() {
    this.locations = []
    this.reportListService
      .getReports()
      .subscribe(result => {
        result.forEach((pair: any) => {
          this.locations.push(pair.data.location as Location)
        })
        console.log(this.locations)
        this.initializeMap()
        this.addMarkers()
      })
  }

  initializeMap() {
    const baseMapUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    const openStreetMapLink = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

    this.map = L.map('mapId').setView([49.27, -123], 11)

    const layer = L.tileLayer(baseMapUrl, {
      noWrap: true,
      maxZoom: 19,
      attribution: openStreetMapLink
    }).addTo(this.map)

    this.map.addLayer(layer)
  }

  // Get all unique locations and the counter of repetitions
  getLocationCounterArray(): LocationCounter[] {
    let lc: LocationCounter[] = []

    for (let i = 0; i < this.locations.length; i++) {
      let loc = this.locations[i]
      let isInLocCounter = {bool: false, idx: 0}

      // Check if loc is in lc
      for (let j = 0; j < lc.length; j++) {
        let locCounter = lc[j]
        // Checks only latitude and longitude
        if (loc.latitude == locCounter.location.latitude &&
            loc.longitude == locCounter.location.longitude) {
              isInLocCounter = {bool: true, idx: j}
        }
      }

      if (isInLocCounter.bool) {
        // Increment existing counter
        // Will update the previous locations and discard the later ones if they are equal
        lc[isInLocCounter.idx].counter += 1
        isInLocCounter.bool = false
      } else {
        // Push new location
        lc.push({location: loc, counter: 1})
      }
    }
    return lc
  }

  addMarkers() {
    this.getLocationCounterArray().forEach(loc => {
      let marker = L
        .marker([loc.location.latitude, loc.location.longitude], {title: loc.location.name})
        .bindPopup(`<b>${loc.location.name}</b><br/>${loc.counter} report(s)`)
      marker.addTo(this.map)
    })
  }
}
