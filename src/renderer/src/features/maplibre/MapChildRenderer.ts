import maplibregl from 'maplibre-gl'

export interface MapChildRenderer {
  init(): void
  update(map: maplibregl.Map): void
  destroy(): void
}
