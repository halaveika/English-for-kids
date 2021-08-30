import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../index';
import useActions from '../../hooks/useActions';
import { IStatWord } from '../../models/IStatWord';
import {
  DIFFICULT_WORDS, WORD, TRANSLATION, CATEGORY, TRAINCOUNT, SUCCESSCOUNT, FAILCOUNT, PERCENTSUCCESS,
} from '../../constants';
import './statistic.scss';

export interface IStatisticProps {
  statistic?: IStatWord[],
}

function Statistic(props:IStatisticProps):JSX.Element {
  const [sortOptions, setState] = useState({
    oderASC: true,
    key: WORD,
  });
  const { RenderContent, GetDifficultWords, SetResetStat } = useActions();
  const sortStat = (arr:IStatWord[], key: string):IStatWord[] => {
    const sortedArrr = arr.slice(0);
    switch (key) {
      case WORD:
        return (sortOptions.oderASC) ? sortedArrr.sort((a, b) => a.word.localeCompare(b.word))
          : sortedArrr.sort((a, b) => b.word.localeCompare(a.word));
      case TRANSLATION:
        return (sortOptions.oderASC) ? sortedArrr
          .sort((a, b) => a.translation.localeCompare(b.translation))
          : sortedArrr.sort((a, b) => b.translation.localeCompare(a.translation));
      case CATEGORY:
        return (sortOptions.oderASC) ? sortedArrr
          .sort((a, b) => a.category.localeCompare(b.category))
          : sortedArrr.sort((a, b) => b.category.localeCompare(a.category));
      case TRAINCOUNT:
        return (sortOptions.oderASC) ? sortedArrr.sort((a, b) => (a.trainCount - b.trainCount))
          : sortedArrr.sort((a, b) => (b.trainCount - a.trainCount));
      case SUCCESSCOUNT:
        return (sortOptions.oderASC) ? sortedArrr.sort((a, b) => (a.successCount - b.successCount))
          : sortedArrr.sort((a, b) => (b.successCount - a.successCount));
      case FAILCOUNT:
        return (sortOptions.oderASC) ? sortedArrr.sort((a, b) => (a.failCount - b.failCount))
          : sortedArrr.sort((a, b) => (b.failCount - a.failCount));
      case PERCENTSUCCESS:
        return (sortOptions.oderASC) ? sortedArrr
          .sort((a, b) => (a.percentSuccess - b.percentSuccess))
          : sortedArrr.sort((a, b) => (b.percentSuccess - a.percentSuccess));
      default: return sortedArrr;
    }
  };

  const statisticArray:JSX.Element[] = sortStat(props.statistic!, sortOptions.key)
    .map((element, index) => (
  <tr key={index + 32 }>
    <td key={index * (1000 + 1) + 1}>{element.word}</td>
    <td key={index * (1000 + 2) + 2}>{element.translation}</td>
    <td key={index * (1000 + 3) + 3}>{element.category}</td>
    <td key={index * (1000 + 4) + 4}>{element.trainCount}</td>
    <td key={index * (1000 + 5) + 5}>{element.successCount}</td>
    <td key={index * (1000 + 6) + 6}>{element.failCount}</td>
    <td key={index * (1000 + 7) + 7}>{element.percentSuccess}</td>
  </tr>
    ));

  const RepeatDiffiWord = () => {
    GetDifficultWords(props.statistic!);
    RenderContent(DIFFICULT_WORDS);
  };

  const handleSort = (key:string) => {
    if (sortOptions.oderASC) {
      setState({ ...sortOptions, oderASC: false, key });
    } else {
      setState({ ...sortOptions, oderASC: true, key });
    }
  };

  return (
  <>
    <div className="button-container">
      <button className='btn btn-outline-dark' type="button" onClick={() => RepeatDiffiWord()} >
        Repeat difficult words</button>
      <button className='btn btn-danger' type="button" onClick={() => { SetResetStat(); }}>
        Reset</button>
    </div>
    <h1 className="table-title">Statistic</h1>
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col" ><span className="sort-by" onClick={() => handleSort(WORD)} key={313}>word</span></th>
          <th scope="col"><span className="sort-by" onClick={() => handleSort(TRANSLATION)} key={134}>
            translation</span></th>
          <th scope="col"><span className="sort-by" onClick={() => handleSort(CATEGORY)} key={315}>category</span></th>
          <th scope="col"><span className="sort-by" onClick={() => handleSort(TRAINCOUNT)} key={316}>clicks</span></th>
          <th scope="col"><span className="sort-by" onClick={() => handleSort(SUCCESSCOUNT)} key={317}>
            success</span></th>
          <th scope="col"><span className="sort-by" onClick={() => handleSort(FAILCOUNT)} key={318}>fail</span></th>
          <th scope="col"><span className="sort-by" onClick={() => handleSort(PERCENTSUCCESS)} key={319}>
            %success</span></th>
        </tr>
      </thead>
      <tbody>
        {statisticArray}
      </tbody>
    </table>
  </>
  );
}

const mapStateToProps = (state:RootState) => ({
  statistic: state.stat.statistic,
});

export default connect(mapStateToProps, null)(Statistic);
