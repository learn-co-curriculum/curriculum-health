import React from 'react'


const TrackNavigation = ({
  products
}) => {
  const renderProductLinks = () => Object.keys(products)
    .map(product => <NavLink key={product} to={{pathname: `/products/${product}`}} className="navLink">{product}</NavLink>)

  return (<div className="navigation">
    <NavLink className="navLink" path="/recent_issues">Recent Issues</NavLink>
    <NavLink className="navLink" path="/recent_commits">Recent Commits</NavLink>
    {renderProductLinks()}
  </div>)
}

export default TrackNavigation