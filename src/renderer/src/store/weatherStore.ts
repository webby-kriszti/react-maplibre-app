import { create } from 'zustand'
import { Measurement } from '../../../shared/types'
import { subscribeWithSelector } from 'zustand/middleware'

interface WeatherState {
  measurements: Measurement[]
  actions: {
    setMeasurements: (measurements: Measurement[]) => void
  }
}
export const useWeatherStore = create<WeatherState>()(
  subscribeWithSelector((set) => ({
    measurements: [],
    actions: {
      setMeasurements: (measurements) => set({ measurements: measurements })
    }
  }))
)
