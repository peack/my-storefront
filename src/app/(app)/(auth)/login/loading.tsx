import dynamic from 'next/dynamic'

const LoadingOval = dynamic(() => import('@components/ui/Loading'), { ssr: false })
export default function Loading() {
  //   return <Oval visible={true} height={35} width={35} color="#03935a" />
  return <div className="animate-pulse">LOADING</div>
  //   return <LoadingOval />
}
