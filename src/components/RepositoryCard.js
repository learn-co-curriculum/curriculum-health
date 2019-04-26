import React, {
  useState,
  useEffect
} from 'react'
import uuidv4 from 'uuid/v4'
import {
  set,
  get
} from 'idb-keyval';

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = hour + ':' + min + ', on ' + month + ' ' + date + ' ' + year
  return time;
}

function RepositoryCard(props) {
  return (
    <div>
      <h5><a href={props.url}>{props.repoName}</a></h5>
      <h6>Issues: {props.issueCount}</h6>

      <p>Last Commit: {timeConverter(props.lastCommit)}</p>
      <p className="private">{props.private ? "Private" : null}</p>
    </div>
  )
}

export default RepositoryCard