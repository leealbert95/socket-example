import React from 'react';

import Tweet from './Tweet.jsx';

const TweetFeed = ({tweets, messageUser}) => (
  <div id="feed" className="tweet-feed">
    {tweets.reduceRight((arr, tweet, index) => 
      arr.concat(<Tweet key={index} tweet={tweet} messageUser={messageUser}/>)
    , [])}
  </div>
);
  
export default TweetFeed;