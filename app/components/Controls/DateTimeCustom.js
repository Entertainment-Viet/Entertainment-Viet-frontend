import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Wrapper, Control } from './styles';

const MyWrapper = styled(Wrapper)`
  input {
    ${Control};
  }
  .react-datepicker__triangle {
    left: -8px !important;
  }
  .react-datepicker-popper {
    z-index: 99;
  }
`;

const DateTimeCustom = props => {
  const { type, message, template, handleDateChange } = props;
  const [date, setDate] = useState('');

  let opt = {};
  // eslint-disable-next-line no-unused-vars
  let mPlaceholder = '';

  switch (type) {
    case 'y':
      opt = {
        showYearPicker: true,
        dateFormat: 'yyyy',
      };
      mPlaceholder = 'YYYY';
      break;
    case 'm':
      opt = {
        showMonthYearPicker: true,
        dateFormat: 'MM/yyyy',
      };
      mPlaceholder = 'MM/YYYY';
      break;
    case 'hm':
      opt = {
        showTimeInput: true,
        timeInputLabel: 'Time:',
        dateFormat: 'MMMM d, yyyy h:mm aa',
      };
      mPlaceholder = 'MMMM d, yyyy h:mm aa';
      break;
    default:
      opt = {
        dateFormat: 'dd/MM/yyyy',
      };
      mPlaceholder = 'DD/MM/YYYY';
      break;
  }

  return (
    <MyWrapper className={template}>
      <DatePicker
        autoComplete="off"
        selected={date}
        onChange={d => {
          handleDateChange(d);
          setDate(d);
        }}
        dateFormat="yyyy"
        placeholderText={message}
        {...opt}
        {...props}
      />
    </MyWrapper>
  );
};

DateTimeCustom.propTypes = {
  message: PropTypes.object,
  type: PropTypes.any,
  template: PropTypes.any,
  handleDateChange: PropTypes.func,
};

export default DateTimeCustom;
