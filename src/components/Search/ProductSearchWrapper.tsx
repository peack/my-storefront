'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import ProductSearch from './ProductSearch'

export default function ProductSearchWrapper() {
  const [showModal, setShowModal] = useState(false)

  const handleModalToggle = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <button onClick={handleModalToggle} className=" text-gray-400 p-2">
        <Search />
      </button>
      {showModal && <ProductSearch handleModalToggle={handleModalToggle} />}
    </>
  )
}
