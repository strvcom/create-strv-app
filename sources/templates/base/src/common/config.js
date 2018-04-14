/* eslint-disable no-undef */

const config = {
  environment: {
    development: process.env.NODE_ENV !== 'production',
    production: process.env.NODE_ENV === 'production',
  },
}

export default config
