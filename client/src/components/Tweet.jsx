import React from 'react';

const Tweet = ({tweet, messageUser}) => (
  <div className="tweet-entry">
    <div>
      <div onClick={() => messageUser(tweet.username)}>
        <h3>{`@${tweet.username}`}</h3>
      </div>
      <p>{tweet.message}</p>
    </div>
  </div>
);

export default Tweet;