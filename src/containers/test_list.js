import _ from 'lodash';
import React, { Component } from 'react';
import TestDetail from './test_detail';
import { connect } from 'react-redux';
import { fetchTests, fetchTestsFailure, fetchTestsSuccess } from '../actions';

class TestList extends Component{
    constructor(){
      super();
      this.state = {
        activeTest: null
      };
    }

    componentWillMount() {
      
      this.props.fetchTests();
    }


    renderTest(tests){
      

      return _.map(tests, test => {
        var trBg = {
          backgroundColor: "#FFFFFF"
        };
        
        if(test.status === 'P'){
          trBg.backgroundColor = "#00FF1F";          
        }
        if(test.status === 'F'){
          trBg.backgroundColor = "#FF2D00";
        }
        return (
          <tr key={test.id} style={trBg} onClick={() => this.setState({activeTest: test})} >
            <td>{test.id}</td>
            <td>{test.username}</td>
            <td>{test.created_at}</td>
            <td>{test.test_enviroment_id}</td>
            <td>{test.script_tested}</td>
        </tr>
        
        );
      });
  }

  render(){
    const { tests, loading, error } = this.props.testList;

    if(loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    console.log(this.state.activeTest);
    return (
      <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Requester</th>
            <th>Created</th>
            <th>Test Enviroment</th>
            <th>Template</th>
          </tr>
        </thead>
        <tbody>
          { this.renderTest(tests) }
        </tbody>
      </table>
      <TestDetail activeTest={this.state.activeTest} />   
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    testList: state.tests.testList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: () => {
      dispatch(fetchTests()).then((response) => {
            !response.error ? dispatch(fetchTestsSuccess(response.payload.data)) : dispatch(fetchTestsFailure(response.payload.data));
          });
    }
  }
}
//export default connect(mapStateToProps)(TestList)
export default connect(mapStateToProps, mapDispatchToProps)(TestList);
