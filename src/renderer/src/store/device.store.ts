import { Device } from 'src/shared/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface DeviceStore {
  devices: Device[]
  selectedDevice: Device | null
  actions: {
    addDevice: (Device) => void
    selectDevice: (device: Device) => void
  }
}
export const useDeviceStore = create<DeviceStore>()(
  subscribeWithSelector((set) => ({
    devices: [{ id: '1', name: 'Cat ', coordinates: [19.04, 47.49], isActive: true }],
    selectedDevice: null,
    actions: {
      addDevice: (device) => {
        return set((state) => {
          return { devices: [...state.devices, device] }
        })
      },
      selectDevice: (device) => set({ selectedDevice: device })
    }
  }))
)
