import React from 'react'
import uuidv4 from 'uuid/v4'
const CommitEventCard = ({
  repo,
  payload,
  actor,
  created_at
}) => {

  const mapCommits = () => payload.commits.map(commit => <li className="commitMessage" key={uuidv4()}>{commit.message}</li>)

  const renderName = () => repo.name
    .replace('learn-co-curriculum/', '')
    .replace(/(-|_)/g, ' ')

  return (
    <div className="eventCard">
      <a className="repoLink" href={"https://github.com/"+repo.name}>
        <h4 className="title" >{renderName()}</h4>
      </a>
      <h6 className="author">{actor.login} - {timeConverter(Date.parse(created_at))}</h6>
      <ul>
        {mapCommits()}
      </ul>

    </div>
  )
}

export default CommitEventCard

const timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var time = hour + ':' + min + ' on ' + month + ' ' + date + ', ' + year
  return time;
}