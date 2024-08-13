import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Products from './Products'
const payload = await getPayloadHMR({ config: configPromise })

const data = await payload.find({
  collection: 'products',
})

export default function page() {
  console.log(data)
  return (
    <div>
      <h1>Welcome to the product page</h1>
      <Products data={data} />
    </div>
  )
}
