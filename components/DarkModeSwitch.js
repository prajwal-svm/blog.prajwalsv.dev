import { useColorMode, IconButton, Flex, useClipboard } from '@chakra-ui/react'
import { SunIcon, MoonIcon, ArrowBackIcon, ExternalLinkIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'

const DarkModeSwitch = ({ showBackButton }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { onCopy, hasCopied } = useClipboard("");

    const iconColor = {
        light: 'black',
        dark: 'white'
    }

    const onShare = () => {
        const url = window.location.href;
        if (navigator.share) {
            const title = document.title.split(' - ')[0];
            const text = 'Check out this insightful article by Prajwal S Venkateshmurthy!\n';
            navigator.share({
                title,
                text,
                url
            })
        } else {
            const el = document.createElement('textarea')
            el.value = url
            el.setAttribute('readonly', '')
            el.style.position = 'absolute'
            el.style.left = '-9999px'

            document.body.appendChild(el)
            el.select()
            document.execCommand('copy')
            document.body.removeChild(el)
            onCopy();
        }
    }


    return (
        <Flex w={showBackButton ? 150 : 100} justifyContent='space-between'>
            {showBackButton &&
                <Tooltip label='Go Back'>
                    <IconButton
                        aria-label="Go Back Home"
                        icon={<ArrowBackIcon />}
                        onClick={() => window.history.go(-1)}
                        color={iconColor[colorMode]}
                    />
                </Tooltip>
            }
            <Tooltip label={hasCopied ? "Link Copied To Clipboard!" : "Share"}>
                <IconButton
                    aria-label="Share Article"
                    icon={hasCopied ? <CheckCircleIcon /> : <ExternalLinkIcon />}
                    onClick={onShare}
                    color={iconColor[colorMode]}
                    boxShadow="none !important"
                />
            </Tooltip>
            <Tooltip label='Toggle Theme'>
                <IconButton
                    aria-label="Toggle dark mode"
                    icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                    onClick={toggleColorMode}
                    color={iconColor[colorMode]}
                    boxShadow="none !important"
                />
            </Tooltip>
        </Flex>
    )
}

export default DarkModeSwitch