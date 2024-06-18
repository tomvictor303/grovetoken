// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

import { wrapper } from 'src/store/configureStore';
import CustomReduxBackdrop from 'src/views/custom/backdrop/CustomReduxBackdrop'
import CustomReduxSnackbar from 'src/views/custom/snackbar/CustomReduxSnackbar'
import AjaxInterceptor from 'src/views/custom/AjaxInterceptor'
import { Web3Provider } from 'src/utils/context/Web3/web3Context'
import { UserProvider } from 'src/utils/context/User/UserProvider'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <UserProvider>
      <Web3Provider>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>{`${themeConfig.projectName} | ERC20 token launch`}</title>
            <meta
              name='description'
              content={`${themeConfig.projectName} – ERC20 token launch`}
            />
            <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
            <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>

          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => {
                return <>
                  <ThemeComponent settings={settings}>
                    <CustomReduxBackdrop />
                    <CustomReduxSnackbar />
                    <AjaxInterceptor />
                    {getLayout(<Component {...pageProps} />)}
                  </ThemeComponent>
                </>
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </CacheProvider>
      </Web3Provider>
    </UserProvider>
  )
}

export default wrapper.withRedux(App)
