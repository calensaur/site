import React from 'react'
import Releases from 'screens/main'
import { getPropsForIndexPage } from 'features/releases/next-page-functions'
import { PageDataProvider } from 'features/releases/page-data'
import { usePushNotifications } from 'features/notifications/use-push-notifications'

function IndexPage(props) {
  usePushNotifications()

  return (
    <PageDataProvider parsedUrl={props.parsedURL}>
      <Releases {...props} />
    </PageDataProvider>
  )
}

export async function getStaticProps() {
  return getPropsForIndexPage()
}

export default IndexPage