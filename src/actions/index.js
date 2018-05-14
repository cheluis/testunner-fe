import axios from 'axios';

export const FETCH_TESTS = 'FETCH_TESTS';
export const FETCH_TESTS_SUCCESS = 'FETCH_TESTS_SUCCESS';
export const FETCH_TESTS_FAILURE = 'FETCH_TESTS_FAILURE';

//Create new post
export const CREATE_TEST = 'CREATE_TEST';
export const CREATE_TEST_SUCCESS = 'CREATE_TEST_SUCCESS';
export const CREATE_TEST_FAILURE = 'CREATE_TEST_FAILURE';
export const RESET_NEW_TEST = 'RESET_NEW_TEST';


//Fetch post
export const FETCH_TEST = 'FETCH_TEST';
export const FETCH_TEST_SUCCESS = 'FETCH_TEST_SUCCESS';
export const FETCH_TEST_FAILURE = 'FETCH_TEST_FAILURE';
export const RESET_ACTIVE_TEST = 'RESET_ACTIVE_TEST';

const ROOT_URL = 'http://ec2-18-194-45-220.eu-central-1.compute.amazonaws.com/api/v1';

//const ROOT_URL = 'http://localhost:8000/api/v1';

export function fetchTests(){
  const request = axios.get(`${ROOT_URL}/tests/?format=json`);
  return {
    type: FETCH_TESTS,
    payload: request
  }
}

export function fetchTestsSuccess(tests) {
  return {
    type: FETCH_TESTS_SUCCESS,
    payload: tests
  };
}

export function fetchTestsFailure(error) {
  return {
    type: FETCH_TESTS_FAILURE,
    payload: error
  };
}


export function createTest(props) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/tests/`
  });

  return {
    type: CREATE_TEST,
    payload: request
  };
}

export function createTestSuccess(newTest) {
  return {
    type: CREATE_TEST_SUCCESS,
    payload: newTest
  };
}

export function createTestFailure(error) {
  return {
    type: CREATE_TEST_FAILURE,
    payload: error
  };
}

export function resetNewTest() {
  return {
    type: RESET_NEW_TEST
  }
}

export function fetchTest(id) {
  const request = axios.get(`${ROOT_URL}/tests/${id}/?format=json`);

  return {
    type: FETCH_TEST,
    payload: request
  };
}


export function fetchTestSuccess(activePost) {
  return {
    type: FETCH_TEST_SUCCESS,
    payload: activePost
  };
}

export function fetchTestFailure(error) {
  return {
    type: FETCH_TEST_FAILURE,
    payload: error
  };
}

export function resetActiveTest() {
  return {
    type: RESET_ACTIVE_TEST
  }
}
