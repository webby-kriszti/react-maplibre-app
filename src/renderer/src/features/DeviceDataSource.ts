import { Device } from 'src/shared/types'
import { BaseDataSource } from './BaseDataSource'
import { useDeviceStore } from '@renderer/store/device.store'

export class DeviceDataSource extends BaseDataSource<Device> {
  constructor() {
    super() // ← meghívja a BaseDataSource constructorát
  }
  protected getDevices(): Device[] {
    return useDeviceStore.getState().devices
  }

  protected subscribeToStore(cb: (value: Device[] | undefined) => void): () => void {
    return useDeviceStore.subscribe((s) => s.devices, cb)
  }
}
