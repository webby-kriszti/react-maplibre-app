import { Module } from '@nestjs/common'
import { WeatherModule } from './weather/weather.module'
import { ZmqModule } from './zmq/zmq.module'
import { ElectronGatewayModule } from './electron-gateway/electron-gateway.module'

@Module({
  imports: [WeatherModule, ZmqModule, ElectronGatewayModule]
})
export class AppModule {}
