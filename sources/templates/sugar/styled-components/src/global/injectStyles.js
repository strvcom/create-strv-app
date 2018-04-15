import { injectGlobal } from 'styled-components'
import { normalize } from 'polished'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${normalize}
  
  html {
    // set 1rem to 10px on default browser scale
    font-size: 62.5%;
  }
  
  body {
    // set content size back to 16px (on default scale) while preserving 1rem = 10px
    font-size: 1.6rem;
    margin: 0;
  }
`
