import { useColorMode, IconButton, Flex } from '@chakra-ui/react'
import { SunIcon, MoonIcon, ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'

const DarkModeSwitch = ({ showBackButton }) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const iconColor = {
        light: 'black',
        dark: 'white'
    }

    const onShare = () => {
        const url = window.location.href;
        if (navigator.share) {
            const title = document.title.split(' - ')[0];
            const text = 'Check out this article by Prajwal S Venkateshmurthy!\n';
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
            <Tooltip label='Share'>
                <IconButton
                    aria-label="Toggle dark mode"
                    icon={<ExternalLinkIcon />}
                    onClick={onShare}
                    color={iconColor[colorMode]}
                />
            </Tooltip>
            <Tooltip label='Toggle Theme'>
                <IconButton
                    aria-label="Toggle dark mode"
                    icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                    onClick={toggleColorMode}
                    color={iconColor[colorMode]}
                />
            </Tooltip>
        </Flex>
    )
}

export default DarkModeSwitch