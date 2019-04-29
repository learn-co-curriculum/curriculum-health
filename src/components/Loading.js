import React from 'react'
import refresh from '../assets/refresh.png'

const Loading = () => {
  return <div className="loadingContainer"><div><img className="loading" src={refresh} alt="loading animation"/></div></div>
}

export default Loading