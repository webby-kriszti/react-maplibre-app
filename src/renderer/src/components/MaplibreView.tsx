import { MapRenderer } from '@renderer/features/maplibre/MapRenderer'
import { MapType } from '@renderer/types'
import { ReactElement, useEffect, useRef } from 'react'

interface Prop {
  mode: MapType
}

const MaplibreView = ({ mode }: Prop): ReactElement => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRendererRef = useRef<MapRenderer | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      mapRendererRef.current = new MapRenderer({
        container: containerRef.current,
        center: [19.04, 47.49],
        zoom: 6,
        mode: mode
      })
    }
    return () => {
      mapRendererRef.current?.destroy()
      mapRendererRef.current = null
    }
  }, [mode])

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
}

export default MaplibreView
