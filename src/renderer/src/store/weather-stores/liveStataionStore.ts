import { Station, StationMeasurement, StationSource } from '../../../../shared/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface LiveStataionStore {
  stations: Station[]
  selectedStation: Station | null
  actions: {
    addStation: (station: Station) => void
    selectStation: (station: Station) => void
    addMeasurement: (stationId: string, measurement: StationMeasurement) => void
  }
}
export const useLiveStationStore = create<LiveStataionStore>()(
  subscribeWithSelector((set) => ({
    stations: [
      {
        id: 'm1',
        name: 'Budapest2',
        coordinates: [19.06, 47.69],
        measurements: [],
        source: StationSource.METEO
      },
      {
        id: 'o1',
        name: 'Budapest1',
        coordinates: [19.16, 47.69],
        measurements: [],
        source: StationSource.OM
      }
    ],
    selectedStation: null,
    actions: {
      addStation: (station) =>
        set((state) => ({
          stations: [...state.stations, station]
        })),
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
