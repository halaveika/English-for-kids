import React from 'react';
import useActions from '../../hooks/useActions';
import { ICategoriesProp } from '../../models/ICategoriesProp';
import { PLAY } from '../../constants';
import './category.scss';

function Category(props:ICategoriesProp): JSX.Element {
  const { RenderContent } = useActions();
  let gameModeClass = 'card mb-3 category';
  if (props.gameMode === PLAY) { gameModeClass += ` ${PLAY}`; }
  return (
  <div className={gameModeClass} onClick={() => RenderContent(props.title)}>
    <img className="d-block category__image" src={props.imgSrc} alt={props.title} ></img>
    {props.title}
  </div>);
}

export default Category;
