import maplibregl from 'maplibre-gl'

export interface MapChildRenderer {
  init(map: maplibregl.Map): void
  update(map: maplibregl.Map): void
  destroy(): void
}
