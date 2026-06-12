import { Module } from '@nestjs/common'
import { ElectronGatewayService } from './electron-gateway.service'

@Module({
  providers: [ElectronGatewayService],
  exports: [ElectronGatewayService]
})
export class ElectronGatewayModule {}