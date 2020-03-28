import 'sanitize.css'
import '../components/page/global.css'

import React from 'react'
import App from 'next/app'
import { Page, FirebaseProvider } from '../components'

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <FirebaseProvider
        features={{
          auth: true,
          database: true,
          firestore: false,
          storage: false,
          messaging: true,
          functions: true,
          performance: true,
          analytics: true,
        }}
      >
        <Page>
          <Component {...pageProps} />
        </Page>
      </FirebaseProvider>
    )
  }
}

export default CustomApp
