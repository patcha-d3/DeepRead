import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const nav = useNavigate();

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <p className="splash-welcome">welcome to</p>
        <h1 className="splash-title">DeepRead</h1>
        <p className="splash-tagline">
          a reflective bookmark & reading journal app synchronized with Kobo
        </p>
      </div>
      <button className="splash-cta" onClick={() => nav('/login')}>
        Sign In
      </button>
    </div>
  );
}
