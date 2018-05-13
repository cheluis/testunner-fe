import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTest, fetchTestFailure, fetchTestSuccess, resetActiveTest } from '../actions';

class TestDetail extends Component{
   
  render(){
        const test = this.props.activeTest;
        
      if(!test) {
            return <span />
        }

    return (
        <div>
          <ul>
            <li>{test.id}</li>
            <li>{test.username}</li>
            <li>{test.created_at}</li>
            <li>{test.test_enviroment_id}</li>
            <li>{test.script_tested}</li>
            <li>{test.log_information}</li>
          </ul>
        
        </div>
    );
  }
}

function mapStateToProps(globalState, ownProps) {
    return {
      //activeTest: globalState.tests.activeTest,
      activeTest: ownProps.activeTest
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchTest: (id) => {
        dispatch(fetchTest(id))
          .then((result) => {
            // Note: Error's "data" is in result.payload.response.data (inside "response")
            // success's "data" is in result.payload.data
            if (result.payload.response && result.payload.response.status !== 200) {
              dispatch(fetchTestFailure(result.payload.response.data));
            } else {
              dispatch(fetchTestSuccess(result.payload.data))
            }
          })
      },
      resetMe: () => {
        //clean up both activePost(currrently open) and deletedPost(open and being deleted) states
        dispatch(resetActiveTest());
      }
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(TestDetail);
