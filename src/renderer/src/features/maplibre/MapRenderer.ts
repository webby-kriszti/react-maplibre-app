import { MapChildRenderer } from './MapChildRenderer'
import maplibregl from 'maplibre-gl'
import { LiveStationDataSource } from '../LiveStationDataSource'
import { StationMarkerRenderer } from './StationMarkerRenderer'
import { StaticStationDataSource } from '../StaticStationDataSource'
import { MapType } from '@renderer/types'
import { BaseDataSource } from '../BaseDataSource'
import { Station } from 'src/shared/types'
import { OmDataSource } from '../OmDataSource'

interface Config {
  container: HTMLDivElement
  center: [lng: number, lat: number]
  zoom: number
  mode: MapType
}

export class MapRenderer {
  private map: maplibregl.Map
  private rafId: number | null = null
  private children: MapChildRenderer[] = []
  private tick: () => void
  private stationMarkerRenderer: StationMarkerRenderer
  private omStationRenderer: StationMarkerRenderer | null = null
  private datasource: BaseDataSource<Station>
  private omDataSource: BaseDataSource<Station> | null = null
  constructor(config: Config) {
    console.log(config.mode)
    this.map = new maplibregl.Map({
      container: config.container,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: config.center,
      zoom: config.zoom
    })
    this.datasource =
      config.mode === MapType.MAP_LIVE ? new LiveStationDataSource() : new StaticStationDataSource()
    this.tick = () => {
      if (this.map.loaded()) {
        for (const child of this.children) {
          child.update(this.map)
        }
      }
      this.rafId = requestAnimationFrame(this.tick)
    }
    this.omDataSource = config.mode === MapType.MAP_LIVE ? new OmDataSource() : null
    this.rafId = requestAnimationFrame(this.tick)
    this.stationMarkerRenderer = new StationMarkerRenderer(this.datasource)
    this.add(this.stationMarkerRenderer)

    if (config.mode === MapType.MAP_LIVE && this.omDataSource) {
      this.omStationRenderer = new StationMarkerRenderer(this.omDataSource, 'yellow')
      this.add(this.omStationRenderer)
      this.omDataSource.subscribeToSelected((station) => {
        if (station) {
          this.map.flyTo({ center: station.coordinates, zoom: 10 })
        }
      })
    }

    this.datasource.subscribeToSelected((station) => {
      if (station) {
        this.map.flyTo({ center: station.coordinates, zoom: 10 })
      }
    })
  }
  add(child: MapChildRenderer): void {
    this.children.push(child)
  }
  destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
    }
    for (const child of this.children) {
      child.destroy()
    }
    this.map.remove()
  }
}
