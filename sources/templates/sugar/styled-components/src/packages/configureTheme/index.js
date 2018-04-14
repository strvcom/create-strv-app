import React from 'react'
import { ThemeProvider } from 'styled-components'

type PropTypes = {
  children: any,
}

const createThemeProvider = theme => ({ children }: PropTypes) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

const configureTheme = theme => ({
  ThemeProvider: createThemeProvider(theme),
})

export default configureTheme
