import React, { useState } from 'react';
import useActions from '../../hooks/useActions';
import { IDataMedia } from '../../models/IDataMedia';
import { IMG_AUDIO_PATH, PAGEN_NUMBER } from '../../constants';
import playAudio from '../../shared/playAudio';
import './admin__word.scss';

interface ownState {
  updateMode: boolean,
  newTranslation: string,
  newWord: string,
  newAudio: File | null,
  newImg: File | null,
}

function AdminWord(props:IDataMedia):JSX.Element {
  const { AdminDeleteWord, AdminUpdateWord } = useActions();
  const [ownState, setState] = useState<ownState>(
    {
      updateMode: false,
      newTranslation: '',
      newWord: '',
      newAudio: null,
      newImg: null,
    },
  );

  const handleClickBtnCancel = () => {
    setState({ ...ownState, updateMode: false });
  };

  const handleClickBtnUpdate = () => {
    const formData = new FormData();
    let changFlag = false;
    formData.append('word', props.word);
    formData.append('category', props.category);
    formData.append('number', String(PAGEN_NUMBER - 1));
    if (ownState.newAudio !== null) {
      formData.append('audio', ownState.newAudio);
      changFlag = true;
    }
    if (ownState.newImg !== null) {
      formData.append('img', ownState.newImg);
      changFlag = true;
    }
    if (ownState.newWord.trim()) {
      formData.append('newWord', ownState.newWord);
      changFlag = true;
    } else { formData.append('newWord', ''); }
    if (ownState.newTranslation.trim()) {
      formData.append('newTranslation', ownState.newTranslation);
      changFlag = true;
    } else { formData.append('newTranslation', props.translation); }
    if (changFlag) {
      AdminUpdateWord(formData);
      setState({
        ...ownState, newWord: '', newTranslation: '', updateMode: false,
      });
    } else {
      alert('You do not change anything, genius!');
    }
  };

  const handleChangeWord = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...ownState, newWord: (event.target as HTMLInputElement).value });
  };

  const handleChangeTranslation = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...ownState, newTranslation: (event.target as HTMLInputElement).value });
  };

  const handleChangeImg = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...ownState, newImg: (event.target as HTMLInputElement).files!.item(0) as File });
  };

  const handleChangeAudio = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...ownState, newAudio: (event.target as HTMLInputElement).files!.item(0) as File });
  };

  return (
<div className="card bg-light mb-3 admin_word" >
  {(ownState.updateMode)
    ? <>
    <div className="form-group word-update">
      <label className="col-form-label" htmlFor="inputWord">update word</label>
      <input type="text" className="form-control" placeholder={props.word} id="inputWord" value={
        ownState.newWord!} onChange={handleChangeWord}></input>
      <label className="col-form-label" htmlFor="inputTranslation">update translation</label>
      <input type="text" className="form-control" placeholder={props.translation} id="inputTranslation"
      value={ownState.newTranslation!} onChange={handleChangeTranslation}></input>
        <label htmlFor="newAudio" className="form-label">Sound file:</label>
        <input className="form-control" type="file" id="newAudio" onChange={handleChangeAudio}></input>
        <label htmlFor="newImg" className="form-label">Image:</label>
        <input className="form-control" type="file" id="newImg" onChange={handleChangeImg}></input>
  </div>
  <div className="word__btn-container">
    <button type="button" className="btn btn-outline-danger word__btn-cancel" onClick={
      () => handleClickBtnCancel()}>Cancel</button>
    <button type="button" className="btn btn-outline-primary word__btn-ok"
    onClick={() => handleClickBtnUpdate()}>ОК</button>
  </div>
  </>
    : <>
    <button type="button" className="btn-close btn-word-close"
    onClick={() => AdminDeleteWord(props.word, props.category, PAGEN_NUMBER - 1)}></button>
    <ul className="list-group">
      <li className="list-group-item list-group-item-action word-item"><strong>Word: </strong>{props.word}</li>
      <li className="list-group-item list-group-item-action word-item"><strong>Translation:
        </strong>{props.translation}</li>
      <li className="list-group-item list-group-item-action word-item"><span><strong>Sound file:</strong>
      </span> <div className="play__button" onClick={() => playAudio(props.audioSrc)}></div></li>
      <li className="list-group-item list-group-item-action word-item"><span><strong>Image:</strong>
      </span><div className="word__image" style={{ backgroundImage: `url(${props.image})` }}></div></li>
    </ul>
          {(ownState.updateMode) ? <button type="button" className="btn btn-outline-danger"
          onClick={() => handleClickBtnCancel()}>Cancel</button>
            : <button type="button" className="btn btn-outline-primary change-btn"
            onClick={() => setState({ ...ownState, updateMode: true })}>Change</button>}
  </>
}
</div>

  );
}

export default AdminWord;
