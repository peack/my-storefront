import { Media, Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface ProductDetailsProps {
  product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const productMedia = (product.meta?.image as Media) || null
  return (
    <>
      <h1 className="font-bold text-3xl pb-5">{product.title}</h1>
      <div className="flex justify-center">
        <Image
          className="rounded-sm shadow-xl"
          src={productMedia.url ?? '/Image_NA.png'}
          width={500}
          height={300}
          sizes="60vw"
          style={{
            width: '60%',
            height: 'auto',
          }}
          alt={productMedia.alt ?? `Image of ${product.title}`}
        />
      </div>
      <div className="my-10">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          Description
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{product.meta?.description}</p>
      </div>

      {/* <FlexibleCard title="Related Products">
        {product.relatedProducts?.length > 4 ? (
          <div className="flex container justify-center">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {product.relatedProducts?.map((relatedProd) => {
                  const product = relatedProd as Product
                  const productMedia = (product.meta?.image as Media) || null
                  return (
                    <CarouselItem
                      className="basis-1/3"
                      key={typeof relatedProd === 'string' ? relatedProd : relatedProd.id}
                    >
                      <Link
                        href={`/products/${
                          typeof relatedProd === 'string' ? relatedProd : relatedProd.slug
                        }`}
                      >
                        <Image
                          className="rounded-sm"
                          width={150}
                          height={150}
                          src={productMedia.url ?? '/Image_NA.png'}
                          alt={productMedia.alt ?? `Image of ${product.title}`}
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
      </FlexibleCard> */}
    </>
  )
}

export default ProductDetails

const ProductDetailRelatedProductsRow = ({ product }: { product: Product }) => {
  return (
    <div className="flex justify-start gap-1">
      {product.relatedProducts?.map((relatedProd) => {
        const product = relatedProd as Product
        const productMedia = (product.meta?.image as Media) || null
        return (
          <Link
            href={`/products/${typeof product === 'string' ? product : product.slug}`}
            key={typeof product === 'string' ? product : product.id}
          >
            <Image
              className="rounded-sm"
              width={150}
              height={150}
              src={productMedia.url ?? '/Image_NA.png'}
              alt={productMedia.alt ?? `Image of ${product.title}`}
            />
          </Link>
        )
      })}
    </div>
  )
}
