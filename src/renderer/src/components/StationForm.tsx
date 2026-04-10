import { ReactElement, useState } from 'react'
import { Station, StationSource } from '../../../shared/types'
import { liveStationService } from '@renderer/store/weather-stores/liveStationService'

export const StationForm = (): ReactElement => {
  const [name, setName] = useState('')
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [source, setSource] = useState<StationSource>(StationSource.METEO)
  const handleSend = (): void => {
    const id = `${name}_${Math.floor(100000 + Math.random() * 900000)}`
    const station: Station = {
      id: id,
      name: name,
      coordinates: [lng, lat],
      measurements: [],
      source
    }
    liveStationService.addStation(station)
    setName('')
    setLat(0)
    setLng(0)
  }
  return (
    <>
      <div>StaionForm</div>
      <label>
        Station name: <input value={name} onChange={(e) => setName(e.target.value)} type="string" />
      </label>
      <label>
        Station source:{' '}
        <input
          value={source}
          onChange={(e) => setSource(StationSource[e.target.value])}
          type="string"
        />
      </label>
      <label>
        Station coordinates:
        <div>
          lat: {lat}: <input value={lat} onChange={(e) => setLat(Number(e.target.value))} />
          lng:{lng}
          <input value={lng} onChange={(e) => setLng(Number(e.target.value))} />
        </div>
      </label>
      <button onClick={handleSend}>Add new station</button>
    </>
  )
}
