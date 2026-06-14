export interface Measurement {
  id: number
  temperature: number
  humidity: number
  timeStamp: Date
}
export type ExtendedMeasurement = Measurement & {
  pressure: number
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
export type WeatherDevice = {
  deviceId: string
  name: string
  position: Coordinates
}
export type MeasurementData = {
  device_id: string
  name: string
  lat: number
  lng: number
  timestamp: number
  temperature: number
  humidity: number
  pressure: number
  status: number
}
