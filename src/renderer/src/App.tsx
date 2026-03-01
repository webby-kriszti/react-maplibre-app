import { Weather } from './components/Weather'
import MaplibreView from './components/MaplibreView'
import { ReactElement, useState } from 'react'
import { Tab } from './types'
import BearBox from './features/zustand/BearBox'

function App(): ReactElement {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.MAP)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: 8 }}>
        <button onClick={() => setActiveTab(Tab.MAP)}>Map</button>
        <button onClick={() => setActiveTab(Tab.WEATHER)}>Weather</button>
        <button onClick={() => setActiveTab(Tab.ZUSTAND)}>Zustand</button>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        {activeTab === Tab.MAP && <MaplibreView />}
        {activeTab === Tab.WEATHER && <Weather />}
        {activeTab === Tab.ZUSTAND && <BearBox />}
      </div>
    </div>
  )
}

export default App
