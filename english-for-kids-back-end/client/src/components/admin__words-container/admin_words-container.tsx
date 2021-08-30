import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminWord from '../admin__word/admin__word';
import { RootState } from '../../index';
import { IGetCategiesPayload } from '../../models/admin/IGetCategiesPayload';
import useActions from '../../hooks/useActions';
import useDebounce from '../../hooks/useDebounce';
import AdminHeader from '../admin__header/admin__header';
import AdminWordItemAdd from '../admin__word-item-add/admin__word-item-add';
import { PAGEN_NUMBER } from '../../constants';
import { IDataMedia } from '../../models/IDataMedia';

export interface IAdminWordC {
  words?: IDataMedia[],
  currentCategory?: string,
  isAuth?: boolean,
}

function AdminWordsContainer(props:IAdminWordC):JSX.Element {
  if (!props.isAuth) { return <Redirect to="/"/>; }
  const [size, setState] = useState(PAGEN_NUMBER - 1);
  const debouncedValue = useDebounce<number>(size, 500);
  const { AdminGetWords } = useActions();
  useEffect(() => {
    AdminGetWords(debouncedValue, props.currentCategory!);
  }, [debouncedValue]);
  const renderWords = (words: IDataMedia[]) => {
    return words!.map((element, index) => {
      return <AdminWord word={element.word} translation={element.translation}
    audioSrc={element.audioSrc} image={element.image} category={element.category} key={index}></AdminWord>;
    });
  };
  const handleScroll = () => {
    const { scrollTop } = document.documentElement;
    const windowHeight = window.innerHeight;
    const height = document.body.scrollHeight - windowHeight;
    const scrollPercentage = (scrollTop / height);
    if (scrollPercentage > 0.9) {
      const newSize = props.words!.length + PAGEN_NUMBER;
      setState(newSize);
    }
  };
  document.addEventListener('scroll', handleScroll);

  return (
    <div>
      <AdminHeader isRouteWords={true} />
    <div className="admin__category-container">
      <AdminWordItemAdd category={props.currentCategory!}/>
      {renderWords(props.words!)}
    </div>
    </div>

  );
}

const mapStateToProps = (state:RootState) => ({
  currentCategory: state.admin.currentCategory,
  words: state.admin.words,
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(AdminWordsContainer);
