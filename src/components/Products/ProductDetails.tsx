import { Media, Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import FlexibleCard from '@/components/Cards/FlexibleCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@components/ui/carousel'
import { Button } from '../ui/button'

interface ProductDetailsProps {
  product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const productMedia = (product?.meta?.image as Media) || null
  const relatedProducts = product?.relatedProducts || []
  return (
    <>
      <h1 className="font-bold text-4xl px-1 py-5">
        {product?.meta?.title ?? product?.title ?? ''}
      </h1>
      <div className="pt-4 sm:pt-5 p-1 flex flex-col md:flex-row md:justify-around">
        <div className="flex-col md:flex-grow-3 justify-center">
          <div className="flex justify-center">
            <Image
              className="rounded-lg shadow-xl max-h-[65vh] md:max-h-[85vh]  "
              src={productMedia?.url ?? '/Image_NA.png'}
              width={400}
              height={500}
              alt={productMedia?.alt ?? `Image of ${product?.meta?.title ?? 'No image found'}`}
            />
          </div>
          <div className="flex justify-end md:justify-end pt-1">
            <Button>Add to favorites</Button>
          </div>
        </div>

        <div className="justify-center md:flex-col flex-grow-1">
          {product?.meta?.description && (
            <>
              <h2 className=" scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                Description
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-4">{product?.meta?.description}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex pt-6 sm:justify-start">
        {relatedProducts?.length > 0 && (
          <FlexibleCard title="Related products">
            {relatedProducts?.length > 4 ? (
              <div className="flex container justify-center">
                <Carousel opts={{ loop: true }}>
                  <CarouselContent>
                    {product.relatedProducts?.map((relatedProd) => {
                      const product = relatedProd as Product
                      const productMedia = (product?.meta?.image as Media) || null
                      return (
                        <CarouselItem
                          className="basis-1/3"
                          key={typeof product === 'string' ? product : product.id}
                        >
                          <Link
                            href={`/products/${
                              typeof product === 'string' ? product : product.slug
                            }`}
                          >
                            <Image
                              className="rounded-sm"
                              width={150}
                              height={150}
                              src={productMedia?.url ?? '/Image_NA.png'}
                              alt={productMedia?.alt ?? `Image of ${product.title}`}
                            />
                          </Link>
                        </CarouselItem>
                      )
                    })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ) : (
              <ProductDetailRelatedProductsRow product={product} />
            )}
          </FlexibleCard>
        )}
      </div>
    </>
  )
}

export default ProductDetails

const ProductDetailRelatedProductsRow = ({ product }: { product: Product }) => {
  return (
    <div className="flex justify-start gap-1">
      {product.relatedProducts?.map((relatedProd) => {
        const product = relatedProd as Product
        const productMedia = (product?.meta?.image as Media) || null
        return (
          <Link
            href={`/products/${typeof product === 'string' ? product : product.slug}`}
            key={typeof product === 'string' ? product : product.id}
          >
            <Image
              className="rounded-sm"
              width={150}
              height={150}
              src={productMedia?.url ?? '/Image_NA.png'}
              alt={productMedia?.alt ?? `Image of ${product.title}`}
            />
          </Link>
        )
      })}
    </div>
  )
}
