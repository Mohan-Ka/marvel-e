import React from 'react';
import { Main } from './Components/Main';
import './Components/style.css';
import { Routes, Route } from 'react-router-dom';
import { Marvel } from './Components/Marvel';
import { Comics } from './Components/Comics';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/comic/:id" element={<Comics />} />
        <Route path="/character/:id" element={<Marvel />} />

      </Routes>
    </>
  );
}

export default App;
