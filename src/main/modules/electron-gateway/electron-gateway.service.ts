import { Injectable } from '@nestjs/common'
import { BrowserWindow } from 'electron'

@Injectable()
export class ElectronGatewayService {
  private mainWindow: BrowserWindow | null = null

  registerMainWindow(window: BrowserWindow): void {
    this.mainWindow = window
  }
  logMessage(): void {
    console.log('Cat hy')
  }

  sendToRenderer(channel: string, data: unknown): void {
    if (!this.mainWindow) return
    this.mainWindow.webContents.send(channel, data)
  }
}
