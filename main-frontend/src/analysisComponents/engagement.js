
export default function Content(){
    return(
        <div className="container">
          <h1>Engagement Analytics</h1>
          <button className="button" id="sync"><h4>Sync social media data</h4></button>
          <button className="button" id="report"><h4>Generate full report</h4></button>
            
          <div className="flexbox">
            <div className="stats" id="likes">
              <h3>Likes</h3>
              <b id="likesCounter">0</b>
            </div>
            <div className="stats" id="shares">
              <h3>Shares</h3>
              <b id="sharesCounter">0</b>
            </div>
            <div className="stats" id="comments">
              <h3>Comments</h3>
              <b id="commentsCounter">0</b>
            </div>
            <div className="stats" id="ctr">
              <h3>Click-Through Rates</h3>
              <b id="ctrCounter">0</b>
            </div>
          </div>
            
          <div className="pattern" id="pattern1">
            <h5>Content Performance Analysis</h5>
            <canvas id="Chart1"></canvas>
          </div>
          <div className="pattern" id="pattern2">
            <h5>Likes Analysis</h5>
            <canvas id="Chart2"></canvas>
          </div>
        </div>
    )
}
