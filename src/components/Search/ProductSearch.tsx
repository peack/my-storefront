'use client'
import { searchProducts } from '@/components/Search/searchProduct'
import { Input } from '@/components/ui/input'
import { Product } from '@/payload-types'
import { Alert } from '@components/ui/alert'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'

interface ProductSearchProps {
  handleModalToggle: () => void
}

interface ProductResult extends Product {
  imageUrl: string
}

const ProductSearch: React.FC<ProductSearchProps> = ({ handleModalToggle }: ProductSearchProps) => {
  const [results, setResults] = useState<ProductResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searchMessage, setSearchMessage] = useState<String | null>(null)
  const [userQuery, setUserQuery] = useState<string | null>(null)

  const searchResultsRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLInputElement>(null)
  const searchComponentRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const handleInputFocus = useCallback(() => {
    setTimeout(() => searchBarRef.current?.focus(), 100)
  }, [])

  const handleBlur = () => {
    handleModalToggle()
  }

  const handleSearch = async () => {
    const query = searchBarRef.current?.value || ''
    setUserQuery(query)

    setResults([])
    setLoading(true)
    setSearchMessage(null)

    if (query.length === 0 || query.length < 3) {
      setLoading(false)
      setSearchMessage(query.length === 0 ? null : 'Search term must be at least 3 characters long')
      handleInputFocus()
      return
    }

    const products = await searchProducts(query)

    setResults(products.map((product) => product as ProductResult))
    setSearchMessage(products.length === 0 ? 'No results found' : null)
    setLoading(false)
    handleInputFocus()
  }

  const handleClickOutside = useCallback(
    async (event: MouseEvent) => {
      if (
        searchComponentRef.current &&
        !searchComponentRef.current.contains(event.target as Node)
      ) {
        handleModalToggle()
      }
    },
    [handleModalToggle],
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSearch()
    }
  }
  const handleSearchClick = () => {
    handleSearch()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  useEffect(() => {
    handleInputFocus()
  }, [handleInputFocus])

  const SearchBar = () => (
    <>
      <div className=" flex justify-between items-center space-x-1">
        <div className="w-full max-w-4xl mx-auto p-1">
          <Input
            key={'searchBar'}
            ref={searchBarRef}
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 border rounded"
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button onClick={handleSearchClick}>Search</Button>
      </div>
    </>
  )

  const SearchMoreComponent = () => {
    return (
      <>
        <Separator />
        <div className="flex pt-2 py-2">
          <Button
            variant={'link'}
            onClick={() => {
              router.replace(`search?q=${userQuery}`)
              handleModalToggle()
            }}
          >
            See all results
          </Button>
        </div>
      </>
    )
  }

  const SearchResults = () => (
    <div ref={searchResultsRef} className=" max-h-[40vh] overflow-scroll no-scrollbar">
      {results?.length > 0 && (
        <>
          <ul>
            {results.map((product) => {
              return (
                <Link key={product.id} href={`/products/${product.slug}`} onClick={handleBlur}>
                  <li className="flex flex-nowrap items-center border rounded-md min-w-screen my-2 h-[110px] hover:bg-slate-100">
                    <Image
                      src={product.imageUrl || '/Image_NA.png'}
                      alt={product?.title}
                      width={120}
                      height={120}
                      className="rounded-xl px-2"
                    />

                    <h2 className="text-l pl-2 font-bold">{product?.title}</h2>
                  </li>
                </Link>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )

  return (
    <>
      <div
        ref={searchComponentRef}
        className="absolute mx-auto transform translate-y-[60px] rounded-xl top-1 bg-white left-4 right-2 px-4 border-solid max-w-4xl min-w-[40vh] max-h-[60vh] shadow-lg ease-in-out duration-1000 "
      >
        <div className="sticky top-0 bg-white w-full py-2 mt-0  ">
          <SearchBar />
          {results?.length > 0 && (
            <h2 className="text-xl font-bold pt-2 p-2 mb-2">
              Search Results ({results?.length > 0 && results?.length})
            </h2>
          )}
        </div>
        <SearchResults />
        {results?.length > 5 && <SearchMoreComponent />}
        {results?.length === 0 && !loading && searchMessage && (
          <div className="p-4">
            <Alert>{searchMessage}</Alert>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductSearch
