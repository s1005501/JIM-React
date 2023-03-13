import React from 'react'
import { useParams } from 'react-router-dom'
import MemberAccountProfile from './MemberAccountProfile'
import MemberAccountLevel from './MemberAccountLevel'
import MemberAccountOrder from './MemberAccountOrder'
import MemberAccountComment from './MemberAccountComment'
import MemberAccountLike from './MemberAccountLike'
// import { StoreAdd, StoreGameList, StoreInformation } from './StoreComponent'

const MemberMenuList = () => {
  const { action } = useParams()
  console.log(action)
  let currentPage = ''
  switch (action) {
    case 'level': {
      currentPage = <MemberAccountLevel />
      break
    }
    case 'order': {
      currentPage = <MemberAccountOrder />
      break
    }
    case 'comment': {
      currentPage = <MemberAccountComment />
      break
    }
    case 'like': {
      currentPage = <MemberAccountLike />
      break
    }
    default: {
      currentPage = <MemberAccountProfile />
    }
  }
  return <>{currentPage}</>
}

export default MemberMenuList
