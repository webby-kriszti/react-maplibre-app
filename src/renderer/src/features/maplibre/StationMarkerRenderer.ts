import { Station } from 'src/shared/types'
import { BaseDataSource } from '../BaseDataSource'
import { MapChildRenderer } from './MapChildRenderer'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import { getTemperatureColor } from '@renderer/utils/colorHelper'

export class StationMarkerRenderer implements MapChildRenderer {
  private initialized: boolean = false
  private dirty: boolean = false
  private markers: Map<string, maplibregl.Marker> | null = null

  constructor(
    private readonly dataSource: BaseDataSource<Station>,
    private readonly color: string = 'purple'
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
    this.markers!.forEach((marker) => marker.remove())
    this.markers!.clear()
    const stations = this.dataSource.items ?? []
    console.log('stations:', stations)
    stations.forEach((station) => {
      const measurementsLength = station.measurements.length
      const color =
        measurementsLength > 0
          ? getTemperatureColor(station.measurements[measurementsLength - 1]?.temperature)
          : this.color
      const marker = new maplibregl.Marker({ color: color })
        .setLngLat(station.coordinates)
        .addTo(map)
      marker.getElement().addEventListener('click', () => {
        this.dataSource.selectStation(station)
      })
      this.markers!.set(station.id, marker)
    })
    this.dirty = false
  }
  destroy(): void {
    this.dataSource.destroy()
    this.markers?.forEach((marker) => marker.remove())
    this.markers = null
  }
}
