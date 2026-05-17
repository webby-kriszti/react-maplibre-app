import { Station } from 'src/shared/types'
import { BaseDataSource } from '../BaseDataSource'
import { MapChildRenderer } from './MapChildRenderer'
import maplibregl from 'maplibre-gl'

export class CircleRenderer implements MapChildRenderer {
  private layerDirty: boolean = true
  private circleDirty: boolean = true
  private labelDirty: boolean = true
  private readonly CIRCLE_SOURCE = 'stations-circle'
  private readonly LABEL_SOURCE = 'stations-label'
  private readonly LINE_SOURCE = 'stations-line'
  private initialized: boolean = false
  private map: maplibregl.Map | null = null
  constructor(private readonly datasource: BaseDataSource<Station>) {
    datasource.subscribeToStations(() => {
      this.circleDirty = true
      this.labelDirty = true
    })
  }
  init(map: maplibregl.Map): void {
    this.map = map
    map.addSource(this.CIRCLE_SOURCE, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })
    map.addSource(this.LABEL_SOURCE, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })
    map.addSource(this.LINE_SOURCE, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })
    map.addLayer({
      id: 'circle-layer',
      type: 'circle',
      source: this.CIRCLE_SOURCE,
      paint: {
        'circle-radius': 20,
        'circle-color': '#ff0000'
      }
    })
    map.addLayer({
      id: 'line-layer',
      type: 'line',
      source: this.LINE_SOURCE,
      paint: {
        'line-color': '#000000',
        'line-width': 1
      }
    })
    map.addLayer({
      id: 'label-layer',
      type: 'symbol',
      source: this.LABEL_SOURCE,
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 12
      }
    })
  }
  update(map: maplibregl.Map): void {
    if (!map.loaded()) return
    if (!this.initialized) {
      this.init(map)
      this.initialized = true
    }
    if (this.circleDirty) {
      this.updateCircles(map)
      this.circleDirty = false
    }
    if (this.labelDirty) {
      this.updateLabels(map)
      this.labelDirty = false
    }
  }
  destroy(): void {
    // a) ha nincs map (init sose futott), nincs mit csinálni
    if (!this.map) return

    // b) layerek levétele (mindhárom, név szerint)
    this.map.removeLayer('circle-layer')
    this.map.removeLayer('line-layer')
    this.map.removeLayer('label-layer')

    // c) source-ok levétele (mindhárom, név szerint)
    this.map.removeSource(this.CIRCLE_SOURCE)
    this.map.removeSource(this.LINE_SOURCE)
    this.map.removeSource(this.LABEL_SOURCE)
  }
  private updateCircles(map: maplibregl.Map): void {
    // 1. lekérjük a stationokat
    const stations = this.datasource.items ?? []
    console.log(stations)

    // 2. minden stationból csinálunk egy GeoJSON feature-t
    const features = stations.map((station) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: station.coordinates
      },
      properties: {
        name: station.name
      }
    }))

    // 3. betöltjük a source-ba
    const source = map.getSource(this.CIRCLE_SOURCE) as maplibregl.GeoJSONSource
    source.setData({
      type: 'FeatureCollection',
      features: features
    })
  }
  private updateLabels(map: maplibregl.Map): void {
    const stations = this.datasource.items ?? []
    const features = stations.map((station) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: station.coordinates
      },
      properties: {
        name: station.name,
        temperature: station.measurements[station.measurements.length - 1]?.temperature
      }
    }))
    const source = map.getSource(this.LABEL_SOURCE) as maplibregl.GeoJSONSource
    source.setData({
      type: 'FeatureCollection',
      features: features
    })
  }
}
