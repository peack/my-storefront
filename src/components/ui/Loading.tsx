import { Oval } from 'react-loader-spinner'

interface OvalProps {
  height?: number
  width?: number
  color?: string
}
export default function Loading({ height = 35, width = 35, color = '#03935a' }: OvalProps) {
  return <Oval visible={true} height={height} width={width} color={color} />
}
