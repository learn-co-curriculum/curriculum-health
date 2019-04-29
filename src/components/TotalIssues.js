import React from 'react'

const TotalIssues = ({
  repoObjects,
  uniqueRepoSet
}) => {

  const totalIssues = () => (repoObjects) ? uniqueRepoSet.map(repo => parseInt(repoObjects[repo].issueCount))
    .reduce((acc, cur) => acc + cur) : null

  return (
    <div className="issues">
        <h2>{totalIssues()}</h2>
        <div>Total Issues and PRs</div>
    </div>
  )
}

export default TotalIssues