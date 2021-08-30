import React from 'react';
import useActions from '../../hooks/useActions';
import { TRAIN, PLAY } from '../../constants';
import './header-switch.scss';

function Switch():JSX.Element {
  const { SwitchGameMode, EndGame } = useActions();

  const SwitchGameModeAndEndGame = () => {
    SwitchGameMode(TRAIN);
    EndGame();
  };

  return (
      <div className="form-check form-switch header__switch">
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(event) => {
          if (event.target.checked) { return SwitchGameMode(PLAY); }
          return SwitchGameModeAndEndGame();
        }}></input>
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          <i></i>
        </label>
      </div>

  );
}

export default Switch;
