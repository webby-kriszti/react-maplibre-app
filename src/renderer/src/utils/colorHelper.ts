import { Colors } from '@renderer/types'

export const getTemperatureColor = (temperature: number | undefined): string => {
  if (temperature === undefined) return 'green'
  if (temperature >= 20) return Colors.WARM
  else if (temperature >= 0) return Colors.MEDIUM
  else return Colors.COLD
}
