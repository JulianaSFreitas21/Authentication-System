import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import './index.css';

export function Home() {
  const {singout} = useAuth();
  const navigate = useNavigate();
  return (
    <div className='container'>
      <div className="box">
        <h3>Wellcome to home page!</h3>
        <p>This was just a demo of a simple login and sign up system with authentication to show off my React skills</p>
        <p>Thanks for making it this far and I hope you enjoyed it ^_^</p>
        <Button text='Out' onClick={() => {singout(); navigate('/')}}/>
      </div>
    </div>
  );
}
