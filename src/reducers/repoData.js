import online from '../data/online.js'
import immersive from '../data/immersive.js'
// import old_prework from '../data/old_prework.js'
// import mod_1 from '../data/mod1.js'
// import mod_2 from '../data/mod2.js'
// import old_mod_3 from '../data/old_mod3.js'
// import new_mod_3 from '../data/new_mod3.js'
// import mod_4 from '../data/mod4.js'

const productsInTrackOrder = {
  online,
  immersive
}

const defaultState = {
  productsInTrackOrder,
  initialLoadFinished: false,
  repositories: {}
}

export default function repoData(
  state = defaultState, {
    type,
    payload
  }
) {

  switch ( type ) {
  case "SET_REPO":
    return {
      ...state,
      repositories: {
        ...state.repositories,
        [ payload.repoName ]: payload.repoObject
      }
    };
  case "SET_REPO_KEYS":
    return {
      ...state,
      repositories: payload
    };

  case "SET_LOAD_STATUS":
    return {
      ...state,
      initialLoadFinished: payload,
    }
  case "SET_EVENT_DATA":
    return {
      ...state,
      repositories: {
        ...state.repositories,
        [ payload.repoName ]: { ...state.repositories[ payload.repoName ],
          events: payload.eventData
        }
      }
    }
  default:
    return state;
  }



}
