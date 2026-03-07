import { Station } from 'src/shared/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface MeteoHungaryStore {
  stations: Station[]
  selectedStation: Station | null
  actions: {
    addStation: (station: Station) => void
    selectStation: (station: Station) => void
  }
}
export const useMeteoHungaryStore = create<MeteoHungaryStore>()(
  subscribeWithSelector((set) => ({
    stations: [{ id: 'a1', name: 'Budapest1', coordinates: [19.06, 47.69] }],
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
