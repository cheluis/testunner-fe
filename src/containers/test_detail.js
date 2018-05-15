import React, { Component } from 'react';
import { connect } from 'react-redux';


/*
* Component that shows the selected test details. Receives the selected test as PropTypes
*/
class TestDetail extends Component{

  render(){
    const test = this.props.activeTest;

    if(!test) {
      return <span />
    }

    return (
      <div>
      <h3>Test details</h3>
      <ul>
      <li>ID: {test.id}</li>
      <li>Requester: {test.username}</li>
      <li>Date created{test.created_at}</li>
      <li>Enviroment ID{test.test_enviroment_id}</li>
      <li>Script tested: {test.script_tested}</li>
      <li>Log Info:{test.log_information}</li>
      </ul>

      </div>
    );
  }
}

function mapStateToProps(globalState, ownProps) {
  return {
    activeTest: ownProps.activeTest
  };
}

export default connect(mapStateToProps)(TestDetail);
