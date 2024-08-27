import {Box, Flex, Heading} from '@radix-ui/themes';
import {Great_Vibes} from 'next/font/google';
import NavMenu from './nav-menu';

const greatVibes = Great_Vibes({weight: '400', subsets: ['latin']});

export const Header = () => {
  return (
    <Box width="100%">
      <Flex
        direction="column"
        gap="3"
        align="center"
        justify="center"
        width="100%"
        pt="7"
        pb="7">
        <Heading size="9" className={`${greatVibes.className} text-violet-900`}>
          Plamatio
        </Heading>
        <NavMenu />
      </Flex>
    </Box>
  );
};
