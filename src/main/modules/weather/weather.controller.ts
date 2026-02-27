import { Controller, Inject } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { IpcHandle } from '@doubleshot/nest-electron'
import { Payload } from '@nestjs/microservices'
import { Measurement } from '../../../shared/types'

@Controller()
export class WeatherController {
  constructor(@Inject(WeatherService) private readonly weatherService: WeatherService) {}
  @IpcHandle('weather:get-measurements')
  getMeasurements(): Measurement[] {
    return this.weatherService.getMeasurements()
  }
  @IpcHandle('weather:add-measurement')
  addMeasurement(@Payload() [temperature, humidity]): void {
    this.weatherService.addMeasurement(temperature, humidity)
  }
}
