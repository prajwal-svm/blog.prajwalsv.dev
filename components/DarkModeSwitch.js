import { useColorMode, IconButton, Flex } from '@chakra-ui/react'
import { SunIcon, MoonIcon, ArrowBackIcon } from '@chakra-ui/icons'

const DarkModeSwitch = ({showBackButton}) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const iconColor = {
        light: 'black',
        dark: 'white'
    }
    return (
        <Flex w={showBackButton ? 100 : 50} justifyContent='space-between'>
        {showBackButton && <IconButton
            aria-label="Go Back Home"
            icon={<ArrowBackIcon/>}
            onClick={() => window.history.go(-1)}
            color={iconColor[colorMode]}
        />}
        <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            color={iconColor[colorMode]}
        />
        </Flex>
    )
}

export default DarkModeSwitch