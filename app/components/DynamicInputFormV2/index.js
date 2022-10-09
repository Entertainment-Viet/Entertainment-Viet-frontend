import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';
import { Box } from '@chakra-ui/core';
import InputCustomV2 from '../Controls/InputCustomV2';
import { SEC_TEXT_COLOR, SUB_BLU_COLOR } from '../../constants/styles';

function DynamicFormV2(props) {
  const [formFields, setFormFields] = useState([{ key: '', value: '' }]);
  const obj = {};

  const handleFormChange = (event, index) => {
    const data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = e => {
    e.preventDefault();
    for (let i = 0; i < formFields.length; i += 1) {
      obj[formFields[i].key] = formFields[i].value;
      for (let j = 0; j < formFields.length; j += 1) {
        if (formFields[j].key === formFields[i].key && i !== j) {
          props.setDynamicValid(false);
        }
      }
    }
    props.setDynamicData(obj);
  };

  const addFields = () => {
    const object = {
      key: '',
      value: '',
    };

    setFormFields([...formFields, object]);
  };

  // const removeFields = index => {
  //   const data = [...formFields];
  //   data.splice(index, 1);
  //   setFormFields(data);
  // };

  return (
    <form onChange={submit}>
      {formFields.map((form, index) => (
        <Box display="flex" height="40px" marginBottom="20px">
          <InputCustomV2
            name="key"
            placeholder="Key"
            onChange={event => handleFormChange(event, index)}
            value={form.key}
          />
          <Box marginRight="4px" marginLeft="4px" />
          <InputCustomV2
            name="value"
            placeholder="Value"
            onChange={event => handleFormChange(event, index)}
            value={form.value}
          />
          {/* <Button */}
          {/*  onClick={() => removeFields(index)} */}
          {/*  text="Remove" */}
          {/*  template="btn-pri btn-inline" */}
          {/* > */}
          {/*  Remove */}
          {/* </Button> */}
        </Box>
      ))}
      <Box width="100%">
        <Button
          onClick={addFields}
          text="Add more"
          template="btn-pri btn-inline"
          variant="primary"
          bg={SEC_TEXT_COLOR}
          color={SUB_BLU_COLOR}
          width="100%"
        >
          +
        </Button>
      </Box>
    </form>
  );
}

DynamicFormV2.propTypes = {
  setDynamicData: PropTypes.func,
  setDynamicValid: PropTypes.func,
};

export default DynamicFormV2;
