import { MapRenderer } from '@renderer/features/maplibre/MapRenderer'
import { ReactElement, useEffect, useRef } from 'react'

const MaplibreView = (): ReactElement => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRendererRef = useRef<MapRenderer | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      mapRendererRef.current = new MapRenderer({
        container: containerRef.current,
        center: [0, 0],
        zoom: 6
      })
    }
    return () => {
      mapRendererRef.current?.destroy()
      mapRendererRef.current = null
    }
  }, [])

  return <div ref={containerRef} style={{ height: '100vh', width: '100%' }} />
}

export default MaplibreView
