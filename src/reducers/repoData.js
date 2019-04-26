export default function userData(
  state = {
    onlineRepositories: {}
  }, {
    type,
    payload
  }
) {

  switch ( type ) {
  case "SET_REPOS":
    return {
      ...state,
      onlineRepositories: payload
    };
  case "SET_REPO":

    return {
      ...state,
      onlineRepositories: {
        ...state.onlineRepositories,
        [ payload.repo ]: payload.object
      }
    };

  default:
    return state;
  }
}
