import { Skeleton } from '../ui/skeleton'

export default function ProductCardSkeleton() {
  return (
    <div className="max-w-[175px] sm:min-w-[300px] sm:w-[300px] h-[475px] flex flex-col space-y-2">
      <Skeleton className="h-[290px] w-[193px] rounded-lg" />
      <Skeleton className="h-5 w-[120px] rounded-sm" />
      <Skeleton className="h-10 w-[175px] rounded-sm" />
    </div>
  )
}
