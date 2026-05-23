import React from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
function MoreButton({ text, to }) {
  return (
    <div className="flex justify-center mt-10">
      <Link
        to={to}
        className="flex active:scale-98 items-center gap-2 border-0 outline-2 outline-gray-400 px-5 py-2 rounded-lg text-gray-800 hover:bg-gray-100"
      >
        {text}
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}

export default MoreButton