import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'; 
import CreateWallet from './components/CreateWallet';
import DecryptWallet from './components/DecryptWallet'; 

function App() {
  return (
    <Router>
      <div className='app'>
        <Nav />
        <Routes>
          <Route path="/" element={<CreateWallet />} />
          <Route path="/decrypt" element={<DecryptWallet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
