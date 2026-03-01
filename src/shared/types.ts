export interface Measurement {
  id: number
  temperature: number
  humidity: number
  timeStamp: Date
  // te töltöd ki
}
export type Coordinates = [number, number]

export interface Device {
  id: string
  name: string
  coordinates: Coordinates
  isActive: boolean
}
