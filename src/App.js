import React, {
  useEffect
} from 'react';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import './App.css';
import Home from './components/Home'
import TrackContainer from './components/TrackContainer'
import Immersive from './components/Immersive'
import {
  connect
} from "react-redux";

import {
  getRepositories
} from "./actions";
import onlineData from './data/online.js'

const App = ({
  onlineRepositories,
  getRepositories,
  getUpdatedRepoInfo
}) => {

  useEffect(() => {
    if (Object.keys(onlineRepositories)
      .length === 0) {
      getRepositories(onlineData)
    }
  })

  let onlineInfo = ["Online Self Paced", "https://learn.co/curriculum/tracks/50152"]
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/online" render={props => <TrackContainer {...props} trackName={onlineInfo[0]} url={onlineInfo[1]} repositories={onlineRepositories} repoNameArray={onlineData}/>} />
        <Route exact path="/immersive" component={Immersive} />
      </div>
    </Router>
  );

}

const mapStateToProps = ({
  repoData
}) => (repoData);

export default connect(mapStateToProps, {
  getRepositories
})(App);