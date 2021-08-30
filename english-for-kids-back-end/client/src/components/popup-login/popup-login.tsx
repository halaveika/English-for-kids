import React, { useState } from 'react';
import { connect } from 'react-redux';
import useActions from '../../hooks/useActions';
import './popup-login.scss';
import { RootState } from '../../index';

interface StateProps{
  isAuth?: boolean
}

function PopupLogin(props: StateProps) {
  const [login, setlogin] = useState('');
  const [password, setPassword] = useState('');
  const { RenderPopupLogin, Login } = useActions();
  return (
    <div className="modal modal-login">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Login</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
            onClick={() => RenderPopupLogin(false)}>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div className="modal-body">
          <input className="input-login" type="text" placeholder="login" value={login}
           onChange={(event) => setlogin(event.target.value)}></input>
          <input className="input-password" type="text" placeholder="password" value={password}
           onChange={(event) => setPassword(event.target.value)}></input>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={() => Login({ login, password })}>Login</button>
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
            onClick={() => RenderPopupLogin(false)}>Close</button>
        </div>
      </div>
    </div>
  </div>

  );
}

const mapStateToProps = (state:RootState) => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(PopupLogin);
