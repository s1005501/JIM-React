import React from 'react'
import { useParams } from 'react-router-dom'
import Store from './Store'

import { StoreAdd, StoreGameList, StoreInformation } from './StoreComponent'

const StoreMenuList = () => {
  const { action } = useParams()
  let currentPage = ''
  switch (action) {
    case 'gamelist': {
      currentPage = <StoreGameList />
      break
    }
    case 'add': {
      currentPage = <StoreAdd />
      break
    }

    case 'information': {
      currentPage = <StoreInformation />
      break
    }
    default: {
      currentPage = <Store />
    }
  }
  return <>{currentPage}</>
}

export default StoreMenuList
