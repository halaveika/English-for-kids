import React, { useState } from 'react';
import './admin__category.scss';
import { Link } from 'react-router-dom';
import useActions from '../../hooks/useActions';

export interface ACategoryProps {
  category: string;
  wordsNumber: number;
}

interface ownState {
  updateMode: boolean,
  newCategory: string,
}

function AdminCategory(props:ACategoryProps):JSX.Element {
  const { AdminDeleteCategory, AdminUpdateCategory, AdminSetCurrentCategory } = useActions();
  const [ownState, setState] = useState<ownState>(
    {
      updateMode: false,
      newCategory: props.category,
    },
  );

  const handleClickBtnCancel = () => {
    setState({ ...ownState, updateMode: false, newCategory: '' });
  };

  const handleClickBtnCreate = () => {
    if (ownState.newCategory.trim()) {
      AdminUpdateCategory(props.category, ownState.newCategory);
      setState({ ...ownState, updateMode: false });
    } else { alert('Add category name, genius!'); }
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...ownState, newCategory: (event.target as HTMLInputElement).value });
  };

  return (

<div className="card bg-light mb-3 acategory" >
  <button type="button" className="btn-close" onClick={() => AdminDeleteCategory(props.category)}></button>
  {(ownState.updateMode) ? '' : <h3 >{props.category}</h3> }
  <div className={`form-group ${(ownState.updateMode) ? '' : 'hidden'}`}>
    <label className="col-form-label mt-4" htmlFor="inputDefault">update category</label>
    <input type="text" className="form-control" placeholder={props.category} id="inputDefault"
    value={ownState.newCategory} onChange={handleChange}></input>
  </div>
  <h4 >{`WORDS: ${props.wordsNumber}`}</h4>
    <div className="category_btn-container">
      {(ownState.updateMode) ? <button type="button" className="btn btn-outline-danger"
      onClick={() => handleClickBtnCancel()}>Cancel</button>
        : <button type="button" className="btn btn-outline-primary"
        onClick={() => setState({ ...ownState, updateMode: true })}>Update</button>}
      {(ownState.updateMode) ? <button type="button" className="btn btn-outline-primary"
      onClick={() => handleClickBtnCreate()}>ОК</button>
        : <Link to="/category/words"><button type="button" className="btn btn-outline-primary"
        onClick={() => AdminSetCurrentCategory(props.category)}>Add Word</button></Link>}
    </div>
</div>

  );
}

export default AdminCategory;
