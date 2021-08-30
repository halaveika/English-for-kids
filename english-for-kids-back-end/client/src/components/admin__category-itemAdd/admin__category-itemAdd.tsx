import React, { useState } from 'react';
import './admin__category-item-add.scss';
import useActions from '../../hooks/useActions';

interface owmState {
  addMode: boolean,
  newCategory: string,
}

function AdminItemAdd():JSX.Element {
  const [ownState, setState] = useState(
    {
      addMode: false,
      newCategory: '',
    },
  );
  const { AdminPostCategory } = useActions();
  const handleClickBtnCancel = () => {
    setState({ ...ownState, addMode: false, newCategory: '' });
  };

  const handleClickBtnCreate = () => {
    if (ownState.newCategory.trim()) {
      AdminPostCategory(ownState.newCategory);
      setState({ ...ownState, addMode: false, newCategory: '' });
    } else { alert('Add category name, genius!'); }
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...ownState, newCategory: (event.target as HTMLInputElement).value });
  };

  return (
<div className="card bg-light mb-3 acategory__add-item" >
  <h3 className={`add-item-title ${(ownState.addMode) ? 'hidden' : ''}`}>Creat new Category</h3>
  <div className={`form-group ${(ownState.addMode) ? '' : 'hidden'}`}>
    <label className="col-form-label mt-4" htmlFor="inputDefault">new category</label>
    <input type="text" className="form-control" placeholder="category name" id="inputDefault"
    value={ownState.newCategory} onChange={handleChange}></input>
  </div>
  <div className={`add-item ${(ownState.addMode) ? 'hidden'
    : ''}`} onClick={() => setState({ ...ownState, addMode: true })}></div>
  <div className={`add-item__btn-container ${(ownState.addMode) ? '' : 'hidden'}`}>
    <button type="button" className="btn btn-outline-danger" onClick={() => handleClickBtnCancel()}>Cancel</button>
    <button type="button" className="btn btn-outline-primary" onClick={() => handleClickBtnCreate()}>Create</button>
  </div>
</div>
  );
}

export default AdminItemAdd;
