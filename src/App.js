import React, {
  useState,
  useEffect
} from 'react';
import {
  set,
  get
} from 'idb-keyval';

import {
  BrowserRouter as Router,
  NavLink
} from "react-router-dom";
import {
  GitHubClient
} from './adapters/GitHubClient'

import './App.css';
import plus from './assets/plus.png'


import Main from './components/Main'
import TotalIssues from './components/TotalIssues'
import Loading from './components/Loading'
import Navigation from './components/Navigation'

import RateLimit from './components/RateLimit'


import {
  connect
} from "react-redux";
import {
  getRepositories,
  forceRefresh,
  getRepoEventData,
  finishLoading,
  getAllAvaiableIDBKeys,
  getAllAvaiableIDBData
} from "./actions";

//import additional tracks here from data folder
//import in reducers/repoData.js as well!
import online from './data/online.js'
import immersive from './data/immersive.js'
// import old_prework from './data/old_prework.js'
// import mod_1 from './data/mod1.js'
// import mod_2 from './data/mod2.js'
// import old_mod_3 from './data/old_mod3.js'
// import new_mod_3 from './data/new_mod3.js'
// import mod_4 from './data/mod4.js'


const githubCliDotCom = new GitHubClient({
  baseUri: "https://api.github.com",
  token: process.env.REACT_APP_TOKEN_GITHUB_DOT_COM
});

//add tracks to auto refresh daily on app load
const primaryProducts = {
  online,
  immersive
}

// const allProducts = {
//   online,
//   immersive,
//   old_prework,
//   mod_1,
//   mod_2,
//   old_mod_3,
//   new_mod_3,
//   mod_4
// }

//stops duplicate remote async requests
const uniqueRepoUpdateSet = [...new Set(Object.keys(primaryProducts)
  .map(key => primaryProducts[key])
  .flat())]

const today = new Date()
  .toDateString()

const App = ({
  repoData,
  getRepositories,
  forceRefresh,
  getRepoEventData,
  getAllAvaiableIDBKeys,
  getAllAvaiableIDBData
}) => {

  //for handling IDB, GitHub load cycle
  const [initialLoad, setInitialLoad] = useState(true)
  const [updatesNotChecked, setUpdatesNotChecked] = useState(true)
  const [rateInfo, setGitHubRateLimitInfo] = useState({})
  const [allDataLoaded, setDataLoadedFlag] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()


    // initial redux store and IDB handling
    if (repoData && initialLoad) {
      // first, gets all keys present in browser's IDB
      if (!Object.keys(repoData.repositories) || Object.keys(repoData.repositories)
        .length === 0) {
        getAllAvaiableIDBKeys()
      }

      // second, uses these keys to get data from IDB
      if (Object.keys(repoData.repositories)
        .some(key => repoData.repositories[key].lastUpdate === '')) {
        getAllAvaiableIDBData(Object.keys(repoData.repositories))
        setInitialLoad(false)
      }
    }

    //third, once all IDB keys are fully loaded into the redux store
    //checks repo data for stale info and updates IDB and store accordingly
    //triggers state change so this conditional should only fire once, but redux async will keep working
    if (!initialLoad && updatesNotChecked && Object.keys(repoData.repositories)
      .every(key => repoData.repositories[key].lastUpdate !== '')) {
      getRepositories(repoData.repositories, uniqueRepoUpdateSet)
      setUpdatesNotChecked(false)

      githubCliDotCom.callGitHubAPI({
          method: "GET",
          path: `/rate_limit`
        })
        .then(rateInfo => {
          setGitHubRateLimitInfo({
            remaining: rateInfo.data.rate.remaining,
            limit: rateInfo.data.rate.limit,
            reset: rateInfo.data.rate.reset
          })
        })

    }

    if (!initialLoad && !updatesNotChecked && !allDataLoaded && uniqueRepoUpdateSet.every(repo => repoData.repositories[repo].lastUpdate.toDateString() === today)) {

      if (get('lastUpdate')
        .then(value => {
          if (value !== today) {
            getRepoEventData(repoData.repositories, uniqueRepoUpdateSet)
            set('lastUpdate', today)
          }
        }))
        setDataLoadedFlag(true)
    }



    return function cleanup() {
      abortController.abort()
    }
  }, [repoData, initialLoad, updatesNotChecked, getRepoEventData, getAllAvaiableIDBKeys, getAllAvaiableIDBData, getRepositories, allDataLoaded])

  // const renderRefresh = () => allDataLoaded ? <button className="refresh clearDefault" onClick={handleRefresh}><img src={refresh_green} alt="refresh primary product info"/></button> : <Loading />
  return (
    <Router>
      <div>
        <header>
            {allDataLoaded ? <TotalIssues key="1" repoObjects={repoData.repositories} uniqueRepoSet={uniqueRepoUpdateSet} /> : <Loading />}
            <div className="header">
              <div><NavLink className="logo" to="/">Curriculum Health Monitor</NavLink></div>
              <img src={plus} alt="plus_sign"/>
            </div>
            {allDataLoaded ? <RateLimit {...rateInfo} /> : <Loading /> }
        </header>
        <Navigation products={primaryProducts}/>
        <main>
          {allDataLoaded ? <Main productsInTrackOrder={repoData.productsInTrackOrder} primaryProducts={primaryProducts} uniqueRepoUpdateSet={uniqueRepoUpdateSet} repoData={repoData}/> : null}
        </main>
      </div>
    </Router>
  );
}

export default connect(state => state, {
  getRepositories,
  forceRefresh,
  getRepoEventData,
  getAllAvaiableIDBKeys,
  getAllAvaiableIDBData,
  finishLoading
})(App);