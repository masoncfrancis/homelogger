import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const SERVER_URL = NEXT_PUBLIC_SERVER_URL ? NEXT_PUBLIC_SERVER_URL : process.env.SERVER_URL;

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}