import { weatherService } from '@renderer/store/weatherService'
import { useWeatherStore } from '@renderer/store/weatherStore'
import { ReactElement } from 'react'

export function Weather(): ReactElement {
  const measurements = useWeatherStore((s) => s.measurements)

  return (
    <>
      <div>
        {measurements.map((el) => (
          <div key={el.id}>
            <p>Temperature: {el.temperature}°C </p>
            <p>Humidity: {el.humidity}</p>
          </div>
        ))}
        <button onClick={() => weatherService.addMeasurement(10, 54)}>Add</button>
      </div>
    </>
  )
}
