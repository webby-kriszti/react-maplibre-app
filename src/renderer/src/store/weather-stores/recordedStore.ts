import { Station } from 'src/shared/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface RecordedStore {
  stations: Station[]
  selectedStation: Station | null
  actions: {
    selectStation: (station: Station) => void
  }
}
export const useRecordedStore = create<RecordedStore>()(
  subscribeWithSelector((set) => ({
    stations: [
      { id: 's1', name: 'Debrecen', coordinates: [21.62, 47.53], measurements: [] },
      { id: 's2', name: 'Pécs', coordinates: [18.23, 46.07], measurements: [] }
    ],
    selectedStation: null,
    actions: {
      selectStation: (station) => set({ selectedStation: station })
    }
  }))
)
