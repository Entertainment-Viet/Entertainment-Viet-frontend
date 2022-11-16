import React, { useState } from 'react';
import { Box, Link, HStack } from '@chakra-ui/react';
import { PRI_TEXT_COLOR } from 'constants/styles';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import {
  Microphone,
  Drum,
  Dancer,
  Instru,
  DJ,
  Bartender,
  MakeUp,
  Stylish,
} from '../../Icon';

const CategoriesTab = ({ dataCate }) => {
  const [categoryHovered, setCategoryHovered] = useState('');
  const handleHover = name => {
    setTimeout(() => {
      setCategoryHovered(name);
    }, 550);
  };
  return (
    dataCate.length > 0 &&
    dataCate.map(items => (
      <Box
        color={PRI_TEXT_COLOR}
        key={`title_${items.uid}`}
        py={2}
        onMouseEnter={() => handleHover(items.name)}
      >
        <HStack>
          <CategoriesIcon name={items.name} iconSize={20} />
          <Link
            href={`/search?category=${items.uid}`}
            fontWeight={500}
            fontSize={16}
            value={items.name}
          >
            {items.name}
          </Link>
          {categoryHovered === items.name ? (
            <ChevronDownIcon />
          ) : (
            <ChevronUpIcon />
          )}
        </HStack>
        {items.children.length > 0 && (
          <Box
            ml={4}
            pt={2}
            display={categoryHovered === items.name ? 'block' : 'none'}
          >
            <ul style={{ listStyle: 'circle' }}>
              {items.children.map(itemChildren => (
                <Link
                  key={`sub-cate_${items.uid}`}
                  href={`/search?category=${itemChildren.uid}`}
                >
                  <li
                    style={{
                      marginBottom: '10px',
                      marginLeft: '10px',
                      fontWeight: '500',
                      fontSize: '16px',
                    }}
                  >
                    {itemChildren.name}
                  </li>
                </Link>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    ))
  );
};
const CategoriesIcon = ({ parentName, iconSize }) => {
  switch (parentName) {
    case 'Solo Singers':
      return <Microphone size={iconSize} />;
    case 'Band':
      return <Drum size={iconSize} />;
    case 'Dancer':
      return <Dancer size={iconSize} />;
    case 'Instrument':
      return <Instru size={iconSize} />;
    case 'DJ':
      return <DJ size={iconSize} />;
    case 'Stylish':
      return <Stylish size={iconSize} />;
    case 'Make up':
      return <MakeUp size={iconSize} />;
    case 'Bartender':
      return <Bartender size={iconSize} />;
    default:
      return null;
  }
};
CategoriesTab.propTypes = {
  dataCate: PropTypes.any,
};
CategoriesIcon.propTypes = {
  parentName: PropTypes.string,
  iconSize: PropTypes.number,
};
export default CategoriesTab;
