import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {View} from 'react-native';
import RootStack from './src/nav/rootStack';
import useInitFonts from './src/style/theme/hooks/useInitFonts';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  const {fontsLoaded} = useInitFonts();

  return (
    <QueryClientProvider client={queryClient}>
      {fontsLoaded ? <RootStack /> : <View />}
      <StatusBar style={'auto'} />
    </QueryClientProvider>
  );
}
