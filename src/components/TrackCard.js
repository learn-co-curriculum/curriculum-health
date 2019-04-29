import React from 'react'
import {
  NavLink
} from "react-router-dom";

import TotalIssues from './TotalIssues'

const TrackCard = ({
  name,
  productsInTrackOrder,
  repositories
}) => {
  console.log(name);
  return (
    <div className='trackCard'>
    <NavLink  key={name} to={{pathname: `/products/${name}`}}>
      <h2>{name}</h2>
        <div className="totalIssues">
        <TotalIssues key={name} repoObjects={repositories} uniqueRepoSet={[...new Set(productsInTrackOrder[name])]}/>
       </div>
    </NavLink>
    </div>
  )
}

export default TrackCard