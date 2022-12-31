import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import './index.css';

export function SingIn() {
  const {singin} = useAuth();
  const navigete = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin(){
    if(!email || !password){ 
      setError('Preencha todos os campos');
      return
    };

    const res = singin(email, password);

    if(res){
      setError(res);
      return
    };

    navigete('/home');
  }

  return (
    <div className='container'>
      <div className="box">
        <label htmlFor="">LOGIN</label>
        <div className='content'>
          
          <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e: any) => {setEmail(e.target.value); setError('')}}
          />
          <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e: any) => {setPassword(e.target.value); setError('')}}
          />
          <span>{error}</span>
          <Button text='Login' onClick={handleLogin}/>
          <div className="singinLabel">
            <p>Do not have an account?</p>
            <Link id='link' to="/singup">Sing Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
