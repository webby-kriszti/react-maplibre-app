import { Station } from 'src/shared/types'
import { BaseDataSource } from '../BaseDataSource'
import { MapChildRenderer } from './MapChildRenderer'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'

export class StationMarkerRenderer implements MapChildRenderer {
  private initialized: boolean = false
  private dirty: boolean = false
  private markers: Map<string, maplibregl.Marker> | null = null

  constructor(
    private readonly dataSource: BaseDataSource<Station>,
    private readonly color: string = 'blue'
  ) {
    dataSource.subscribeToStations(() => {
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
    if (!map.loaded()) return
    if (!this.initialized) {
      this.init()
    }
    if (!this.dirty) return
    console.log('dirty true, rajzolunk')
    const stations = this.dataSource.items ?? []
    console.log('stations:', stations)
    stations.forEach((station) => {
      console.log('marker van már?', this.markers!.has(station.id))
      if (!this.markers!.has(station.id)) {
        const marker = new maplibregl.Marker({ color: this.color })
          .setLngLat(station.coordinates)
          .addTo(map)
        console.log('marker létrehozva', marker)
        this.markers!.set(station.id, marker)
      }
    })
    this.dirty = false
  }
  destroy(): void {
    this.dataSource.destroy()
    this.markers?.forEach((marker) => marker.remove())
    this.markers = null
  }
}
