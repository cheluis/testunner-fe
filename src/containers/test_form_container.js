
import TestForm from '../components/test_form';
import { resetNewTest } from '../actions/';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
    console.log(resetNewTest());
    return {
      resetMe: () => {
        dispatch(resetNewTest());
      }
    }
  }

function mapStateToProps(state, ownProps) {
  return {
    newTest: state.test.newTest
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestForm);