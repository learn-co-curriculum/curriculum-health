import React, {
  useState,
  useEffect
} from 'react'

import RepositoryCard from './RepositoryCard'

const defaultSortTypes = [
  'standard',
  'standardReverse',
  'issue',
  'issueReverse',
  'commit',
  'commitReverse'
]

const TrackContainer = ({
  trackName,
  url,
  repositories,
  repoNameArray
}) => {

  const [sortType, setSortType] = useState('issueReverse')

  const mapRepositories = () => {
    const uniqueRepos = [...new Set(repoNameArray)];
    if (Object.keys(repositories)
      .length === uniqueRepos.length) {
      if (sortType === 'standard') {
        return repoNameArray.map(repo => <RepositoryCard key={repositories[repo].id} {...repositories[repo]}/>)
      }

      if (sortType === 'standardReverse') {
        return repoNameArray.reverse()
          .map(repo => <RepositoryCard key={repositories[repo].id} {...repositories[repo]}/>)
      }

      if (sortType === 'issue') {
        return Object.keys(repositories)
          .sort((rA, rB) => parseInt(repositories[rA].issueCount) - parseInt(repositories[rB].issueCount))
          .map(repo => <RepositoryCard key={repositories[repo].id} {...repositories[repo]}/>)
      }

      if (sortType === 'issueReverse') {
        return Object.keys(repositories)
          .sort((rA, rB) => parseInt(repositories[rA].issueCount) - parseInt(repositories[rB].issueCount))
          .reverse()
          .map(repo => <RepositoryCard key={repositories[repo].id} {...repositories[repo]}/>)
      }

      return repoNameArray.map(repo => <RepositoryCard key={repositories[repo].id} {...repositories[repo]}/>)
    } else {
      return <div>Loading... </div>
    }

  }


  return (<div>
    <h1><a href={url}>{trackName}</a></h1>
    <div className="trackContainer">
    {mapRepositories()}
    </div>
    </div>)
}

export default TrackContainer