import { Skeleton } from '@/components/ui/skeleton'

export default function SearchSkeleton() {
  const searchSkeletonResults = 4
  const SkeletonRecord = () => (
    <div className="flex flex-row gap-1 justify-items-start w-full">
      <Skeleton className="h-[110px] w-[100px] rounded-xl flex-shrink-0" />
      <Skeleton className="h-[110px] w-[80vh] md:w-full rounded-md" />
    </div>
  )
  return (
    <>
      <div className="flex-col w-full space-y-2">
        <SkeletonRecord />
        <SkeletonRecord />
      </div>
    </>
  )
}
