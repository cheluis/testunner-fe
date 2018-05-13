import { FETCH_TESTS, FETCH_TESTS_FAILURE, FETCH_TESTS_SUCCESS, CREATE_TEST, 
  CREATE_TEST_FAILURE, CREATE_TEST_SUCCESS, RESET_NEW_TEST, FETCH_TEST, FETCH_TEST_FAILURE, FETCH_TEST_SUCCESS, RESET_ACTIVE_TEST } from '../actions/';

const INITIAL_STATE = 
{ testList: {tests: [], error:null, loading: false},  
  newTest:{test:null, error: null, loading: false}, 
  activeTest:{test:null, error:null, loading: false},
};


export default function(state = INITIAL_STATE, action){
  let error;
  switch (action.type) {
    case FETCH_TESTS:
      return { ...state, testList: {tests:[], error: null, loading: true} }; 
    case FETCH_TESTS_SUCCESS:// return list of posts and make loading = false
      return { ...state, testList: {tests: action.payload, error:null, loading: false} };
    case FETCH_TESTS_FAILURE:// return error and make loading = false
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, testList: {tests: [], error: error, loading: false} };

  case CREATE_TEST:
    return {...state, newTest: {...state.newTest, loading: true}}
  
  case CREATE_TEST_SUCCESS:
    return {activeTest:{test:null, error:null, loading: false}, 
    newTest: {test:action.payload, error:null, loading: false}, 
    testList: {tests: [action.payload, ...state.testList.tests], error: null, loading:false}}

  case CREATE_TEST_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return {...state, newTest: {test:null, error:error, loading: false}}    
  case RESET_NEW_TEST:
    return {...state,  newTest:{test:null, error:null, loading: false}}

  case FETCH_TEST:
    return { ...state, activeTest:{...state.activeTest, loading: true}};
  case FETCH_TEST_SUCCESS:
    return { ...state, activeTest: {test: action.payload, error:null, loading: false}};
  case FETCH_TEST_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, activeTest: {test: null, error:error, loading:false}};
  case RESET_ACTIVE_TEST:
    return { ...state, activeTest: {test: null, error:null, loading: false}};

   
 }
 return state;
}
