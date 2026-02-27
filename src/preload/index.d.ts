import { ElectronAPI } from '@electron-toolkit/preload'
import { Measurement } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getMeasurements: () => Promise<Measurement[]>
      addMeasurement: (temperature: number, humidity: number) => Promise<void>
    }
  }
}
