import './App.css';
import { EmailAuthProvider, getAuth } from 'firebase/auth';
import app from './Firebase/firebase.init';
import Register from './components/Register';
import ReactRegisterBootstrap from './components/ReactRegisterBootstrap';
import RegisterBootstrap from './components/RegisterBootstrap';

const auth = getAuth(app);

function App() {
  const emailProvider = new EmailAuthProvider();

  return (
    <div className="">
      <Register></Register>
      <ReactRegisterBootstrap></ReactRegisterBootstrap>
      <RegisterBootstrap></RegisterBootstrap>
    </div>
  );
}

export default App;
