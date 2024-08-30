'use client'
import { searchProducts } from '@/components/Search/searchProduct'
import { Input } from '@/components/ui/input'
import Loading from '@/components/ui/Loading'
import { debounce } from '@/lib/utils'
import { Media, Product } from '@/payload-types'
import { Alert } from '@components/ui/alert'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const ProductSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  // const [isFocused, setIsFocused] = useState(false)
  const [searchMessage, setSearchMessage] = useState<String | null>(null)

  const searchResultsRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLInputElement>(null)
  const searchBarMobileRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    // setIsFocused(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      // setIsFocused(false)
    }, 100)
  }

  const handleSearch = useCallback(async () => {
    setLoading(true)
    setSearchMessage(null)
    // setIsFocused(true)
    if (query.length < 3) {
      setLoading(false)
      setSearchMessage('Search term must be at least 3 characters long')
      searchBarRef.current?.focus()
      return
    } else if (query.length === 0) {
      setResults([])
      setLoading(false)
      // setTimeout(() => searchBarRef.current?.focus(), 100)
      return
    }
    const products = await searchProducts(query)
    if (products.length === 0) setSearchMessage('No results found')
    setResults(products)

    // setTimeout(() => searchBarMobileRef.current?.focus(), 100)
    // setTimeout(() => searchBarRef.current?.focus(), 100)
    setLoading(false)
    // setIsFocused(true)
  }, [query])

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target as Node) &&
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      // setIsFocused(false)
    }
  }

  const handleSearchClick = () => {
    // setIsFocused((isFocused) => !isFocused)
    // if (!isFocused) {
    setTimeout(() => searchBarMobileRef.current?.focus(), 100)
    // }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // useEffect(() => {
  //   if (isFocused) {
  //     console.log('is focused')
  //     searchBarRef.current?.focus()
  //     // searchBarMobileRef.current?.focus()
  //   }
  // }, [isFocused])

  useEffect(() => {
    // handleSearch()
    const { debouncedFn, cancel } = debounce(handleSearch, 500)
    debouncedFn()
    // console.log(searchBarRef.current)
    setTimeout(() => searchBarRef.current?.focus(), 0)
    // searchBarRef.current?.focus()

    return () => {
      cancel()
    }
  }, [query, handleSearch])

  const SearchBar = () => (
    <>
      <div className="w-full hidden max-w-2xl mx-auto p-1 sm:flex ">
        <Input
          key={'searchBar'}
          ref={searchBarRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full p-2 border rounded"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
      {/* {isFocused && ( */}
      {/* <div className="fixed top-[60px] left-0 w-full min-w-screen flex mx-auto p-1 md:hidden"> */}
      {/* <Input
          key={'searchBarMobile'}
          ref={searchBarMobileRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full p-2 border rounded"
          onBlur={handleBlur}
          onFocus={handleFocus}
        /> */}
      {/* </div> */}
      {/* )} */}
      <div className="p-0">
        {/* {loading ? (
          <Loading />
        ) : ( */}
        <button
          onClick={() => handleSearchClick()}
          className=" text-gray-400 p-2"
          disabled={loading}
        >
          <Search />
        </button>
        {/* )} */}
      </div>
    </>
  )

  return (
    <>
      <SearchBar />
      <div ref={searchResultsRef}>
        <div className="absolute transform translate-y-[40px] right-0 mx-4 my-1 bg-white px-4 border-solid max-w-[60vh] min-w-[40vh] max-h-[60vh] overflow-scroll rounded-lg no-scrollbar shadow-lg ease-in-out duration-1000">
          {/* <div className="absolute mt-8 max-w-md background bg-white rounded"> */}
          {results?.length > 0 && (
            <>
              <h2 className=" text-xl font-bold p-2 mb-4">Search Results</h2>
              <ul>
                {results.map((product, index) => {
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
          {results?.length === 0 && !loading && query && searchMessage && (
            <div className="p-4">
              <Alert variant="destructive" className="py-4">
                {searchMessage}
              </Alert>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductSearch
