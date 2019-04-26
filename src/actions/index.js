import {
  set,
  get
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

export function getRepositories( arrayOfRepositories ) {
  return dispatch => {
    let today = new Date()
    arrayOfRepositories.forEach( repo => {
      get( repo )
        .then( repoObject => {
          if ( repoObject && repoObject.lastUpdate && repoObject.lastUpdate.toLocaleDateString( 'en-US' ) === today.toLocaleDateString( 'en-US' ) ) {
            let newRepoObject = {
              ...repoObject,
              loading: false
            }
            newRepoObject.id = uuidv4()
            dispatch( {
              type: "SET_REPO",
              payload: {
                repo,
                object: repoObject
              }
            } )
          } else if ( repoObject ) {
            getRepoData( repo )
              .then( newRepoInfo => {
                let newRepoObject = {
                  ...defaultRepoObject,
                  ...repoObject,
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
                set( repo, newRepoObject )
                dispatch( {
                  type: "SET_REPO",
                  payload: {
                    repo,
                    object: newRepoObject
                  }
                } )

              } )
          } else {
            getRepoData( repo )
              .then( newRepoInfo => {
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
                set( repo, newRepoObject )
                dispatch( {
                  type: "SET_REPO",
                  payload: {
                    repo,
                    object: newRepoObject
                  }
                } )
              } )
          }
        } )
    } )
  }
}
