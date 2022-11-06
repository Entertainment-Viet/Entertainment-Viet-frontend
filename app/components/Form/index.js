/**
 *
 * Form
 *
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@chakra-ui/react';
import { TEXT_GREEN, PRI_BACKGROUND, SUB_BLU_COLOR } from 'constants/styles';

function Form(props) {
  const { children } = props;

  return (
    <>
      <Box
        sx={{
          backgroundColor: PRI_BACKGROUND,
          marginTop: '104px',
        }}
        width="810px"
        borderRadius="10px"
        py={{ base: '0', sm: '12' }}
        px={{ base: '4', sm: '12' }}
      >
        <Box
          color={TEXT_GREEN}
          fontWeight="600"
          fontSize="25px"
          sx={{
            marginBottom: '25px',
          }}
        >
          {props.title}
        </Box>
        {Children.toArray(children)}
      </Box>
      <Box display="flex" justifyContent="end">
        <Button
          sx={{
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: '20px',
            marginBottom: '100px',
            background: TEXT_GREEN,
            width: '235px',
            height: '48px',
          }}
          color={SUB_BLU_COLOR}
          type="submit"
          isLoading={props.isSubmitting}
        >
          Create
        </Button>
      </Box>
    </>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  isSubmitting: PropTypes.any,
};

export default Form;
