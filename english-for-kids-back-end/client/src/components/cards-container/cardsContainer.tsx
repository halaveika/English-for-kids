import React from 'react';
import { connect } from 'react-redux';
import Category from '../category/category';
import Card from '../Card/card';
import Scoreboard from '../scoreboard/scoreboard';
import Statistic from '../../Pages/statistic/statistic';
import { IContent } from '../../models/IContent';
import {
  PLAY, STAT, DIFFICULT_WORDS, VICTORY, DEFEAT, CATEGORY,
} from '../../constants';
import { RootState } from '../../index';
import './cardsContainer.scss';
import useActions from '../../hooks/useActions';
import { IStatWord } from '../../models/IStatWord';
import { IDataMedia } from '../../models/IDataMedia';
import playAudio from '../../shared/playAudio';
import { IGameCard } from '../../models/IGameCard';

interface ICardsContainerProps {
  category?: string | null,
  mode?: string,
  content?: IContent[] | null,
  game?: boolean,
  currentCard?: IGameCard,
  score?: boolean[],
  difficultWords?: IStatWord[]
}

const getDifficultWordsContent = (difficultWords: IStatWord[], content: IContent[])
 :IDataMedia[] => {
  const contentArr:IContent[] = content.slice(0)!;
  const wordsArr:IStatWord[] = difficultWords.slice(0);
  const result:IDataMedia[] = [];
  wordsArr!.forEach((word) => {
    const media = contentArr
      .find((item) => item.category! === word.category!)!
      .data
      .find((element) => element.word! === word.word!);
    result.push({
      word: media!.word!,
      translation: media!.translation!,
      image: media!.image!,
      audioSrc: media!.audioSrc!,
      category: word!.category!,
    });
  });
  return result!;
};

const getCurrentlyCategory = (category:string, content: IContent[]):IContent => {
  const array = content.slice(0);
  const result = array.find((cards):IContent|undefined => {
    if (cards.category === category) { return cards; } return undefined;
  });
  return result!;
};

const CardsContainer = ({
  category, mode, content, game, currentCard, score, difficultWords,
}:ICardsContainerProps):JSX.Element => {
  const { SetGame } = useActions();
  if (category === VICTORY) { return (<div className="victory-alert"><h1>Great! You have no mistakes!</h1></div>); }
  if (category === DEFEAT) {
    const failsNumber = score!.filter((element) => element === false).length;
    return (<div className="defeat-alert"><h1>{`You have ${failsNumber} mistakes :(`}</h1></div>);
  }
  if (category === STAT) {
    return (
      <div className={`container-${STAT}`}><Statistic></Statistic></div>);
  }
  if (category === CATEGORY && content !== []) {
    const currentContent = content as IContent[];
    const cardsArray = currentContent
      .map((data, index) => {
        const title = data.category;
        if (data.data.length > 0) {
          const imgSrc = data.data[0].image;
          return (<Category title={title} imgSrc={imgSrc} gameMode={mode!} key={index}></Category>);
        }
        return (<Category title={title} imgSrc={''} gameMode={mode!} key={index}></Category>);
      });
    return (
    <div className={'container cards-container'}>{cardsArray}</div>);
  }
  if (category !== CATEGORY && content !== []) {
    const gameCards:{word:string, audioSrc:string}[] = [];
    const startRepeatBtn = (
      <div className="d-grid gap-2">
        <button className={`btn btn-lg btn-outline-dark ${(game === false) ? ' start' : ' repeat'}`}
         type="button" onClick={ (game === false) ? (() => SetGame(true, gameCards))
           : (() => { playAudio(currentCard!.audioSrc); })}>{(game === false) ? 'Start Game' : ''}</button>
      </div>
    );
    let cardsArray:JSX.Element[] = [];
    if (category === DIFFICULT_WORDS) {
      cardsArray = getDifficultWordsContent(difficultWords!, content!)
        .map((item, index) => {
          gameCards.push({ word: item.word, audioSrc: item.audioSrc });
          return <Card image={item.image} word={item.word} translation={item.translation}
        audioSrc={item.audioSrc} category={item.category} mode={mode!} key={index}></Card>;
        });
    } else {
      cardsArray = getCurrentlyCategory(category!, content!).data
        .map((item, index) => {
          gameCards.push({ word: item.word, audioSrc: item.audioSrc });
          return <Card image={item.image} word={item.word} translation={item.translation}
           audioSrc={item.audioSrc} key={index} category={category!} mode={mode!}></Card>;
        });
    }
    return (
      <>{(mode === PLAY && game) ? <Scoreboard score={score}></Scoreboard> : ''}
        <div className='container cards-container'>{cardsArray}</div>
        {(mode === PLAY && cardsArray.length > 0) ? startRepeatBtn : ''}
      </>
    );
  }
  return (<div className="container"><h1>Server no response</h1></div>);
};

const mapStateToProps = (state:RootState) => ({
  category: state.data.category,
  mode: state.data.mode,
  content: state.data.content,
  game: state.game.game,
  currentCard: state.game.currentCard,
  score: state.game.score,
  difficultWords: state.stat.difficultWords,
});

export default connect(mapStateToProps, null)(CardsContainer);
