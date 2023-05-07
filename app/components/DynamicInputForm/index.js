import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Box } from '@chakra-ui/react';
import InputCustomV2 from '../Controls/InputCustomV2';
import { SEC_TEXT_COLOR, SUB_BLU_COLOR } from '../../constants/styles';
import trashCan from '../DynamicYourSongForm/assets/ic_delete.svg';
function DynamicArrayForm(props) {
  const [formFields, setFormFields] = useState();

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      console.log('dynamic: ', props.data);
      setFormFields(props.data);
      props.setDynamicData(props.data);
    } else {
      setFormFields([]);
      props.setDynamicData([]);
    }
  }, []);

  const handleFormChange = (event, index) => {
    const data = [...formFields];
    data[index] = event.target.value;
    setFormFields(data);
    props.setDynamicData(data);
  };

  // const submit = e => {
  //   e.preventDefault();
  //   props.setDynamicData(formFields);
  // };

  const addFields = () => {
    const object = '';

    setFormFields([...formFields, object]);
  };

  const removeFields = index => {
    const data = [...formFields];
    data.splice(index, 1);
    props.setDynamicData(data);
    setFormFields(data);
  };

  return (
    <form>
      {formFields &&
        formFields.map((form, index) => (
          <Box display="flex" height="40px" marginBottom="20px">
            {/* <InputCustomV2
              name="achievement"
              placeholder="Enter Song Name"
              onChange={event => handleFormChange(event, index)}
              value={form.achievement}
            />
            <Box marginRight="4px" marginLeft="4px" /> */}
            <InputCustomV2
              name="proof"
              placeholder="Enter your own hashtag"
              onChange={event => handleFormChange(event, index)}
              value={form}
            />
            <Image
              src={trashCan}
              alt="trash"
              onClick={() => removeFields(index)}
            />
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

DynamicArrayForm.propTypes = {
  setDynamicData: PropTypes.func,
  data: PropTypes.array,
  // eslint-disable-next-line react/no-unused-prop-types
  setDynamicValid: PropTypes.func,
};

export default DynamicArrayForm;
