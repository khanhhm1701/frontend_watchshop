import React from 'react'
import {Link} from 'react-router-dom'

const TypeProductsItem = ({name}) => {
  return (
    <Link className='text-xl font-semibold text-slate-700 hover:text-yellow-600' to='/type'>
        <span>{name}</span>
    </Link>
  )
}

export default TypeProductsItem