
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminRoutes from './Adminview/AdminMain'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <AdminRoutes />
      </Router>


    </>
  );
}

export default App;
