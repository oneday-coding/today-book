import { useNavigate } from 'react-router-dom';

interface LogoProps {
  fontSize?: string;
}

export default function Logo({fontSize = '20px'}: LogoProps) {
  const navigate = useNavigate();

  return (
    <a
      className={`inline-block font-pacifico`}
      style={{ fontSize: fontSize }}
      onClick={() => {
        navigate('/');
      }}
    >
      logo
    </a>
  );
}
