import React from 'react'

import {
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import TrackContainer from './TrackContainer'
import Home from './Home'
import RecentEvents from './RecentEvents'

const Main = ({
  repoData,
  productsInTrackOrder,
  uniqueRepoUpdateSet,
  primaryProducts
}) => {

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" render={() => <Home productsInTrackOrder={productsInTrackOrder} primaryProducts={primaryProducts} {...repoData} />} />
        <Route path="/recent_issues" render={() => <RecentEvents primaryProducts={primaryProducts} uniqueRepoUpdateSet={uniqueRepoUpdateSet} eventType="IssuesEvent"/>}/>
        <Route path="/recent_commits" render={() => <RecentEvents primaryProducts={primaryProducts} uniqueRepoUpdateSet={uniqueRepoUpdateSet} eventType="PushEvent"/>}/>
        <Route path="/products/online" render={(props) => <TrackContainer {...props} name="online" productInOrder={productsInTrackOrder["online"]} uniqueRepoUpdateSet={uniqueRepoUpdateSet} {...repoData} />} />
        <Route path="/products/immersive" render={(props) => <TrackContainer {...props} name="immersive" productInOrder={productsInTrackOrder["immersive"]} uniqueRepoUpdateSet={uniqueRepoUpdateSet} {...repoData} />} />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  )
}

export default Main