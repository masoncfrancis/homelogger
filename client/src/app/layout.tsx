import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-bs-theme='dark' lang='en'>
      <body>
        {children}
      </body>
    </html>
  )
}