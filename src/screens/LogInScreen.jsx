import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './LogInScreen.css';

export default function LogInScreen() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleContinue = () => {
    // Simplified: no real auth - go to main app
    nav('/home', { replace: true });
  };

  return (
    <div className="login-screen">
      <main className="login-main">
        <h1 className="login-title">Sign In</h1>

        <label htmlFor="login-email">Email address</label>
        <input
          id="login-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <div className="login-password-wrap">
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="login-show-pwd"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <p className="login-terms">
          By continuing you agree to the <strong>Terms of Use</strong> and <strong>Privacy Policy</strong>
        </p>

        <Button
          variant="primary"
          className="login-continue"
          onClick={handleContinue}
        >
          Continue
        </Button>

        <Button
          variant="ghost"
          className="login-link"
          type="button"
        >
          Reset Password
        </Button>

        <p className="login-signup">
          No account? <strong>Create Account</strong>
        </p>
      </main>
    </div>
  );
}
