import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'

export const SERVER_URL = '/api';


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}