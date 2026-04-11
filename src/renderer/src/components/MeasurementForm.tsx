import { useLiveStationStore } from '@renderer/store/weather-stores/liveStataionStore'
import { liveStationService } from '@renderer/store/weather-stores/liveStationService'
import { ReactElement, useState } from 'react'
import { Station } from 'src/shared/types'

const MeasurementForm = (): ReactElement => {
  const [temperature, setTemperature] = useState(0)
  
  const stations: Station[] = useLiveStationStore((s) => s.stations)
  const [stationId, setStationId] = useState(stations[0].id ?? '')
  const measurement = { temperature: temperature, timestamp: new Date() }
  const handleSend = (): void => {
    liveStationService.addMeasurement(stationId, measurement)
  }
  console.log('measurement:', measurement)

  return (
    <>
      <div>MeasurementForm</div>
      <div>
        <select value={stationId} onChange={(e) => setStationId(e.target.value)}>
          Stations
          {stations.map((s) => (
            <option value={s.id} key={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <label>
          Temperature:{' '}
          <input value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} />
        </label>
        <button onClick={handleSend}>Add new measurement</button>
      </div>
    </>
  )
}

export default MeasurementForm
