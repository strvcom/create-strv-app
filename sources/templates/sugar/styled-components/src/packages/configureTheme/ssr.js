import { ServerStyleSheet } from 'styled-components'

const getThemeInitialProps = ({ renderPage }) => {
  const sheet = new ServerStyleSheet()
  const page = renderPage(App => props =>
    sheet.collectStyles(<App {...props} />)
  )
  const styleTags = sheet.getStyleElement()

  return {
    page,
    styleTags,
  }
}

export default getThemeInitialProps
