import React from 'react'

const IssueEventCard = (props) => {

  // const renderName = () => repo.name
  //   .replace('learn-co-curriculum/', '')
  //   .replace(/(-|_)/g, ' ')
  debugger
  return (
    <div className="eventCard">
      <div className="eventType">{props.type} - {props.actor.login}</div>
      <small>{timeConverter(Date.parse(props.created_at))}</small>
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