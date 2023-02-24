import './App.css';
import { EmailAuthProvider, getAuth } from 'firebase/auth';
import app from './Firebase/firebase.init';
import Register from './components/Register';

const auth = getAuth(app);

function App() {
  const emailProvider = new EmailAuthProvider();

  return (
    <div className="App">
      <Register></Register>
    </div>
  );
}

export default App;
