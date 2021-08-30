import React from 'react';
import Switch from '../header-switch/header-switch';
import Burger from '../header-burger/header-burger';
import './header.scss';

export default function Header(): JSX.Element {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid header-container">
      <Burger></Burger>
      <Switch></Switch>
      </div>
    </header>
  );
}
