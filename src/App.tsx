import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'

import HomePage from './pages/homePage/homePage'
import SelectCardPage from './pages/cardsPage/selectCardPage';

function App() {

  return (
    <BrowserRouter basename="/german_card_app">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="cards" element={<SelectCardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
