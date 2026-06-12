import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common'
import { Subscriber } from 'zeromq'
import { ElectronGatewayService } from '../electron-gateway/electron-gateway.service'

// Config — itt válthatsz Prod és Dev között
const zmqConfig = {
  //backendHost: '192.168.0.201', // Prod
  backendHost: '192.168.0.200', // Dev (uncomment-eld ha a Prod nem fut)
  pubPort: 5555
}

@Injectable()
export class ZmqService implements OnModuleInit, OnModuleDestroy {
  private socket: Subscriber | null = null
  constructor(
    @Inject(ElectronGatewayService) private readonly electronGateway: ElectronGatewayService
  ) {}

  async onModuleInit(): Promise<void> {
    // 1. Socket létrehozása
    this.socket = new Subscriber()
    // 2. Csatlakozás
    this.socket.connect(`tcp://${zmqConfig.backendHost}:${zmqConfig.pubPort}`)
    // 3. Feliratkozás
    this.socket.subscribe('sensor-data')
    // 4. Loop indítása
    ;(async () => {
      for await (const [topic, message] of this.socket!) {
        console.log('catcat', topic.toString(), message.toString())
        try {
          const topicStr = topic.toString()
          const dataStr = message.toString()
          const data = JSON.parse(dataStr)
          console.log('hi', data)
          //this.mainWindow.webContents.send('sensor-data', data)
          this.electronGateway.sendToRenderer('sensor-data', data)
          console.log(`[${topicStr}]`, data)
        } catch (err) {
          console.error('SUB message error:', err)
        }
      }
    })()
  }

  async onModuleDestroy(): Promise<void> {
    // Tisztítás
    if (!this.socket) return
    await this.socket.close()
    this.socket = null
  }
}
