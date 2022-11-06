import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from '@chakra-ui/react';
import { Box } from '@chakra-ui/core';
import { useAnimation } from 'framer-motion';
import {
  SEC_TEXT_COLOR,
  SUB_BLU_COLOR,
  TEXT_PURPLE,
} from '../../constants/styles';
import InputCustomV2 from '../Controls/InputCustomV2';
import SelectCustom from '../Controls/SelectCustom';
import { AttachIcon } from '../Controls/UploadFileCustom';
import trashCan from '../DynamicYourSongForm/assets/ic_delete.svg';
function DynamicFormYourReward(props) {
  const [formFields, setFormFields] = useState([
    { key: '', value: '', file: null },
  ]);
  const controls = useAnimation();
  const startAnimation = () => controls.start('hover');
  const stopAnimation = () => controls.stop();

  const handleUpload = (item, name, index) => {
    if (item) {
      const data = [...formFields];
      data[index][name] = item;
      setFormFields(data);
    }
  };

  const handleFormChange = (event, index) => {
    const data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = e => {
    e.preventDefault();
    props.setDynamicData(formFields);
  };

  const addFields = () => {
    const object = {
      key: '',
      value: '',
      file: null,
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = index => {
    const data = [...formFields];
    data.splice(index, 1);
    props.setDynamicData(data);
    setFormFields(data);
  };

  const year = [
    {
      value: 2000,
    },
    {
      value: 2001,
    },
    {
      value: 2002,
    },
    {
      value: 2003,
    },
    {
      value: 2004,
    },
    {
      value: 2005,
    },
    {
      value: 2006,
    },
    {
      value: 2007,
    },
    {
      value: 2008,
    },
    {
      value: 2009,
    },
    {
      value: 2010,
    },
    {
      value: 2011,
    },
    {
      value: 2012,
    },
    {
      value: 2013,
    },
    {
      value: 2014,
    },
    {
      value: 2015,
    },
    {
      value: 2016,
    },
    {
      value: 2017,
    },
    {
      value: 2018,
    },
    {
      value: 2019,
    },
    {
      value: 2020,
    },
    {
      value: 2021,
    },
    {
      value: 2022,
    },
    {
      value: 2023,
    },
    {
      value: 2024,
    },
    {
      value: 2025,
    },
  ];

  return (
    <form onChange={submit}>
      {formFields.map((form, index) => (
        <Box display="flex" height="40px" marginBottom="20px">
          <Box width="350px">
            <SelectCustom
              id="reward"
              name="key"
              size="md"
              value={form.key}
              onChange={event => handleFormChange(event, index)}
              placeholder="Select option"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </SelectCustom>
          </Box>
          <Box marginRight="4px" marginLeft="4px" />
          <Box width="250px">
            <SelectCustom
              id="year"
              size="md"
              name="value"
              value={form.value}
              onChange={event => handleFormChange(event, index)}
              placeholder="Select option"
            >
              {/* eslint-disable-next-line no-shadow */}
              {year.map((option, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <option key={index} value={option.value}>
                  {option.value}
                </option>
              ))}
            </SelectCustom>
          </Box>
          <Box marginRight="4px" marginLeft="4px" />
          <Box
            width="220px"
            marginBottom="0"
            bg={TEXT_PURPLE}
            borderRadius="5px"
            display="flex"
            position="relative"
          >
            <Box display="flex" pt="8px" pl="6px">
              <AttachIcon
                sx={{
                  marginTop: '5px',
                }}
              />
              <Box>Attach prove</Box>
            </Box>
            <InputCustomV2
              type="file"
              onDragEnter={startAnimation}
              onDragLeave={stopAnimation}
              bg={TEXT_PURPLE}
              borderRadius="5px"
              opacity="0"
              position="absolute"
              name="file"
              onChange={e => handleUpload(e.target.files[0], 'file', index)}
            />
          </Box>
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

DynamicFormYourReward.propTypes = {
  setDynamicData: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  setDynamicValid: PropTypes.func,
};

export default DynamicFormYourReward;
