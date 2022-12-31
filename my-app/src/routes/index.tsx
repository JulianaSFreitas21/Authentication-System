import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from 'react'
import { SingIn } from "../pages/SingIn/index";
import { SingUp } from "../pages/SingUp/index";
import { Home } from "../pages/Home/index";
import { useAuth } from "../hooks/useAuth";

interface PrivateType{
    Item: () => JSX.Element;
}

function Private({Item}: PrivateType) {
    const { singed } = useAuth();
    return singed ? <Item/> : <SingIn/>;
}

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/home" element={<Private Item={Home}/>}/>
          <Route path="/" element={<SingIn/>}/>
          <Route path="/singup" element={<SingUp/>}/>
          <Route path="*" element={<SingIn/>}/>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}