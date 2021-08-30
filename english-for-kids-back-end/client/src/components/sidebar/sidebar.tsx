import React from 'react';
import { connect } from 'react-redux';
import useActions from '../../hooks/useActions';
import { RootState } from '../../index';
import {
  OPENED, STAT, PLAY, CATEGORY,
} from '../../constants';
import { IContent } from '../../models/IContent';
import './sidebar.scss';

interface ISidebarProps {
  category?: string | null,
  mode?: string,
  content?: IContent[] | null,
  sidebar?: boolean
}

function Sidebar(props:ISidebarProps):JSX.Element {
  const {
    RenderContent, EndGame, RenderSidebar, RenderPopupLogin,
  } = useActions();
  let sidebarClassName = 'nav nav-pills flex-column sidebar';
  if (props.sidebar) { sidebarClassName = `nav nav-pills flex-column sidebar ${OPENED}`; }
  if (props.mode === PLAY) { sidebarClassName += ` ${PLAY}`; }

  const addCategories = () => {
    if (props!.content! === []) return (<h1>No server response</h1>);
    return props!.content!
      .map((item, index) => (<li className={(item.category === props.category) ? 'nav-link active' : 'nav-link' }
     onClick={() => handleNewItemClick(item.category)} key={index}>{item.category}</li>));
  };

  const handleNewItemClick = (category:string) => {
    RenderContent(category);
    EndGame();
    RenderSidebar(false);
  };

  const handleLoginClick = () => {
    RenderContent(CATEGORY);
    EndGame();
    RenderSidebar(false);
    RenderPopupLogin(true);
  };

  return (
    <ul className={sidebarClassName}>
      <li className={(props.category === CATEGORY) ? 'nav-link active' : 'nav-link'}
       onClick={() => handleNewItemClick(CATEGORY)}>Main Page</li>
      {addCategories()}
      <li className={(props.category === STAT) ? 'nav-link active' : 'nav-link'}
       onClick={() => handleNewItemClick(STAT)}>Statistic</li>
      <button type="button" className='class="btn btn-outline-primary login-btn'
       onClick={() => handleLoginClick()}>Login</button>
    </ul>
  );
}

const mapStateToProps = (state: RootState) => ({
  category: state.data.category,
  mode: state.data.mode,
  content: state.data.content,
  sidebar: state.data.sidebar,
});

export default connect(mapStateToProps, null)(Sidebar);
