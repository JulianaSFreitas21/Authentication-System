import './index.css';

interface InputType{
    type: string,
    value: string,
    placeholder: string,
    onChange: (e: any) => void;
}

export function Input({type, value, placeholder, onChange}:InputType) {
  return (
    <input value={value} type={type} placeholder={placeholder} onChange={onChange}/>
    )
}