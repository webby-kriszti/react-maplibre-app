import { MapChildRenderer } from './MapChildRenderer'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export class MarkerRenderer implements MapChildRenderer {
  private initialized: boolean = false
  private dirty: boolean = false
  private marker: maplibregl.Marker | null = null
  private coordinates: [number, number]
  constructor(coordinates: [number, number]) {
    this.coordinates = coordinates
  }
  init(map: maplibregl.Map): void {
    console.log('init')
    this.marker = new maplibregl.Marker().setLngLat(this.coordinates).addTo(map)
    this.initialized = true
  }
  update(map: maplibregl.Map): void {
    if (!map.loaded) return
    if (!this.initialized) {
      this.init(map)
    }
    if (!this.dirty) return
  }
  destroy(): void {
    this.marker?.remove()
    this.marker = null
  }
}
