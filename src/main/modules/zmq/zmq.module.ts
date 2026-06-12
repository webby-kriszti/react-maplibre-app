import { Module } from '@nestjs/common'
import { ZmqService } from './zmq.service'
import { ElectronGatewayModule } from '../electron-gateway/electron-gateway.module'

@Module({
  imports: [ElectronGatewayModule],
  providers: [ZmqService],
  exports: [ZmqService]
})
export class ZmqModule {}
