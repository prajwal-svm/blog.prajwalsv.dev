import { CheckCircleIcon, CheckIcon, CopyIcon } from '@chakra-ui/icons';
import {
    Box,
    Alert,
    Code,
    Heading,
    Link,
    Text,
    Divider,
    useColorMode,
    IconButton,
    Tooltip,
    useClipboard
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import NextLink from 'next/link'
import { primaryDarkColor } from '../styles/theme';

export const CustomLink = (props) => {
    const { colorMode } = useColorMode()
    const color = {
        light: 'blue.500',
        dark: 'blue.500'
    }

    const href = props.href
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

    if (isInternalLink) {
        return (
            <NextLink href={href} passHref>
                <Link color={color[colorMode]} {...props} />
            </NextLink>
        )
    }

    return <Link color={color[colorMode]} isExternal {...props} />
}

const Quote = (props) => {
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'blue.50',
        dark: 'blue.900'
    }

    return (
        <Alert
            mt={4}
            w="98%"
            bg={bgColor[colorMode]}
            variant="left-accent"
            status="info"
            css={{
                '> *:first-of-type': {
                    marginTop: 0,
                    marginLeft: 8
                }
            }}
            {...props}
        />
    )
}

const DocsHeading = (props) => (
    <Heading
        css={{
            scrollMarginTop: '100px',
            scrollSnapMargin: '100px', // Safari
            '&[id]': {
                pointerEvents: 'none'
            },
            '&[id]:before': {
                display: 'block',
                height: ' 6rem',
                marginTop: '-6rem',
                visibility: 'hidden',
                content: `""`
            },
            '&[id]:hover a': { opacity: 1 }
        }}
        {...props}
        mb="1em"
        mt="2em"
    >
        <Box pointerEvents="auto">
            {props.children}
            {props.id && (
                <Box
                    aria-label="anchor"
                    as="a"
                    color="blue.500"
                    fontWeight="normal"
                    outline="none"
                    _focus={{
                        opacity: 1,
                        boxShadow: 'outline'
                    }}
                    opacity="0"
                    ml="0.375rem"
                    href={`#${props.id}`}
                >
                    #
                </Box>
            )}
        </Box>
    </Heading>
)

const Hr = () => {
    const { colorMode } = useColorMode()
    const borderColor = {
        light: 'gray.200',
        dark: 'gray.600'
    }

    return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />
}



const MDXComponents = {
    h1: (props) => <Heading as="h1" size="xl" my={4} {...props} />,
    h2: (props) => <DocsHeading
        as="h2"
        size="lg"
        fontWeight="bold"
        textDecoration="underline"
        textDecorationStyle="wavy"
        textDecorationColor={primaryDarkColor}
        {...props}
    />,
    h3: (props) => <DocsHeading
        as="h3"
        size="md"
        fontWeight="bold"
        {...props}
    />,
    h4: (props) => <DocsHeading as="h4" size="sm" fontWeight="bold" {...props} />,
    h5: (props) => <DocsHeading as="h5" size="sm" fontWeight="bold" {...props} />,
    h6: (props) => <DocsHeading as="h6" size="xs" fontWeight="bold" {...props} />,

    br: (props) => <Box height="24px" {...props} />,
    hr: Hr,
    a: CustomLink,
    p: (props) => <Text as="p" mt={0} lineHeight="tall" {...props} />,
    ul: (props) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
    ol: (props) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
    li: (props) => <Box as="li" pb={1} {...props} />,
    // Style blockquote

    blockquote: (props) => (
        <Quote bg="#091a41" borderColor="#3b82f6"  {...props} />
    ),
    table: (props) => <Box as="table" textAlign="left" mt="32px" width="full" {...props} />,
    th: (props) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { colorMode } = useColorMode()
        const thColor = {
            light: 'gray.200',
            dark: 'gray.900'
        }
        return (
            <Box
                as="th"
                bg={thColor[colorMode]}
                fontWeight="semibold"
                p={2}
                fontSize="sm"
                {...props}
            />
        )
    },
    td: (props) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { colorMode } = useColorMode()
        const tdColor = {
            light: 'gray.100',
            dark: 'gray.800'
        }
        return (
            <Box
                as="td"
                p={2}
                bg={tdColor[colorMode]}
                borderTopWidth="1px"
                fontSize="sm"
                whiteSpace="normal"
                {...props}
            />
        )
    },
    sup: (props) => <Box as="sup" fontSize="xs" verticalAlign="super" {...props} />,
    kbd: (props) => (
        <Box
            as="kbd"
            bg="gray.100"
            borderRadius="4px"
            border="1px solid"
            borderColor="gray.200"
            fontSize="0.84em"
            fontWeight="bold"
            p={1}
            {...props}
        />
    ),
    code: (props) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { onCopy, hasCopied } = useClipboard("");
        return (
            <Box as="pre" position="relative" w="auto" h="auto">
                <Code
                    {...props}
                    border='0px !important'
                />
                <Tooltip label={hasCopied ? "Copied!" : "Copy"} placement="right" hasArrow>
                    <IconButton
                        aria-label="Copy code"
                        variant="ghost"
                        size="xs"
                        fontSize="md"
                        colorScheme="gray"
                        icon={hasCopied ? <CheckCircleIcon color="#22c55e" /> : <CopyIcon />}
                        position="absolute"
                        top="-10px"
                        right="-8px"
                        py="2"
                        boxShadow="none !important"
                        onClick={() => {
                            const code = props.children.reduce((a, c) => {
                                if (typeof c === 'string') return a + c
                                return a + c.props.children
                            }, '');

                            navigator.clipboard.writeText(code);
                            onCopy();
                        }
                        }
                    />
                </Tooltip>
            </Box>
        )
    },
    inlineCode: (props) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { colorMode } = useColorMode()
        const bgColor = {
            light: 'gray.100',
            dark: 'gray.700'
        }
        return (
            <Code
                fontSize="0.84em"
                fontWeight={600}
                colorScheme={colorMode === 'dark' ? 'gray' : 'blue'}
                bg={bgColor[colorMode]}
                borderRadius="4"
                pb='0.5'
                px="1"
                {...props}
            />
        )
    },

}

export default MDXComponents