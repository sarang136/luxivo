import React from 'react'
import { useParams } from 'react-router-dom';

const UserDetails = () => {

  const { id } = useParams();

  return (
    <div className=''>
      <p>{id}</p>
    </div>
  )
}

export default UserDetails