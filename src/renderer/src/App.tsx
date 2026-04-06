import { Weather } from './components/Weather'
import MaplibreView from './components/MaplibreView'
import { ReactElement, useState } from 'react'
import { Tab } from './types'
import BearBox from './features/zustand/BearBox'
import Versions from './components/Versions'
import { StationForm } from './components/StationForm'
import MeasurementForm from './components/MeasurementForm'
import { StationList } from './components/StationList'

function App(): ReactElement {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.MAP)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: 8 }}>
        <button onClick={() => setActiveTab(Tab.MAP)}>Map</button>
        <button onClick={() => setActiveTab(Tab.WEATHER)}>Weather</button>
        <button onClick={() => setActiveTab(Tab.ZUSTAND)}>Zustand</button>
        <button onClick={() => setActiveTab(Tab.VERSIONS)}>Versions</button>
        <button onClick={() => setActiveTab(Tab.STATIONS)}>Stations</button>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        {activeTab === Tab.MAP && <MaplibreView />}
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
