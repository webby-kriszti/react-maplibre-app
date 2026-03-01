import { Coordinates } from 'src/shared/types'
import { useDeviceStore } from './device.store'

export const deviceService = {
  addDevice: (name: string, coordinates: Coordinates) => {
    const { actions } = useDeviceStore.getState()
    const newDevice = {
      id: crypto.randomUUID(),
      name: name,
      coordinates: coordinates,
      isActive: true
    }
    actions.addDevice(newDevice)
  }
}
