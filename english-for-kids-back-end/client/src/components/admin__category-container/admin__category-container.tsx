import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminCategory, { ACategoryProps } from '../admin__categories/admin__category';
import { RootState } from '../../index';
import { IGetCategiesPayload } from '../../models/admin/IGetCategiesPayload';
import useActions from '../../hooks/useActions';
import useDebounce from '../../hooks/useDebounce';
import './admin__category-container.scss';
import AdminHeader from '../admin__header/admin__header';
import AdminCategoryItemAdd from '../admin__category-itemAdd/admin__category-itemAdd';
import { PAGEN_NUMBER } from '../../constants';

export interface IAdminCategoryC {
  categories?: IGetCategiesPayload[],
  isAuth?: boolean
}

function AdminCategoryContainer(props:IAdminCategoryC):JSX.Element {
  if (!props.isAuth) { return <Redirect to="/"/>; }
  const [size, setState] = useState(PAGEN_NUMBER - 1);
  const debouncedValue = useDebounce<number>(size, 500);
  const { AdminGetCategories } = useActions();
  useEffect(() => {
    AdminGetCategories(debouncedValue);
  }, [debouncedValue]);
  const renderCategory = (categories: IGetCategiesPayload[]) => {
    return categories!.map((element, index) => {
      return <AdminCategory category={element.category}
    wordsNumber={element.wordsNumber} key={index}></AdminCategory>;
    });
  };
  const handleScroll = () => {
    const { scrollTop } = document.documentElement;
    const windowHeight = window.innerHeight;
    const height = document.body.scrollHeight - windowHeight;
    const scrollPercentage = (scrollTop / height);
    if (scrollPercentage > 0.9) {
      const newSize = props.categories!.length + PAGEN_NUMBER;
      setState(newSize);
    }
  };
  document.addEventListener('scroll', handleScroll);

  return (
    <div>
      <AdminHeader isRouteWords={false} />
    <div className="admin__category-container">
      <AdminCategoryItemAdd/>
      {renderCategory(props.categories!)}
    </div>
    </div>

  );
}

const mapStateToProps = (state:RootState) => ({
  categories: state.admin.categories,
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(AdminCategoryContainer);
