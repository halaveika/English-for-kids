import React from 'react';
import { connect } from 'react-redux';
import useActions from '../../hooks/useActions';
import { RootState } from '../../index';
import { CHECKED } from '../../constants';
import './header-burger.scss';

export interface IBurgerProps {
  sidebar?: boolean
}

function Burger(props:IBurgerProps):JSX.Element {
  const { RenderSidebar } = useActions();

  const sidebarOpenListener = (event: Event): void => {
    const currentElement = event.target as HTMLElement;
    if (props.sidebar && !currentElement.classList.contains('sidebar')
     && !currentElement.classList.contains('nav-link')
      && !currentElement.classList.contains('header-burger')) {
      RenderSidebar(!props.sidebar);
    }
  };

  if (props.sidebar) {
    window.addEventListener(
      'click',
      sidebarOpenListener, true,
    );
  }

  let navClassName = 'header-burger ';
  if (props.sidebar) { navClassName = `header-burger ${CHECKED}`; }
  return (
    <nav className={navClassName} onClick={() => RenderSidebar(!props.sidebar)}>
      <span></span>
      <span></span>
      <span></span>
    </nav>);
}

const mapStateToProps = (state: RootState) => ({
  sidebar: state.data.sidebar,
});

export default connect(mapStateToProps, null)(Burger);
