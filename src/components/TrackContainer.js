import React, {
  useState
} from 'react'
import uuidv4 from 'uuid/v4'
import RepositoryCard from './RepositoryCard'
import {
  connect
} from "react-redux";
import {
  getRepositories,
  getAllAvaiableIDBKeys,
  getAllAvaiableIDBData
} from "../actions";

const TrackContainer = ({
  name,
  productInOrder,
  repositories,
  uniqueRepoUpdateSet,
  match
}) => {

  const [sortType, setSortType] = useState('standard')

  const handleChange = event => {
    setSortType(event.target.value)
  }
  const uniqueSet = [...new Set(productInOrder)]
  const sortBy = () => {
    if (sortType === 'standard') {
      return uniqueSet
    }

    if (sortType === 'standardReverse') {
      return uniqueSet.reverse()
    }

    if (sortType === 'issue') {
      return uniqueSet
        .sort((rA, rB) => parseInt(repositories[rA].issueCount) - parseInt(repositories[rB].issueCount))
    }

    if (sortType === 'issueReverse') {
      return uniqueSet
        .sort((rA, rB) => parseInt(repositories[rA].issueCount) - parseInt(repositories[rB].issueCount))
        .reverse()
    }

    if (sortType === 'commit') {
      return uniqueSet
        .sort((rA, rB) => parseInt(repositories[rA].lastCommit) - parseInt(repositories[rB].lastCommit))
    }

    if (sortType === 'commitReverse') {
      return uniqueSet
        .sort((rA, rB) => parseInt(repositories[rA].lastCommit) - parseInt(repositories[rB].lastCommit))
        .reverse()
    }
  }

  const mapRepositories = () => sortBy()
    .map(repo => {
      repositories[repo].id = uuidv4()
      return <RepositoryCard key={repositories[repo].id} {...repositories[repo]}/>
    })

  return (
    <div className="trackContainer">
      <div className="trackNavigation">
        <h2 className="title">{name}</h2>
        <div>
          <label>
            <select value={sortType} onChange={handleChange}>
              <option value="standard">Track Order</option>
              <option value="standardReverse">Reverse Track Order</option>
              <option value="issueReverse">Most Issues</option>
              <option value="issue">Least Issues</option>
              <option value="commit">Oldest Commits</option>
              <option value="commitReverse">Newest Commits</option>
            </select>
          </label>
      </div>
      </div>
      <div className="repoContainer">
        {mapRepositories()}
      </div>
    </div>
  )
}

export default connect(state => state, {
  getRepositories,
  getAllAvaiableIDBKeys,
  getAllAvaiableIDBData
})(TrackContainer);