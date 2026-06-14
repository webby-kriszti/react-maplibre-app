import { Weather } from './components/Weather'
import MaplibreView from './components/MaplibreView'
import { ReactElement, useEffect, useState } from 'react'
import { MapType, Tab } from './types'
import BearBox from './features/zustand/BearBox'
import Versions from './components/Versions'
import { StationForm } from './components/StationForm'
import MeasurementForm from './components/MeasurementForm'
import { StationList } from './components/StationList'
import { MeasurementData } from 'src/shared/types'
import { weatherDevicesService } from './backend-related-stores/weatherDevicesService'

function App(): ReactElement {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.MAP_LIVE)

  // ... a komponens belsejében:
  useEffect(() => {
    window.api.onSensorData((data: MeasurementData) => {
      weatherDevicesService.addMeasurement(data)
    })
    const res = window.api.getMeasurements()
    console.log(res)
  }, [])
  const start = async (): Promise<void> => {
    const res = await window.api.startSimulation()
    console.log('res start', res)
  }
  const stop = async (): Promise<void> => {
    const res = await window.api.stopSimulation()
    console.log('res stop', res)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: 8 }}>
        <button onClick={() => setActiveTab(Tab.MAP_LIVE)}>Map live</button>
        <button onClick={() => setActiveTab(Tab.MAP_RECORDED)}>Map recorded</button>
        <button onClick={() => setActiveTab(Tab.WEATHER)}>Weather</button>
        <button onClick={() => setActiveTab(Tab.ZUSTAND)}>Zustand</button>
        <button onClick={() => setActiveTab(Tab.VERSIONS)}>Versions</button>
        <button onClick={() => setActiveTab(Tab.STATIONS)}>Stations</button>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        {activeTab === Tab.MAP_LIVE && <MaplibreView mode={MapType.MAP_LIVE} />}
        {activeTab === Tab.MAP_RECORDED && <MaplibreView mode={MapType.MAP_RECORDED} />}
        {activeTab === Tab.WEATHER && <Weather />}
        {activeTab === Tab.ZUSTAND && <BearBox />}
        {activeTab === Tab.VERSIONS && <Versions />}
        {activeTab === Tab.STATIONS && (
          <>
            <StationForm />
            <MeasurementForm />
            <StationList />
          </>
        )}
      </div>
    </div>
  )
}

export default App
