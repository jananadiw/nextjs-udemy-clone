import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import client from '../lib/apollo-client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Component {...pageProps} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default MyApp;
