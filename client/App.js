import React from 'react';
import { Form, Text, FormState } from 'informed';
import useGet from './hooks/useGet';

const App = () => {

  // const { loading, error, data } = useGet({
  //   url: '/health'
  // });

  return (
    <div>
      <h1>Hello World!</h1>
      <Form>
        <Text field="name" label="First Name" />
        <button type="submit" >
          submit
        </button>
        <FormState />
      </Form>
    </div>
  );
};

export default App;