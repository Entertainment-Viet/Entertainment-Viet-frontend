import React from 'react';
import { Button, ButtonGroup, Text } from '@chakra-ui/react';
import { GoogleIcon } from './ProviderIcons';
import { SUB_BLU_COLOR } from '../../constants/styles';

const providers = [
  {
    name: 'Google',
    icon: <GoogleIcon boxSize="5" />,
    bg: 'white',
    color: 'black',
  },
  // { name: 'Twitter', icon: <TwitterIcon boxSize="5" /> },
  // { name: 'GitHub', icon: <GitHubIcon boxSize="5" /> },
];

const OAuthButtonGroup = () => (
  <ButtonGroup variant="outline" spacing="4" width="full">
    {providers.map(({ name, icon, bg }) => (
      <Button key={name} width="full" bg={bg}>
        {icon}
        <Text color={SUB_BLU_COLOR} fontSize="15px" fontWeight="500">
          &nbsp;&nbsp;Sign in with {name}
        </Text>
      </Button>
    ))}
  </ButtonGroup>
);

export default OAuthButtonGroup;
