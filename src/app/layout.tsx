'use client'
import 'bootstrap/dist/css/bootstrap.css';
import { PrimeReactProvider } from 'primereact/api';
import { LayoutProvider } from '../layout/context/layoutcontext';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import { ReduxProvider } from '@/redux/provider';
import BootstrapClient from './shared/components/bootstrap/BootstrapClient.js'
// import StoreProvider from './StoreProvider';
// import '../styles/demo/Demos.scss';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link id="theme-css" href={`/themes/bootstrap4-dark-blue/theme.css`} rel="stylesheet"></link>
      </head>
      <body>
        <PrimeReactProvider>
          {/* <StoreProvider></StoreProvider> */}
          <LayoutProvider>
            <ReduxProvider>
              {children}
              <BootstrapClient />
            </ReduxProvider>

          </LayoutProvider>
        </PrimeReactProvider>
      </body>
    </html>
  )
}
