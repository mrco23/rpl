import React from 'react'

function AdminHeader({ text, subText }) {
  return (
    <section className="mb-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
        {text}
      </h1>
      <p className="text-gray-500 mt-1">
        {subText}
      </p>
    </section>
  )
}

export default AdminHeader