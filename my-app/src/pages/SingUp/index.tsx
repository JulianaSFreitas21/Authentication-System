import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import './index.css';

export function SingUp() {
  const navigete = useNavigate();
  // const {setUsers, users} = useAuth();
  const {singup} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPassworConf] = useState('');
  const [error, setError] = useState('');

  function handleSingup(){
    if(!email || !passwordConf || !password){ 
      setError('Preencha todos os campos');
      return
    }else if(password !== passwordConf){
      setError('As senhas não são iguais');
      return
    };

    // let hasUser = users.filter((user) => user.email === email)

    // if(hasUser.length > 0){
    //   setError('Email já cadastrado');
    //   return;
    // };
   
    
    // setUsers([...users, {email, password}]);

    const res = singup(email, password);
    if (res) {
      setError(res);
      return;
    }

    alert('usuário cadastrado')
    navigete('/');
  }

  return (
    <div className='container'>
      <div className="box">
        <label htmlFor="">SING UP</label>
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
          <Input
          type='password'
          placeholder='Confirm your password'
          value={passwordConf}
          onChange={(e: any) => {setPassworConf(e.target.value);setError('')}}
          />
          <span>{error}</span>
          <Button text='Inscrever-se' onClick={handleSingup}/>
          <div className="singupLabel">
            <p>Already have an account?</p>
            <Link id='link' to="/singin">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
