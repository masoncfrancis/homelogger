import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'

if (!process.env.NEXT_PUBLIC_SERVER_URL) {
  throw new Error('NEXT_PUBLIC_SERVER_URL environment variable is not set, and is required.');
}

export const SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}`;


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}