import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { Dealer } from 'zeromq'

// Config — ugyanaz a host mint a SUB-nál, de másik port
const zmqConfig = {
  backendHost: '192.168.0.201', // Prod
  //backendHost: '192.168.0.200', // Dev
  routerPort: 5556
}

@Injectable()
export class SimulationService implements OnModuleInit, OnModuleDestroy {
  private socket: Dealer | null = null

  async onModuleInit(): Promise<void> {
    // 1. Socket létrehozása
    this.socket = new Dealer()
    // 2. Csatlakozás
    this.socket.connect(`tcp://${zmqConfig.backendHost}:${zmqConfig.routerPort}`)
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.socket) return
    await this.socket.close()
    this.socket = null
  }
  async sendCommand(command: string): Promise<unknown> {
    if (!this.socket) {
      throw new Error('Socket not initialized')
    }

    // 1. Payload összerakása
    const id = `cmd-${Date.now()}`
    const request = { id, command }
    const requestJson = JSON.stringify(request)

    // 2. Küldés
    await this.socket.send(requestJson)

    // 3. Válaszra várás
    const [, responseBuffer] = await this.socket.receive()
    const responseJson = responseBuffer.toString()
    const response = JSON.parse(responseJson)

    // 4. Visszaadás
    return response
  }
}
