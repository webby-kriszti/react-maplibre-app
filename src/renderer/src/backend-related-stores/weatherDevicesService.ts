import { ExtendedMeasurement, MeasurementData } from 'src/shared/types'
import { useWeatherDevicesStore } from './weatherDevicesStore'

export const weatherDevicesService = {
  addMeasurement: (data: MeasurementData) => {
    const measurement: ExtendedMeasurement = {
      id: Number(data.device_id),
      temperature: data.temperature,
      humidity: data.humidity,
      timeStamp: new Date(data.timestamp),
      pressure: data.pressure
    }
    const { actions } = useWeatherDevicesStore.getState()
    const state = useWeatherDevicesStore.getState()
    console.log(
      'device_id:',
      data.device_id,
      '| measurements[device_id]:',
      state.measurements[data.device_id]
    )
    actions.addMeasurement(data.device_id, measurement)

    console.log(useWeatherDevicesStore.getState().measurements)
  }
}
