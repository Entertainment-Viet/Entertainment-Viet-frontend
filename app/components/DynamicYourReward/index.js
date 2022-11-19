/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Box } from '@chakra-ui/react';
import { useAnimation } from 'framer-motion';
import {
  SEC_TEXT_COLOR,
  SUB_BLU_COLOR, TEXT_GREEN,
  TEXT_PURPLE,
} from '../../constants/styles';
import InputCustomV2 from '../Controls/InputCustomV2';
import SelectCustom from '../Controls/SelectCustom';
import { AttachIcon } from '../Controls/UploadFileCustom';
import trashCan from '../DynamicYourSongForm/assets/ic_delete.svg';

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

const dataScoreType = [
  {
    name: 'Giai 1',
    id: 2,
    rate: 0.5,
  },
  {
    name: 'Giai 2',
    id: 3,
    rate: 2,
  },
  {
    name: 'Giai 3',
    id: 4,
    rate: 2,
  },
  {
    name: 'Giai 4',
    id: 5,
    rate: 5,
  },
];

function DynamicFormYourReward(props) {
  const [formFields, setFormFields] = useState();
  const controls = useAnimation();
  const startAnimation = () => controls.start('hover');
  const stopAnimation = () => controls.stop();

  useEffect(() => {
    if (props.data.length > 0) {
      props.data.forEach(item => {
        // eslint-disable-next-line no-param-reassign
        delete item.scoreTypeName;
        // eslint-disable-next-line no-param-reassign
        delete item.approved;
      });
      setFormFields(props.data);
      props.setDynamicData(props.data);
    } else {
      setFormFields([
        { scoreTypeId: dataScoreType[0].id, achievement: '', proof: ['string'] },
      ]);
    }
  }, []);

  const handleUpload = (item, name, index) => {
    if (item) {
      const data = [...formFields];
      data[index][name] = item.name;
      setFormFields(data);
    }
  };

  const handleFormChange = (event, index) => {
    const data = [...formFields];
    if (event.target.name === 'scoreTypeId') {
      data[index][event.target.name] = Number(event.target.value);
    } else {
      data[index][event.target.name] = event.target.value;
    }
    setFormFields(data);
  };

  const submit = e => {
    e.preventDefault();
    props.setDynamicData(formFields);
  };

  const addFields = () => {
    const object = {
      scoreTypeId: dataScoreType[0].id,
      achievement: 'test',
      proof: ['string'],
    };
    setFormFields([...formFields, object]);
    props.setDynamicData([...formFields, object]);
  };

  const removeFields = index => {
    const data = [...formFields];
    data.splice(index, 1);
    props.setDynamicData(data);
    setFormFields(data);
  };

  return (
    <form onChange={submit}>
      {formFields && formFields.map((form, index) => {
        const defaultValue = props.data.length > 0 && props.data.length === formFields.length ? (
          dataScoreType.filter(
            item => item.id === form.scoreTypeId,
          )[0].id) : null;
        return (
          <Box>
            <Box display="flex" height="40px" marginBottom="20px">
              <Box width="350px">
                <SelectCustom
                  id="scoreTypeId"
                  name="scoreTypeId"
                  size="md"
                  defaultValue={defaultValue}
                  onChange={event => handleFormChange(event, index)}
                >
                  {/* eslint-disable-next-line no-shadow */}
                  {dataScoreType.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </SelectCustom>
              </Box>
              <Box marginRight="4px" marginLeft="4px" />
              <Box width="250px">
                <SelectCustom
                  id="year"
                  size="md"
                  name="value"
                  onChange={event => handleFormChange(event, index)}
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
                  name="achievement"
                  onChange={e => handleUpload(e.target.files[0], 'achievement', index)}
                />
              </Box>
              <Image
                src={trashCan}
                alt="trash"
                onClick={() => removeFields(index)}
              />
            </Box>
            <Box marginBottom="20px" color={TEXT_GREEN}>{form.achievement || 'no choose file'}</Box>
          </Box>
        )
      })}
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
  data: PropTypes.array,
  // eslint-disable-next-line react/no-unused-prop-types
  setDynamicValid: PropTypes.func,
};

export default DynamicFormYourReward;
