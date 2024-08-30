'use client'
import { searchProducts } from '@/components/Search/searchProduct'
import { Input } from '@/components/ui/input'
import { Media, Product } from '@/payload-types'
import { Alert } from '@components/ui/alert'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'

interface ProductSearchProps {
  handleModalToggle: () => void
}

const ProductSearch: React.FC<ProductSearchProps> = ({ handleModalToggle }: ProductSearchProps) => {
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searchMessage, setSearchMessage] = useState<String | null>(null)

  const searchResultsRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLInputElement>(null)
  const searchBarButtonRef = useRef<HTMLButtonElement>(null)

  const handleInputFocus = useCallback(() => {
    setTimeout(() => searchBarRef.current?.focus(), 100)
  }, [])

  const handleBlur = () => {
    handleModalToggle()
  }

  const handleSearch = async () => {
    const query = searchBarRef.current?.value || ''

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

    setResults(products)
    setSearchMessage(products.length === 0 ? 'No results found' : null)
    setLoading(false)
    handleInputFocus()
  }

  const handleClickOutside = useCallback(
    async (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node) &&
        searchBarButtonRef.current &&
        !searchBarButtonRef.current.contains(event.target as Node)
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
            // onBlur={handleBlur}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button ref={searchBarButtonRef} onClick={handleSearchClick}>
          Search
        </Button>
      </div>
    </>
  )

  const SearchResults = () => (
    <div ref={searchResultsRef} className="overflow-y-clip">
      {results?.length > 0 && (
        <>
          <ul>
            {results.map((product) => {
              const productImage = (product?.meta?.image as Media) || null
              return (
                <li key={product.id} className="mb-4 p-4 border rounded-md flex ">
                  <div className="flex">
                    <Link href={`/products/${product.slug}`} onClick={handleBlur}>
                      <div className="">
                        <Image
                          src={productImage?.url ?? '/Image_NA.png'}
                          alt={product?.title}
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className="">
                        <h2 className="text-l font-bold">{product?.title}</h2>
                      </div>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )

  return (
    <>
      <div className="absolute mx-auto transform translate-y-[60px] rounded-xl top-1 bg-white left-4 right-2 px-4 border-solid max-w-4xl min-w-[40vh] max-h-[60vh] overflow-scroll no-scrollbar shadow-lg ease-in-out duration-1000 ">
        <div className="sticky top-0 bg-white w-full py-2 mt-0  ">
          <SearchBar />
          {results?.length > 0 && (
            <h2 className="text-xl font-bold pt-2 p-2 mb-4">Search Results</h2>
          )}
        </div>
        <SearchResults />
        {results?.length === 0 && !loading && searchMessage && (
          <div className="">
            <Alert className="py-4">{searchMessage}</Alert>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductSearch
