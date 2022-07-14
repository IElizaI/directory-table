import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Companies from './components/Companies';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Companies />} />
    </Routes>
  </BrowserRouter>
);

export default App;
