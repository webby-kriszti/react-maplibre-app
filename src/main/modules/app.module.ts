import { Module } from '@nestjs/common'
import { WeatherModule } from './weather/weather.module'
import { ZmqModule } from './zmq/zmq.module'
import { ElectronGatewayModule } from './electron-gateway/electron-gateway.module'
import { SimulationModule } from './simulation/simulation.module'

@Module({
  imports: [WeatherModule, ZmqModule, ElectronGatewayModule, SimulationModule]
})
export class AppModule {}
