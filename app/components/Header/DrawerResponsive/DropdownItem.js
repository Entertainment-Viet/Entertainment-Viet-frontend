import React, { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
  VStack,
  Box,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { PRI_TEXT_COLOR, TEXT_GREEN } from 'constants/styles';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { AiOutlineStar } from 'react-icons/ai';
import { BiSupport } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';
import { classifyCategories } from 'utils/helpers';
import {
  TermOfService,
  Safety,
  Categories,
  Partner,
  Career,
  Support,
  About,
  Buyer,
} from '../../Icon';
import CategoriesTab from './CategoriesTab';

export default function DropdownItem({ title, active, data }) {
  const [categoriesFiltered, setCategoriesFiltered] = useState(data);
  useEffect(() => {
    const categoriesClassified = classifyCategories(data);
    setCategoriesFiltered(categoriesClassified);
  }, [data]);
  return (
    <Flex mt={30} flexDir="column" w="100%" alignItems="flex-start">
      <Menu placement="right">
        <Accordion
          color={active && TEXT_GREEN}
          py={3}
          _hover={{ color: TEXT_GREEN }}
          w="100%"
          allowMultiple
        >
          <AccordionItem
            style={{ borderTopWidth: '0', borderBottomWidth: '0' }}
          >
            <h2>
              <AccordionButton>
                <MenuButton
                  w="100%"
                  border={active && `2px solid ${TEXT_GREEN}`}
                  borderRadius={active && '5px'}
                  p={active && '0.5rem'}
                >
                  <Flex alignItems="center">
                    {title !== 'Categories' && (
                      <HeaderIconSidebar
                        title={title}
                        isActive={active ? TEXT_GREEN : PRI_TEXT_COLOR}
                      />
                    )}
                    <Text
                      ml={title !== 'Categories' ? 5 : 0}
                      mt={title !== 'Categories' ? 2 : 0}
                      whiteSpace="nowrap"
                      color={active ? TEXT_GREEN : PRI_TEXT_COLOR}
                      fontSize="30px"
                    >
                      {title}
                    </Text>
                  </Flex>
                </MenuButton>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {
              <AccordionPanel pb={4} color={PRI_TEXT_COLOR} ml={12}>
                <VStack alignItems="flex-start">
                  {title === 'Categories' && data ? (
                    <CategoriesTab dataCate={categoriesFiltered} />
                  ) : (
                    data &&
                    data.map(value => (
                      <Link href={`/${value.url}`} key={value.url}>
                        <Flex>
                          <i style={{ marginTop: '2px', marginRight: '5px' }}>
                            <BodyIconAbout name={value.name} iconSize={20} />
                          </i>
                          <Box
                            color={PRI_TEXT_COLOR}
                            fontWeight="700"
                            as="h1"
                            fontSize="xl"
                            whiteSpace="nowrap"
                            noOfLines={1}
                            key={`header_${value.url}`}
                          >
                            <Flex>
                              <i
                                style={{
                                  marginTop: '2px',
                                  marginRight: '5px',
                                }}
                              >
                                <BodyIconSupport
                                  name={value.name}
                                  iconSize={20}
                                />
                              </i>
                              <Box key={`title_${value.uid}`}>{value.name}</Box>
                            </Flex>
                          </Box>
                        </Flex>
                      </Link>
                    ))
                  )}
                </VStack>
              </AccordionPanel>
            }
          </AccordionItem>
        </Accordion>
      </Menu>
    </Flex>
  );
}

const BodyIconAbout = ({ name, iconSize }) => {
  switch (name) {
    case 'News & Announcement':
      return <HiOutlineNewspaper size={iconSize} />;
    case 'Privacy policy':
      return <MdOutlinePrivacyTip size={iconSize} />;
    case 'Terms of Service':
      return <TermOfService size={iconSize} />;
    case 'Partnership':
      return <Partner size={iconSize} />;
    case 'Career':
      return <Career size={iconSize} />;
    default:
      return null;
  }
};
const BodyIconSupport = ({ name, iconSize }) => {
  switch (name) {
    case 'Become Talent':
      return <AiOutlineStar />;
    case 'Help & Support':
      return <BiSupport />;
    case 'FAQ':
      return <FiHelpCircle />;
    case 'Trust & Safety':
      return <Safety size={iconSize} />;
    case 'Become Buyer':
      return <Buyer size={iconSize} />;
    default:
      return null;
  }
};
const HeaderIconSidebar = ({ title, isActive }) => {
  switch (title) {
    case 'About':
      return <About isActive={isActive} size={20} />;
    case 'Support':
      return <Support isActive={isActive} size={20} />;
    case 'Categories':
      return <Categories isActive={isActive} size={20} />;
    default:
      return null;
  }
};
HeaderIconSidebar.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};
BodyIconSupport.propTypes = {
  name: PropTypes.string,
  iconSize: PropTypes.number,
};
BodyIconAbout.propTypes = {
  name: PropTypes.string,
  iconSize: PropTypes.number,
};

DropdownItem.propTypes = {
  title: PropTypes.string,
  active: PropTypes.any,
  data: PropTypes.any,
};
