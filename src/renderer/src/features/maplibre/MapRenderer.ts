import { MapChildRenderer } from './MapChildRenderer'
import maplibregl from 'maplibre-gl'
import { LiveStationDataSource } from '../LiveStationDataSource'
import { StationMarkerRenderer } from './StationMarkerRenderer'
import { StaticStationDataSource } from '../StaticStationDataSource'

interface Config {
  container: HTMLDivElement
  center: [lng: number, lat: number]
  zoom: number
}

export class MapRenderer {
  private map: maplibregl.Map
  private rafId: number | null = null
  private children: MapChildRenderer[] = []
  private tick: () => void
  private stationMarkerRenderer: StationMarkerRenderer
  private recordedMarkerRenderer: StationMarkerRenderer
  constructor(config: Config) {
    this.map = new maplibregl.Map({
      container: config.container,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: config.center,
      zoom: config.zoom
    })
    this.tick = () => {
      if (this.map.loaded()) {
        for (const child of this.children) {
          child.update(this.map)
        }
      }
      this.rafId = requestAnimationFrame(this.tick)
    }
    this.rafId = requestAnimationFrame(this.tick)
    this.stationMarkerRenderer = new StationMarkerRenderer(new LiveStationDataSource())
    this.recordedMarkerRenderer = new StationMarkerRenderer(
      new StaticStationDataSource(),
      '#ff0000'
    )
    this.add(this.stationMarkerRenderer)
    this.add(this.recordedMarkerRenderer)
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
