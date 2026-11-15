/**
 * App.tsx — Root component
 *
 * Minimal root: just mounts LeadCaptureScreen.
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { LeadCaptureScreen } from './src/features/lead/LeadCaptureScreen';

export default function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <LeadCaptureScreen />
    </>
  );
}
