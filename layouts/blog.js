import React, { useEffect } from 'react'
import Head from 'next/head'
import { parseISO, format } from 'date-fns'
import {
    useColorMode,
    Heading,
    Text,
    Flex,
    Stack,
    Avatar,
    Box,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import Container from '../components/Container'
import BlogComments from '../components/BlogComments'
import { primaryDarkColor } from '../styles/theme'
import { FaChartBar, FaEye, FaRegClock } from 'react-icons/fa'
import { CalendarIcon, ViewIcon } from '@chakra-ui/icons'
import ViewCounter from '../components/ViewCounter'

const capitalize = (s) => s.split('-').reduce((a, c) => `${a} ${c[0].toUpperCase()}${c.slice(1)}`, '')

export default function BlogLayout({ children, frontMatter }) {
    const router = useRouter();
    const slug = router.asPath.replace('/blog', '');

    const { colorMode } = useColorMode();

    useEffect(() => {

        if (!slug) return;

        if (localStorage.getItem(slug)) {
            const lastViewed = new Date(localStorage.getItem(slug));
            // If the last viewed time is less than 24 hours, don't count it.
            if ((new Date() - lastViewed) < 1000 * 60 * 60 * 24) {
                return;
            }
        }

        localStorage.setItem(slug, new Date());

        fetch(`/api/views/${slug}`, {
            method: 'POST'
        });
    }, [slug]);

    const textColor = {
        light: 'gray.700',
        dark: 'gray.400'
    }

    return (
        <Container showBackButton>
            <Head>
                <title>{capitalize(slug.slice(1))} - Blogs - Prajwal S Venkatesh</title>
            </Head>
            <Stack
                as="article"
                spacing={8}
                justifyContent="center"
                alignItems="flex-start"
                m="0 auto 4rem auto"
                maxWidth="780px"
                w="100%"
                px={10}
            >
                <Flex
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    maxWidth="700px"
                    w="100%"
                >
                    <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
                        {frontMatter.title}
                    </Heading>

                    <Flex
                        justify="space-between"
                        alignItems={['initial', 'initial', 'initial', 'center']}
                        direction={['column', 'column', 'column', 'row']}
                        mt={2}
                        w="100%"
                        mb={4}
                    >

                        <Flex align="center" w="200px">
                            <Box
                                w="38px"
                                h="34px"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Box position="absolute">
                                    <svg height="32" width="32" viewBox="0 0 56 56">
                                        <path
                                            d="M29.465,0.038373A28,28,0,0,1,52.948,40.712L51.166,39.804A26,26,0,0,0,29.361,2.0356Z"
                                            fill={primaryDarkColor}
                                        ></path>
                                        <path
                                            d="M51.483,43.250A28,28,0,0,1,4.5172,43.250L6.1946,42.161A26,26,0,0,0,49.805,42.161Z"
                                            fill={primaryDarkColor}
                                        ></path>
                                        <path
                                            d="M3.0518,40.712A28,28,0,0,1,26.535,0.038373L26.639,2.0356A26,26,0,0,0,4.8338,39.804Z"
                                            fill={primaryDarkColor}
                                        ></path>
                                    </svg>
                                </Box>
                                <Avatar
                                    color="white"
                                    bg="none"
                                    size="lg"
                                    name={"PSV"}
                                    src="/logo.jpg"
                                    w="24px"
                                    h="24px"
                                    mt="4.5px"
                                    ml="4.5px"
                                />
                            </Box>
                            <Text fontSize="sm" color={textColor[colorMode]} >
                                {frontMatter.by}
                                {'@Prajwal'}

                            </Text>
                        </Flex>

                        <Box display="flex" justifyContent="space-between" mt={{
                            xs: 4,
                            sm: 4,
                            md: 0
                        }}
                            flexDirection={['column', 'column', 'row']}
                            gap={[1, 1, 2, 6]}
                        >

                            <Text fontSize="sm" variant='subtle' mt={[2, 0]} display="flex" alignItems="center" color={textColor[colorMode]}>
                                <CalendarIcon />&nbsp;&nbsp;{format(parseISO(frontMatter.publishedAt), 'MMM dd, yyyy')}
                            </Text>

                            <Text fontSize="sm" variant='subtle' mt={[2, 0]} display="flex" alignItems="center" color={textColor[colorMode]}>
                                <FaEye />&nbsp;&nbsp;
                                <ViewCounter slug={slug} />
                            </Text>

                            <Text fontSize="sm" variant='subtle' mt={[2, 0]} display="flex" alignItems="center" color={textColor[colorMode]}>
                                <FaRegClock /> &nbsp;&nbsp;{frontMatter.readingTime.text}
                            </Text>

                            <Text fontSize="sm" variant='subtle' mt={[2, 0]} display="flex" alignItems="center" color={textColor[colorMode]}>
                                <FaChartBar /> &nbsp;&nbsp;{frontMatter.wordCount} words
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
                {children}
                <BlogComments />
            </Stack>
        </Container>
    )
}

