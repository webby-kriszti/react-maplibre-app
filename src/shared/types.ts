export interface Measurement {
  id: number
  temperature: number
  humidity: number
  timeStamp: Date
}
export type Coordinates = [number, number]

export interface Mappable {
  id: string
  coordinates: Coordinates
}

export interface Device extends Mappable{
  name: string
  isActive: boolean
}
export interface Station extends Mappable {
  name: string
}
