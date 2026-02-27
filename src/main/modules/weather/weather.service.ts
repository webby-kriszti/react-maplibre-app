import { Injectable } from '@nestjs/common'
import { Measurement } from '../../../shared/types'

@Injectable()
export class WeatherService {
  private measurements: Measurement[] = []
  private nextId = 1

  getMeasurements(): Measurement[] {
    return this.measurements
  }

  addMeasurement(temperature: number, humidity: number): void {
    console.log('added')
    const timeStamp = new Date()
    const measurement = {
      id: this.nextId++,
      temperature: temperature,
      humidity: humidity,
      timeStamp: timeStamp
    }
    this.measurements.push(measurement)
  }
}
