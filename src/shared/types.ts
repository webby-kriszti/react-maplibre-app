export interface Measurement {
  id: number
  temperature: number
  humidity: number
  timeStamp: Date
}
export interface StationMeasurement {
  temperature: number
  timestamp: Date
}

export interface Station extends Mappable {
  name: string
  measurements: StationMeasurement[]
  source: StationSource
}
export type Coordinates = [number, number]

export interface Mappable {
  id: string
  coordinates: Coordinates
}

export interface Device extends Mappable {
  name: string
  isActive: boolean
}
export enum StationSource {
  METEO = 'meteo',
  OM = 'om'
}
