import React, { useState } from 'react';
import { connect } from 'react-redux';
import playAudio from '../../shared/playAudio';
import {
  TRAIN, VICTORY, DEFEAT, CATEGORY, PLAY,
} from '../../constants';
import { IGameCard } from '../../models/IGameCard';
import useActions from '../../hooks/useActions';
import { RootState } from '../../index';
import { IStatWord } from '../../models/IStatWord';
import './card.scss';
import delay from '../../shared/delay';

interface CardProps {
  word: string,
  translation: string,
  image: string,
  audioSrc: string,
  category: string,
  mode: string,
  game?: boolean,
  currentCard?: IGameCard,
  gameCards?: IGameCard[],
  score?: boolean[],
  statistic?: IStatWord[]
}

interface OwnProps {
  word: string,
  translation: string,
  image: string,
  audioSrc: string,
  category: string,
  mode: string,
}

function Card(props:CardProps):JSX.Element {
  const [ownState, setState] = useState(
    {
      flipped: false,
      disabled: false,
    },
  );
  if (ownState.disabled === true && props.mode === TRAIN) {
    setState({ ...ownState, disabled: false });
  }
  const {
    SetGame, EndGame, RenderContent, UpdateTrainStat, UpdateFailStat,
    UpdateSuccessStat, SetGameScore,
  } = useActions();

  const handleClickBtn = () => {
    setState({ ...ownState, flipped: true });
    UpdateTrainStat(props.word, props.category);
    flippedListener();
  };

  const flippedListener = () => {
    window.addEventListener(
      'mouseover',
      (event: Event): void => {
        const currentElement = event.target as HTMLElement;
        if (!currentElement.classList.contains('back')) {
          setState({ ...ownState, flipped: false });
        }
      }, true,
    );
  };

  const handlePlayAudio = async () => {
    if (!props.game && props.mode !== PLAY) {
      UpdateTrainStat(props.word, props.category);
      playAudio(props.audioSrc);
    }
  };

  const gameTryCard = ():boolean => {
    if (props.game && !ownState.disabled) {
      if (props.word === props.currentCard!.word) {
        SetGameScore(true);
        UpdateSuccessStat(props.word, props.category);
        playAudio('./successSound.mp3');
        const newGameCards = props.gameCards!
          .filter((card):IGameCard|boolean => {
            if (card.word !== props.word) { return card; }
            return false;
          });
        setState({ ...ownState, disabled: true });
        if (newGameCards.length === 0) {
          setState({ ...ownState, disabled: false });
          gameOver();
          return true;
        }
        SetGame(true, newGameCards);
        return true;
      }
      SetGameScore(false);
      UpdateFailStat(props.word, props.category);
      playAudio('./failSound.wav');
      return false;
    }
    return false;
  };

  const gameOver = () => {
    const score = props.score!.findIndex((element) => element === false);
    if (score < 0) {
      playAudio('./victory.mp3');
      RenderContent(VICTORY);
    } else { playAudio('./defeat.mp3'); RenderContent(DEFEAT); }
    delay(3000).then(() => {
      EndGame();
      RenderContent(CATEGORY);
    });
  };

  return (
        <div className={`card text-white mb-3 card-custom ${(ownState.disabled) ? 'disabled' : ''}
         ${(ownState.flipped) ? 'flipped' : ''}`} onClick={() => gameTryCard()}>
          <div onClick={handlePlayAudio} className="front" style={{ backgroundImage: `url(${props.image})` }}>
          {(props.mode === TRAIN) ? <div className="card-header">{props.word}</div> : ''}
          </div>
          {(props.mode === TRAIN)
            ? <>
              <div className="back" style={{ backgroundImage: `url(${props.image})` }}>
              <div className="card-header">{props.translation}</div>
              </div>
              <div className="flip-btn" onClick={handleClickBtn}></div>
            </>
            : ''}
        </div>
  );
}

const mapStateToProps = (state:RootState, ownProps: OwnProps) => ({
  word: ownProps.word,
  translation: ownProps.translation,
  image: ownProps.image,
  audioSrc: ownProps.audioSrc,
  category: ownProps.category,
  mode: ownProps.mode,
  game: state.game.game,
  currentCard: state.game.currentCard,
  gameCards: state.game.cards,
  score: state.game.score,
  statistic: state.stat.statistic,
});

export default connect(mapStateToProps, null)(Card);
