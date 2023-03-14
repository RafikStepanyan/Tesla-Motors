import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { UseRoutes } from './component/router/UseRouter';

function App() {
  return (
    <BrowserRouter>
      <UseRoutes />
    </BrowserRouter>
  );
}

export default App;
