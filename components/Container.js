import React from 'react'
import {
    useColorMode,
    Text,
    Flex,
    Box,
    Avatar
} from '@chakra-ui/react'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import DarkModeSwitch from './DarkModeSwitch'

import { primaryDarkColor } from '../styles/theme'
import Footer from './Footer'

const headingColor = {
    light: 'gray.700',
    dark: 'gray.200'
}

const titleColor = {
    light: 'gray.700',
    dark: 'gray.400'
}

const Container = ({ children, showBackButton }) => {
    const { colorMode } = useColorMode()

    const bgColor = {
        light: 'white',
        dark: '#0a192f'
    }

    const color = {
        light: 'black',
        dark: 'white'
    }

    const StickyNav = styled(Flex)`
        position: sticky;
        z-index: 10;
        top: 0;
        backdrop-filter: saturate(180%) blur(20px);
        transition: height .5s, line-height .5s;
        `

    const FlexBox = styled(Box)`
            display: flex;
            align-items: center;
        `

    return (
        <>
            <StickyNav
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                maxWidth="800px"
                minWidth="356px"
                width="100%"
                bg={bgColor[colorMode]}
                as="nav"
                px={[0, 6, 6]}
                py={2}
                mt={8}
                mb={[0, 0, 4]}
                mx="auto"
            >
                <FlexBox justifyContent="space-between"alignItems="center" flexDir='row' >
                <NextLink href="/" passHref>
                    <Avatar bg='primary' border={`2px solid ${colorMode === 'light' ? 'black' : primaryDarkColor}`} size='lg' name='Prajwal SV' src={process.env.NEXT_PUBLIC_AVATAR} />
                </NextLink>
                <Flex pb={2} pl="10px" justifyContent="space-between" alignItems="start" flexDir="column">
                  <Text fontSize="20px" fontWeight={600} color={headingColor[colorMode]}>Prajwal S Venkatesh</Text>
                   <Text fontSize="14px" fontWeight={600} color={titleColor[colorMode]}>Mid Frontend Engineer @Certa</Text>
                  </Flex>
                </FlexBox>
                <DarkModeSwitch showBackButton={showBackButton} />
            </StickyNav >
            <Flex
                as="main"
                justifyContent="center"
                flexDirection="column"
                bg={bgColor[colorMode]}
                color={color[colorMode]}
                px={[0, 4, 4]}
                mt={[4, 8, 8]}
            >
                {children}
            </Flex>
            <Footer />
        </>
    )
}

export default Container