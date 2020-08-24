import React from 'react';
import { CssBaseline, Container } from '@material-ui/core'
import FileBrowser from '../FileBrowser'

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <FileBrowser />
      </Container>
    </>
  );
}

export default App;
