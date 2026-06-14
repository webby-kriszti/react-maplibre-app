import { ElectronAPI } from '@electron-toolkit/preload'
import { Measurement, MeasurementData } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getMeasurements: () => Promise<Measurement[]>
      addMeasurement: (temperature: number, humidity: number) => Promise<void>
      onSensorData: (callback: (data: MeasurementData) => void) => void
      startSimulation: () => Promise<unknown>
      stopSimulation: () => Promise<unknown>
    }
  }
}
