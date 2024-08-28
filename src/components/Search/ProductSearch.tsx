'use client'
// import { getPayloadHMR } from '@payloadcms/next/utilities'
import React, { useState } from 'react'
import configPromise from '@payload-config'
import { Product } from '@/payload-types'
import qs from 'qs'

// const payload = await getPayloadHMR({ config: configPromise })

const ProductSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)

    try {
      const stringifiedQuery = qs.stringify(
        {
          where: {
            title: {
              like: query,
            },
          },
        },
        { addQueryPrefix: true },
      )

      const req = await fetch(`/api/search/${stringifiedQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await req.json()

      console.log('data', data)
      const prods = data?.docs.map((product: Product) => {
        console.log('product', product)
        return product as Product
      })
      setResults(prods) // Assuming Payload's find method returns `docs`
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleSearch}
        className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {results?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          <ul>
            {results.map((product, index) => (
              // <li key={index}>Found 1</li>
              <li key={product.id} className="mb-4 p-4 border rounded">
                {/* <Image src={product.image} alt={product.name} className="w-16 h-16 object-cover" /> */}
                <h3 className="text-lg font-bold">{product?.title}</h3>
                <p>{product?.meta?.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results?.length === 0 && !loading && query && (
        <p className="mt-8 text-gray-500">{`No products found for "${query}".`}</p>
      )}
    </div>
  )
}

export default ProductSearch
