import { Station, StationMeasurement, StationSource } from '../../../../shared/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface MeteoHungaryStore {
  stations: Station[]
  selectedStation: Station | null
  actions: {
    addStation: (station: Station) => void
    selectStation: (station: Station) => void
    addMeasurement: (stationId: string, measurement: StationMeasurement) => void
  }
}
export const useMeteoHungaryStore = create<MeteoHungaryStore>()(
  subscribeWithSelector((set) => ({
    stations: [
      {
        id: 'a1',
        name: 'Budapest1',
        coordinates: [19.06, 47.69],
        measurements: [],
        source: StationSource.METEO
      }
    ],
    selectedStation: null,
    actions: {
      addStation: (station) => {
        return set((state) => {
          return { stations: [...state.stations, station] }
        })
      },
      selectStation: (station) => set({ selectedStation: station }),
      addMeasurement: (stationId, measurement) =>
        set((state) => ({
          stations: state.stations.map((station) => {
            if (station.id === stationId) {
              return {
                ...station,
                measurements: [...station.measurements, measurement]
              }
            }
            return station
          })
        }))
    }
  }))
)
