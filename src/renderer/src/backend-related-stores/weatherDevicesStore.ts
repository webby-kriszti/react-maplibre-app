import { ExtendedMeasurement, WeatherDevice } from 'src/shared/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface WeatherDevicesStore {
  devices: WeatherDevice[]
  selectedDeviceId: string
  measurements: Record<string, ExtendedMeasurement[]>
  actions: {
    selectDevice: (id: string) => void
    addMeasurement: (deviceId: string, measurement: ExtendedMeasurement) => void
  }
}
export const useWeatherDevicesStore = create<WeatherDevicesStore>()(
  subscribeWithSelector((set) => ({
    devices: [],
    selectedDeviceId: '',
    measurements: {},
    actions: {
      selectDevice: (deviceId) => set({ selectedDeviceId: deviceId }),
      addMeasurement: (deviceId, measurement) =>
        set((state) => ({
          measurements: {
            ...state.measurements,
            [deviceId]: [...(state.measurements[deviceId] ?? []), measurement]
          }
        }))
    }
  }))
)
