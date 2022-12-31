import './index.css';

interface ButtonType{
    text: string,
    onClick: () => void;
}

export function Button({text, onClick}:ButtonType) {
  return (
    <button type='button' onClick={onClick}>{text}</button>
    )
}