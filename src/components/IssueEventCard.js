import React from 'react'

const IssueEventCard = ({
  repo,
  payload,
  created_at
}) => {

  const renderName = () => repo.name
    .replace('learn-co-curriculum/', '')
    .replace(/(-|_)/g, ' ')


  return (
    <div className="eventCard">
      <a className="repoLink" href={"https://github.com/"+repo.name}>
        <h4 className="title" >{renderName()}</h4>
      </a>
      <h4 className="issueTitle">{payload.issue.title}</h4>
      <p>{payload.issue.body}</p>
      <small>{timeConverter(Date.parse(created_at))}</small>
    </div>
  )
}

export default IssueEventCard


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