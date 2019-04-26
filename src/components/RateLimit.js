import React, {
  useState,
  useEffect
} from 'react'
import {
  GitHubClient
} from '../adapters/GitHubClient'

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = hour + ':' + min + ':' + sec + ', on ' + month + ' ' + date + ' ' + year
  return time;
}

const defaultData = {
  remaining: null,
  limit: null,
  reset: null
}

function RateLimit(props) {

  const [limitData, setLimitData] = useState(defaultData)

  useEffect(() => {
    if (limitData.remaining === null) {
      let githubCliDotCom = new GitHubClient({
        baseUri: "https://api.github.com",
        token: process.env.REACT_APP_TOKEN_GITHUB_DOT_COM
      });
      githubCliDotCom.callGitHubAPI({
          method: "GET",
          path: "/rate_limit"
        })
        .then(obj => {
          setLimitData(obj.data.rate);
        })
    }
  })

  function handleClick(event) {
    event.stopPropagation()
    setLimitData(defaultData)
  }

  return (
    <div>
      <div>You have {limitData.remaining} requests left out of {limitData.limit}</div>
      <div>Your limit resets at {timeConverter(limitData.reset)}</div>
      <button onClick={handleClick}>Refresh</button>
    </div>
  )
}

export default RateLimit
