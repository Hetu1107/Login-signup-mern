import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';

import PrivateRoute from './components/routing/PrivateRoute';
import PrivateSceen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
        <Route path="/" element={<PrivateSceen><PrivateSceen/></PrivateSceen>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/register' element={<RegisterScreen/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
