import React from 'react'
import CollectionItem from './CollectionItem'

const CollectionList = ({types}) => {
  return (
    <div className="w-full px-40 flex flex-col my-16">
        <p className="text-3xl font-semibold mb-12">BỘ SƯA TẬP</p>
        <div className='grid grid-cols-3 gap-12'>
            {types.map((type, i) => (
              <CollectionItem key={i} type = {type}/>
            ))}
        </div>
    </div>
  )
}

export default CollectionList