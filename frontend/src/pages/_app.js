import { Provider } from 'react-redux'
import store from '../app/store'
import Layout from '../components/layouts/Layout';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/index';
import { appWithTranslation } from 'next-i18next';
import nextI18nextConfig from '../../next-i18next.config';
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

// To make FontAwesome CSS working
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

function App({ Component, pageProps }) {
  return <Provider store={store}>
    <Navbar/>
    <Layout>
        <Component {...pageProps} />
    </Layout>
    <Footer/>
  </Provider>
}

export default appWithTranslation(App, nextI18nextConfig)
