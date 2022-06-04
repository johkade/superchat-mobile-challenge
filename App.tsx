import React from 'react';
import {View} from 'react-native';
import RootStack from './src/nav/rootStack';
import useInitFonts from './src/style/theme/hooks/useInitFonts';
import {QueryClient, QueryClientProvider} from 'react-query';
import ThemedStatusBar from './src/components/themedStatusBar';

const queryClient = new QueryClient();

export default function App() {
  const {fontsLoaded} = useInitFonts();

  return (
    <QueryClientProvider client={queryClient}>
      {fontsLoaded ? <RootStack /> : <View />}
      <ThemedStatusBar />
    </QueryClientProvider>
  );
}
