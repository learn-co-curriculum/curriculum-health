import React from 'react'
import {
  connect
} from "react-redux";
import IssueEventCard from './IssueEventCard'
import CommitEventCard from './CommitEventCard'

const RecentEvents = ({
  primaryProducts,
  eventType,
  uniqueRepoUpdateSet,
  repositories
}) => {

  const renderEvents = () => {
    return uniqueRepoUpdateSet.map(repo => (repositories[repo].events))
      .flat()
      .filter(repoEvent => repoEvent.type === eventType)
      .sort((evA, evB) => Date.parse(evA.created_at) - Date.parse(evB.created_at))
      .reverse()
      .map(event => eventType === "IssuesEvent" ? <IssueEventCard key={event.id} { ...event} /> : <CommitEventCard key={event.id} { ...event} />)
  }

  return (<React.Fragment>{renderEvents()}</React.Fragment>)
}

export default connect(({
  repoData
}) => ({
  ...repoData
}))(RecentEvents)