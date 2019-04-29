import {
  set,
  get,
  keys
} from 'idb-keyval';
import uuidv4 from 'uuid/v4'
import {
  GitHubClient
} from '../adapters/GitHubClient'

const defaultRepoObject = {
  id: '',
  repoName: '',
  url: '',
  lastAuthor: '',
  events: [],
  forks: '',
  lastCommit: '',
  issueCount: 0,
  language: '',
  lastUpdate: '',
  private: false,
  loading: true
}

function getRepoData( repo ) {
  let githubCliDotCom = new GitHubClient( {
    baseUri: "https://api.github.com",
    token: process.env.REACT_APP_TOKEN_GITHUB_DOT_COM
  } );

  return githubCliDotCom.callGitHubAPI( {
    method: "GET",
    path: `/repos/learn-co-curriculum/${repo}`
  } )
}

function getEventData( repo ) {
  let githubCliDotCom = new GitHubClient( {
    baseUri: "https://api.github.com",
    token: process.env.REACT_APP_TOKEN_GITHUB_DOT_COM
  } );

  return githubCliDotCom.callGitHubAPI( {
    method: "GET",
    path: `/repos/learn-co-curriculum/${repo}/events`
  } )
}

export function getAllAvaiableIDBKeys() {
  return dispatch => {
    keys()
      .then( keys => {
        const repositories = {}
        keys.forEach( key => {
          repositories[ key ] = {
            ...defaultRepoObject,
            id: uuidv4()
          }
        } )

        dispatch( {
          type: "SET_REPO_KEYS",
          payload: repositories
        } )
      } )
  }
}

export function finishLoading() {
  return dispatch => {
    dispatch( {
      type: "SET_LOAD_STATUS",
      payload: true
    } )
  }
}

export function getAllAvaiableIDBData( existingKeys ) {
  return dispatch => {
    existingKeys.forEach( key => {
      get( key )
        .then( repoObject => {
          dispatch( {
            type: "SET_REPO",
            payload: {
              repoName: key,
              repoObject: repoObject
            }
          } )
        } )
    } )

  }
}

export function forceRefresh( repos ) {
  let date = new Date()

  date.setDate( date.getDate() - 1 );
  return dispatch => {
    Object.keys( repos )
      .forEach( repo => {

        let newRepoObject = {
          ...repos[ repo ],
          lastUpdate: date
        }

        dispatch( {
          type: "SET_REPO",
          payload: {
            repoName: repo,
            repoObject: newRepoObject
          }
        } )
      } )
  }
}

export function getRepoEventData( existingRepositories, reposToCheck ) {
  return dispatch => {
    reposToCheck.forEach( repo => {

      getEventData( repo )
        .then( events => {

          let newObject = {
            ...existingRepositories[ repo ],
            events: events.data
          }

          dispatch( {
            type: "SET_EVENT_DATA",
            payload: {
              repoName: repo,
              eventData: events.data
            }
          } )
          set( repo, newObject )
        } )
    } )
  }
}

export function getRepositories( existingRepositories, reposToCheck ) {
  let today = new Date()
    .toDateString()
  return dispatch => {
    reposToCheck.forEach( repo => {
      if ( !existingRepositories[ repo ] ) {
        getRepoData( repo )
          .then( newRepoInfo => {
            // merge new info from git with existing repoObject
            let newRepoObject = {
              ...defaultRepoObject,
              repoName: repo,
              url: newRepoInfo.data.html_url,
              lastCommit: Date.parse( newRepoInfo.data.updated_at ),
              issueCount: newRepoInfo.data.open_issues,
              language: newRepoInfo.data.language,
              private: newRepoInfo.data.private,
              loading: false,
              lastUpdate: new Date()
            }
            newRepoObject.id = uuidv4()

            //update IDB with new info
            set( repo, newRepoObject )

            dispatch( {
              type: "SET_REPO",
              payload: {
                repoName: repo,
                repoObject: newRepoObject
              }
            } )
          } )

      } else if ( existingRepositories[ repo ].lastUpdate.toDateString() !== today ) {
        getRepoData( repo )
          .then( newRepoInfo => {
            // merge new info from git with existing repoObject
            let newRepoObject = {
              ...existingRepositories[ repo ],
              repoName: repo,
              url: newRepoInfo.data.html_url,
              lastCommit: Date.parse( newRepoInfo.data.updated_at ),
              issueCount: newRepoInfo.data.open_issues,
              language: newRepoInfo.data.language,
              private: newRepoInfo.data.private,
              loading: false,
              lastUpdate: new Date()
            }
            newRepoObject.id = uuidv4()

            //update IDB with new info
            set( repo, newRepoObject )

            dispatch( {
              type: "SET_REPO",
              payload: {
                repoName: repo,
                repoObject: newRepoObject
              }
            } )
          } )
      } else {
        //repos end up here if they're in the store and their lastUpdate property
        //shows the repo data was updated today
      }
    } )

  }
}
