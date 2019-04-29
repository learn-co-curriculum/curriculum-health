import React from 'react'

const timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = hour + ':' + min + ':' + sec + ', on ' + month + ' ' + date + ' ' + year
  return time;
}

const RateLimit = ({
  remaining,
  limit,
  reset
}) => {

  return (
    <span>
      <small>You have {remaining} GitHub API requests remaining out of a {limit} limit. Your limit will reset at {timeConverter(reset)}</small>
    </span>
  )
}

export default RateLimit