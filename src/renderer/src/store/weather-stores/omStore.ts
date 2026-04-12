import { Station, StationSource } from '../../../../shared/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface OmStore {
  stations: Station[]
  selectedStation: Station | null
  actions: {
    addStation: (station: Station) => void
    selectStation: (station: Station) => void
  }
}
export const useOmStore = create<OmStore>()(
  subscribeWithSelector((set) => ({
    stations: [
      {
        id: 'a1',
        name: 'Budapest1',
        coordinates: [19.86, 48.69],
        measurements: [],
        source: StationSource.OM
      }
    ],
    selectedStation: null,
    actions: {
      addStation: (station) => {
        return set((state) => {
          return { stations: [...state.stations, station] }
        })
      },
      selectStation: (station) => set({ selectedStation: station })
    }
  }))
)
