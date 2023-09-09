import React from 'react'
import NextLink from 'next/link'
import { useColorMode, Heading, Text, Flex, Box, Link, Tag } from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'
import { CalendarIcon } from '@chakra-ui/icons'
import { FaEye } from 'react-icons/fa'
import ViewCounter from './ViewCounter'

const BlogPost = ({ title, difficulty, publishedAt, summary, tags = "", slug }) => {
    const { colorMode } = useColorMode()
    const secondaryTextColor = {
        light: 'gray.700',
        dark: 'gray.400'
    }

    const DifficultyColor = {
        'Easy': 'teal',
        'Medium': 'yellow',
        'Hard': 'red',
    }

    const textColor = {
        light: 'gray.700',
        dark: 'gray.400'
    }

    return (
        <NextLink borderRadius={10} href={`/blog/${slug}`} passHref>
            <Link w="100%" borderRadius={10} px={8} py={6} my="2" _hover={{ textDecoration: 'none', background: 'rgba(255,255,255,0.03)', border: "1px solid #2563eb" }}
                border="1px solid #233554">
                <Box mb={2} display="block" width="100%" borderRadius={10} >
                    <Flex
                        mb='2'
                        width="100%"
                        align="flex-start"
                        justifyContent="space-between"
                        flexDirection={['column', 'column', 'column']}
                    >
                        <Flex align="flex-start" justifyContent="start" width="100%">
                            <Heading size="md" as="h3" mb={1} fontWeight="medium" noOfLines={1}>
                                {title}
                            </Heading>
                            {difficulty && <Tag mx={4} size="sm" colorScheme={DifficultyColor[difficulty]} width="max-content">
                                {difficulty}
                            </Tag>}
                        </Flex>

                        <Flex w="auto" gap={3}>
                            <Flex alignItems="start" justifyContent="start" width="100%" mb="1" pt="1" >
                                <Text fontSize="10" variant='subtle' mt={[2, 0]} display="flex" alignItems="center" w="max-content" color={textColor[colorMode]}>
                                    <CalendarIcon fontSize={11} color="#718096" />&nbsp;&nbsp;
                                    {format(parseISO(publishedAt), 'MMMM dd, yyyy')}
                                </Text>
                            </Flex>

                            <Flex alignItems="start" justifyContent="start" width="100%" mb="1" pt="1" >
                                <Text fontSize="10" variant='subtle' mt={[2, 0]} display="flex" alignItems="center" color={textColor[colorMode]}>
                                    <FaEye />&nbsp;&nbsp;
                                    <ViewCounter slug={slug} />
                                </Text>
                            </Flex>
                        </Flex>

                    </Flex>
                    <Text fontSize={12} color={secondaryTextColor[colorMode]}>{summary}</Text>

                    <Flex spacing={2} mt={2} flexWrap="wrap">
                        {tags.map((tag) => (
                            <Tag size="sm" fontSize="8" mr="2" mt="2" key={tag} variant='subtle' border="none" >
                                {tag}
                            </Tag>
                        ))}
                    </Flex>

                </Box>
            </Link>
        </NextLink>
    )
}

export default BlogPost