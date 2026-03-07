import { MapChildRenderer } from './MapChildRenderer'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { BaseDataSource } from '../BaseDataSource'
import { Device } from 'src/shared/types'

export class MarkerRenderer implements MapChildRenderer {
  private initialized: boolean = false
  private dirty: boolean = false
  private markers: Map<string, maplibregl.Marker> | null = null
  constructor(private readonly dataSource: BaseDataSource<Device>) {
    dataSource.subscribeToDevices(() => {
      this.dirty = true
    })
  }
  init(): void {
    console.log('init')
    this.markers = new Map()
    this.initialized = true
    this.dirty = true
  }
  update(map: maplibregl.Map): void {
    if (!map.loaded) return
    if (!this.initialized) {
      this.init()
    }
    if (!this.dirty) return
    const devices = this.dataSource.items ?? []

    devices.forEach((device) => {
      if (!this.markers!.has(device.id)) {
        // Új marker létrehozása
        const marker = new maplibregl.Marker().setLngLat(device.coordinates).addTo(map)
        this.markers!.set(device.id, marker)
      }
    })
    this.dirty = false
  }
  destroy(): void {
    this.markers?.forEach((marker) => marker.remove())
    this.markers = null
  }
}
