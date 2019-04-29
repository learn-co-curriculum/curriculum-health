import React from 'react'
import EventCard from './EventCard'
import IssueEventCard from './IssueEventCard'

function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let time = hour + ':' + min + ' on ' + month + ' ' + date + ' ' + year
  return time;
}

const RepositoryCard = (props) => {

  const renderEvents = () => props ? props.events.map(event => event.type === "IssuesEvent" ? <IssueEventCard key={event.id} { ...event} /> : <EventCard key={event.id} {...event} />) : null
  const calculateRecentIssues = () => props ? props.events.filter(event => event.type === "IssuesEvent")
    .length : null
  const calculateRecentPRs = () => props ? props.events.filter(event => event.type === "PullRequestEvent")
    .length : null

  const renderName = () => props.repoName
    .replace('learn-co-curriculum/', '')
    .replace(/(-|_)/g, ' ')

  return (
    <div className="repoCard">
      <a className="title" href={props.url}><h4>{renderName(props.repoName)}</h4></a>
      <div className="repoTotals">
        <span><h2>{props.issueCount}</h2><div>Total Issues and PRs</div></span>
        <span><h2>{calculateRecentIssues()}</h2><div>Recent Issues</div></span>
        <span><h2>{calculateRecentPRs()}</h2><div>Recent PRs</div></span>
      </div>
      <small>Last Commit: {timeConverter(props.lastCommit)}</small>
      <div className="repoEvents">
        {renderEvents()}
      </div>


      <div>{props.private ? "Private" : null}</div>
    </div>
  )
}

export default RepositoryCard