import { meteoHungaryService } from '@renderer/store/meteoHungaryService'
import { useMeteoHungaryStore } from '@renderer/store/weather-stores/meteoHungaryStore'
import { ReactElement } from 'react'
import { Station } from 'src/shared/types'
import { useShallow } from 'zustand/shallow'

export const StationList = (): ReactElement => {
  const { stations, selectedStation } = useMeteoHungaryStore(
    useShallow((s) => ({ stations: s.stations, selectedStation: s.selectedStation }))
  )

  const handleClick = (station: Station): void => {
    meteoHungaryService.selectStation(station)
  }
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
