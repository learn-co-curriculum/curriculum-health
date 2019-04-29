import React from 'react'
import TrackCard from './TrackCard'

function Home({
  primaryProducts,
  productsInTrackOrder,
  repositories,
  allDataLoaded
}) {

  const mapTrackCards = () => Object.keys(primaryProducts)
    .map(track => <TrackCard name={track} productsInTrackOrder={productsInTrackOrder} repositories={repositories}/>)

  return (
    <div className="trackCardContainer">
      {mapTrackCards()}
    </div>
  )
}

export default Home