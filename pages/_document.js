import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { GoogleFonts } from 'next-google-fonts'
import { ColorModeScript } from '@chakra-ui/react'

export default class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <GoogleFonts href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap' />
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/apple-touch-icon.png'></link>
          <meta name='theme-color' content='#2563eb' />
          <meta name='description' content='A technology and programming blog by Prajwal S Venkateshmurthy, covering web development, software engineering, and more.' />
          <meta name='keywords' content='' />
          <meta name='author' content='Prajwal S Venkateshmurthy' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta name='robots' content='index, follow' />
          <meta name='googlebot' content='index, follow' />
          <meta name='google' content='notranslate' />
        </Head>
        <body>
          <ColorModeScript initialColorMode='dark' />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
