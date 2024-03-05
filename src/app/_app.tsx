// pages/_app.tsx
import { Provider } from 'react-redux';
import { useStore } from '@/presentation/hooks/useStore';

export default function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}