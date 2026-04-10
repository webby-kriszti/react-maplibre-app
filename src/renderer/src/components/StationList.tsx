import { useLiveStationStore } from '@renderer/store/weather-stores/liveStataionStore'
import { liveStationService } from '@renderer/store/weather-stores/liveStationService'
import { ReactElement } from 'react'
import { Station } from 'src/shared/types'
import { useShallow } from 'zustand/shallow'

export const StationList = (): ReactElement => {
  const { stations, selectedStation } = useLiveStationStore(
    useShallow((s) => ({ stations: s.stations, selectedStation: s.selectedStation }))
  )

  const handleClick = (station: Station): void => {
    liveStationService.selectStation(station)
  }
  console.log('selected station: ', selectedStation)
  return (
    <>
      <div>StationList</div>
      <ul>
        {stations.map((s) => (
          <li
            key={s.id}
            onClick={() => handleClick(s)}
            style={{ fontWeight: s.id === selectedStation?.id ? 'bold' : 'normal' }}
          >
            {s.name}
          </li>
        ))}
      </ul>
    </>
  )
}
