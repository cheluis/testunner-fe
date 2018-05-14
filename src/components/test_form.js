import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { resetNewTest, createTest, createTestSuccess, createTestFailure } from '../actions/';
import { connect } from 'react-redux';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.categories || values.categories.trim() === '') {
    errors.categories = 'Enter categories';
  }
  if (!values.content || values.content.trim() === '') {
    errors.content = 'Enter some content';
  }

  return errors;
}

function renderFieldType (type, label, input, options){
  if(type == "select"){
    return(
      <select {...input} className="form-control">
        {options}
      </select>)
  }else{
    return(
      <input {...input} className="form-control"  placeholder={label} type={type}/>)
  }
}

const renderField = ({ input, label, type, options=null, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label  className="control-label">{label}</label>
    <div>
        {renderFieldType(type, label, input, options)}
       <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
)

const validateAndCreateTest = (values, dispatch) => {
  return dispatch(createTest(values))
    .then(result => {
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createTestFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      dispatch(createTestSuccess(result.payload.data));
    });
}



class TestForm extends Component {

  componentWillMount() {
    this.props.resetMe();
  }

  renderError(newTest) {
    if (newTest && newTest.error && newTest.error.message) {
      return (
        <div className="alert alert-danger">
          { newTest ? newTest.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }
  createIdItems() {

    let items = [];
    for (let i = 1; i <= 300; i++) {
        items.push(<option key={i} value={i}>{i}</option>);
    }
    return items;
}

  createTestTemplateItems() {
      const templates = [
          {filename: "test_1.py", desc:"Test api one"},
          {filename: "test_2.py", desc:"Test api two"},
          {filename: "test_3.py", desc:"Test api three"},
      ]
      return _.map(templates, template => {
        return (
          <option key={template.filename} value={template.filename}>{template.desc}</option>
        );
      });
  }
  render() {
    const {handleSubmit, submitting} = this.props;
    return (
      <div className='container'>
        <form onSubmit={ handleSubmit(validateAndCreateTest) }>
          <Field
                 name="username"
                 type="text"
                 component={ renderField }
                 label="Requester*" />
          <Field
                 name="test_enviroment_id"
                 type="select"
                 label="Test Enviroment*"
                component={renderField}
                options={this.createIdItems()}
                 />
          <Field
                 name="test_template"
                 type="select"
                 component={ renderField }
                 label="Test Template*"
                 options={this.createTestTemplateItems()}/>

          <Field
              name="test_script"
              type="text"
              component={ renderField }
              label="Custom path" />


          <div>
            <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }>
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewTest());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    newTest: state.tests.newTest
  };
}

TestForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestForm);


export default reduxForm({
  form: 'TestForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(TestForm)
