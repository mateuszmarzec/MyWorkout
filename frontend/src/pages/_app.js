import { Provider } from 'react-redux'
import store from '../app/store'
import Layout from '../components/layouts/Layout';
import { appWithTranslation } from 'next-i18next';
import nextI18nextConfig from '../../next-i18next.config';
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return <Provider store={store}>
    <Layout>
        <Component {...pageProps} />
    </Layout>
  </Provider>
}

export default appWithTranslation(App, nextI18nextConfig)
