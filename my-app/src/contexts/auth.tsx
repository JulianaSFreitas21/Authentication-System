import { createContext, useState, useEffect, ReactNode } from "react";

type AuthProviderType = {
    singed: boolean,
    setUser: (newState: Object | null) => void,
    user: Object | null,
    setUsers: (newState: Array<any>) => void,
    users: Array<any>,
    singin: (email:string | null, password: string | null) => string | undefined,
    singup: (email:string , password: string) => string | undefined,
    singout: () => void
}

interface AuthProviderProps{
    children: ReactNode,
}

const initialValue = {
    singed: false,
    setUser: () => {},
    user: {},
    setUsers: () => {},
    users: [],
    singin: () => '',
    singup: () => '',
    singout: () => {}
}

export const AuthContext = createContext<AuthProviderType>(initialValue);

export function AuthProvider({children}:AuthProviderProps){
    const [user, setUser] = useState<Object | null>(initialValue.user);
    const [users, setUsers] = useState<any>(initialValue.users);

    useEffect(() => {
        const userToken = localStorage.getItem('user_token');
        const usersStorage = localStorage.getItem('users_db'); 

        if(userToken && usersStorage){
            const hasUser = JSON.parse(usersStorage).filter(
                (user: {email: string}) => user.email === JSON.parse(userToken).email
            );

            if (hasUser) {
                setUser(hasUser[0]);
            }
        }
    },[])

    function singin(email:string | null, password: string | null) {
        const usersStorage = JSON.parse(localStorage.getItem('users_db') || '[]');
        for(var num = 0; num < usersStorage.length; num ++){
            if (usersStorage[num].email === email) {
                if (usersStorage[num].email === email && usersStorage[num].password === password) {
                    const token = Math.random().toString(32).substring(2);
            
                    localStorage.setItem('user_token', JSON.stringify({email, token}));
                    setUser({email, password});
                    return;
                }else{
                    return 'Email ou senha incorretos';
                }
            }else if(num + 1 === usersStorage.length){
                return 'Usuário não cadastrado';
            }
        }
    } 

    function  singup(email:string, password: string) {
        let usersStorage = localStorage.getItem('users_db') || ''; 
        let objUsersStorage = JSON.parse(usersStorage);
        let newUser = [];
        if(Object.values(objUsersStorage).length === 0){
            newUser.push({"email":email,"password": password});
        }else{
            var hasUser = objUsersStorage.filter((user: {email: string}) => user.email === email);
            
            if (hasUser.length > 0) {
                return 'Email já cadastrado';
            }
            newUser = [...objUsersStorage,{"email":email,"password": password}];
        }

        localStorage.setItem('users_db', JSON.stringify(newUser));
    }

    function singout() {
        setUser(null);
        localStorage.removeItem('user_token');
    }

    return (
        <AuthContext.Provider
        value={{user, setUser, users, setUsers, singed: !!user, singin,singup,singout}}
        >
            {children}
        </AuthContext.Provider>
    )
}