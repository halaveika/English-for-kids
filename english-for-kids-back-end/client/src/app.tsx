import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useActions from './hooks/useActions';
import { RootState } from './index';
import { IStatWord } from './models/IStatWord';
import Header from './components/header/header';
import Footer from './components/Footer/footer';
import PopupLogin from './components/popup-login/popup-login';
import CardsContainer from './components/cards-container/cardsContainer';
import Sidebar from './components/sidebar/sidebar';

export interface IAppProps {
  popupLogin?: boolean,
  statistic?: IStatWord[],
  isAuth?: boolean,
  user?: string
}

function App(props:IAppProps):JSX.Element {
  const { FetchContent, FetchStat, Auth } = useActions();
  useEffect(() => {
    FetchContent();
  }, []);
  useEffect(() => {
    FetchStat();
  }, []);
  useEffect(() => {
    Auth(props.user!);
  }, []);
  const cardContainer = <CardsContainer></CardsContainer>;
  return (
    <div className="app-container">
      <Header></Header>
      {cardContainer}
      <Sidebar></Sidebar>
      {(props.popupLogin) ? <PopupLogin></PopupLogin> : ''}
      <Footer></Footer>
    </div>
  );
}

const mapStateToProps = (state:RootState) => ({
  popupLogin: state.data.popupLogin,
  statistic: state.stat.statistic,
  isAuth: state.user.isAuth,
  user: state.user.userId,
});

export default connect(mapStateToProps, null)(App);
