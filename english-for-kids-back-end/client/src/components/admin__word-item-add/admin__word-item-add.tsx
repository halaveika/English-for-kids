import React, { useState } from 'react';
import './admin__word-item-add.scss';
import useActions from '../../hooks/useActions';
import { PAGEN_NUMBER } from '../../constants';

interface ownState {
  addMode: boolean,
  newTranslation: string,
  newWord: string,
  newAudio: File,
  newImg: File,
}

interface ownProps {
  category: string,
}

function AdminWordItemAdd(props: ownProps):JSX.Element {
  const [ownState, setState] = useState(
    {
      addMode: false,
      newTranslation: '',
      newWord: '',
      newAudio: {},
      newImg: {},
    },
  );
  const { AdminPostWord } = useActions();

  const handleClickBtnCancel = () => {
    setState({ ...ownState, addMode: false });
  };

  const handleClickBtnCreate = () => {
    if (ownState.newTranslation.trim()
      && ownState.newWord.trim()
      && (ownState.newAudio instanceof File)
      && (ownState.newImg instanceof File)) {
      const formData = new FormData();
      formData.append('word', ownState.newWord);
      formData.append('category', props.category);
      formData.append('translation', ownState.newTranslation);
      formData.append('img', ownState.newImg as Blob);
      formData.append('audio', ownState.newAudio as Blob);
      formData.append('number', String(PAGEN_NUMBER - 1));
      AdminPostWord(formData);
      setState({
        ...ownState, newWord: '', newTranslation: '', addMode: false,
      });
    } else {
      alert('Add more Data!!!');
    }
  };

  const handleAddWord = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...ownState, newWord: (event.target as HTMLInputElement).value });
  };

  const handleAddTranslation = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...ownState, newTranslation: (event.target as HTMLInputElement).value });
  };

  const handleAddImg = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...ownState, newImg: (event.target as HTMLInputElement).files!.item(0) as File });
  };

  const handleAddAudio = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...ownState, newAudio: (event.target as HTMLInputElement).files!.item(0) as File });
  };

  return (

<div className="card bg-light mb-3 acategory__add-item" >
  {(ownState.addMode)
    ? <div className="form-group word-update">
        <label className="col-form-label" htmlFor="inputWord">add word</label>
        <input type="text" className="form-control" id="inputWord" value={ownState.newWord!}
        onChange={handleAddWord}></input>
        <label className="col-form-label" htmlFor="inputTranslation">add translation</label>
        <input type="text" className="form-control" id="inputTranslation"
        value={ownState.newTranslation!} onChange={handleAddTranslation}></input>
          <label htmlFor="newAudio" className="form-label">Sound file:</label>
          <input className="form-control" type="file" id="newAudio" onChange={handleAddAudio}></input>
          <label htmlFor="newImg" className="form-label" >Image:</label>
          <input className="form-control" type="file" id="newImg" onChange={handleAddImg}></input>
    </div> : ''
  }
  <h3 className={`add-item-title ${(ownState.addMode) ? 'hidden' : ''}`}>Creat new Word</h3>
  <div className={`add-item ${(ownState.addMode) ? 'hidden' : ''}`} onClick={
    () => setState({ ...ownState, addMode: true })}></div>
  <div className={`add-item__btn-container ${(ownState.addMode) ? '' : 'hidden'}`}>
    <button type="button" className="btn btn-outline-danger" onClick={() => handleClickBtnCancel()}>Cancel</button>
    <button type="button" className="btn btn-outline-primary" onClick={() => handleClickBtnCreate()}>Create</button>
  </div>
</div>

  );
}

export default AdminWordItemAdd;
