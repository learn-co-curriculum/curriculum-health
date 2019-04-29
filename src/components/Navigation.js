import React from 'react'
import {
  NavLink
} from "react-router-dom";

const Navigation = ({
  products
}) => {
  const renderProductLinks = () => Object.keys(products)
    .map(product => <NavLink key={product} to={{pathname: `/products/${product}`}} className="navLink">{product.replace(/_/g,' ')}</NavLink>)

  return (<div className="navigation">
    <NavLink className="navLink" to="/recent_issues">Recent Issues</NavLink>
    <NavLink className="navLink" to="/recent_commits">Recent Commits</NavLink>
    {renderProductLinks()}
  </div>)
}

export default Navigation