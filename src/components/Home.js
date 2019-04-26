import React from 'react'
import RateLimit from './RateLimit'

function Home(props) {

  return (
    <div>
      <h3>Welcome. To use this App to its fullest:</h3>

      <li>Create a personal access token on GitHub</li>
      <li>When starting up this application in the command line, type:</li>
      <pre>REACT_APP_TOKEN_GITHUB_DOT_COM=PUT_YOUR_NEW_ACCESS_TOKEN_HERE yarn start</pre>
      This will keep your GitHub API key safe but let you authenticate with GitHub


      <RateLimit />
    </div>
  )
}

export default Home