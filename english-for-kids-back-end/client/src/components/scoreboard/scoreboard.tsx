import React from 'react';
import './scoreboard.scss';

interface ScoreProps {
  score?: boolean[]
}

function Scoreboard(props: ScoreProps) {
  if (props.score !== undefined) {
    const scoreRender = props.score!
      .map((element, index) => ((element) ? (<div className="scoreboard__success-item" key={index}/>)
        : (<div className="scoreboard__fail-item" key={index}/>)));
    return (
    <div className='scoreboard'>
      {scoreRender}
    </div>);
  }
  return (
    <div className='scoreboard'>
    </div>);
}

export default Scoreboard;
