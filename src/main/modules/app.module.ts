import { Module } from '@nestjs/common'
import { WeatherModule } from './weather/weather.module'

@Module({
  imports: [WeatherModule]  // te töltöd ki
})
export class AppModule {}