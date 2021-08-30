import React from 'react';
import {
  Link, Switch, Route, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import AdminCategory, { ACategoryProps } from '../admin__categories/admin__category';
import AdminWordsContainer from '../admin__words-container/admin_words-container';
import { RootState } from '../../index';
import { IContent } from '../../models/IContent';
import useActions from '../../hooks/useActions';
import './admin__header.scss';

export interface IAdminHeader {
  isRouteWords: boolean,
}

function AdminHeader(props:IAdminHeader):JSX.Element {
  const { Logout } = useActions();

  return (
  <header className="admin__header">
    <ol className="breadcrumb navbar">
      <li className="breadcrumb-item homeItem active" onClick={() => Logout() }>Home</li>
      <li className={`breadcrumb-item ${(props.isRouteWords) ? 'active' : ''}`}>
      {(props.isRouteWords) ? <Link to='/category'>
        Category</Link> : 'Category' }</li>
      {(props.isRouteWords) ? <li className="breadcrumb-item">Words</li> : ''}
      <button type="button" className="btn btn-primary logout" onClick={() => Logout() } >Log out</button>
    </ol>
  </header>);
}

export default AdminHeader;
