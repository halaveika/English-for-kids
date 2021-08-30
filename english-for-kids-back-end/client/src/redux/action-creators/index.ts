import * as ActionCreators from './actions';
import * as AdminActionCreators from './adminActions';

export default {
  ...ActionCreators, ...AdminActionCreators,
};
