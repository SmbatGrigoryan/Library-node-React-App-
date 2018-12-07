import React from 'react';
import FormTest from './FormTest';

class FormPage extends React.Component {
  constructor(props) {
    super(props);

  }

  submit(values) {
    console.log(values)
  }

  render() {
    return <FormTest onSubmit={this.submit}/>
  }
}

export default FormPage;