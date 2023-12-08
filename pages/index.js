import React, { useState } from 'react'
import Head from 'next/head'
import {
    Flex,
    Stack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorMode,
    Grid,
    Center
} from '@chakra-ui/react'

import Image from 'next/image'

import Container from '../components/Container'
import { getAllFilesFrontMatter } from '../lib/mdx'
import BlogPost from '../components/BlogPost'
import { SearchIcon } from '@chakra-ui/icons'


const headingColor = {
    light: 'gray.700',
    dark: 'gray.400'
}

export default function Blog({ posts }) {
    const { colorMode } = useColorMode()
    const [searchValue, setSearchValue] = useState('')

    const filteredBlogPosts = posts
        .sort(
            (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
        )
        .filter((frontMatter) =>
            frontMatter.title.toLowerCase().includes(searchValue.toLowerCase()))

    return (
        <>
            <Head>
                <title>Blog - Prajwal S Venkateshmurthy</title>
            </Head>
            <Container>
                <Stack
                    as="main"
                    spacing={8}
                    justifyContent="start"
                    alignItems="flex-start"
                    m="0 auto 4rem auto"
                    maxWidth="700px"
                    w='100%'
                    minH='calc(100vh - 340px)'
                >
                    <Flex
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        maxWidth="700px"
                        w='100%'
                        px={4}
                    >
                        <InputGroup mb={10} mr={4} w={{
                            xs: "100%",
                            sm: "90%",
                            md: "80%",
                            lg: "80%"
                        }} mx="auto" outline="none">
                            <Input
                                size="md"
                                aria-label={`Search ${posts.length} posts by title`}
                                placeholder={`Search`}
                                borderColor="#233554"
                                type='text'
                                onChange={(e) => setSearchValue(e.target.value)}
                                borderRadius="20px"
                                pl="20px"
                                outline="none"
                                focusBorderColor='#1d4ed8'
                                _placeholder={{ color: headingColor[colorMode] }}
                                spellCheck='false'
                                autoCorrect='true'
                            />
                            <InputRightElement>
                                <SearchIcon w={4} h={4} color={headingColor[colorMode]} mb="0" mr="2" />
                            </InputRightElement>
                        </InputGroup>
                        {!filteredBlogPosts.length &&
                            <Flex w="100%" justify="center" alignItems="center" flexDirection="column">
                                <Image src="/empty_blog.svg" width="300px" height="300px" />
                                <Text width='100%' align="center" fontSize="16px" color={headingColor[colorMode]} pt="10">
                                    No posts found. Perhaps you could try a less specific search phrase.
                                </Text>
                            </Flex>
                        }
                        <Grid templateColumns='repeat(1, 1fr)' gap={4}>
                            {filteredBlogPosts.map((frontMatter) => <BlogPost key={frontMatter.title} {...frontMatter} />)}
                        </Grid>
                    </Flex>
                </Stack>
            </Container>
        </>
    )
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog')

    return { props: { posts } }
}