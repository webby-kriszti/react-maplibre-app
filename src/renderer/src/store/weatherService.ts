import { useWeatherStore } from './weatherStore'

export const weatherService = {
  loadMeasurements: async () => {
    const res = await window.api.getMeasurements()
    const { actions } = useWeatherStore.getState()
    actions.setMeasurements(res)
  },
  addMeasurement: async (temperature: number, humidity: number) => {
    await window.api.addMeasurement(temperature, humidity)
    const res = await window.api.getMeasurements()
    const { actions } = useWeatherStore.getState()
    actions.setMeasurements(res)
  }
}
