import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Phone, Shield, Lock, Key, ArrowRight, CheckCircle, Smartphone, AlertCircle } from 'lucide-react';
import { generateRecoveryKey } from '../utils/encryptionUtils';
import { supabase, isSupabaseConfigured, signUp, signInWithPassword, verifyOtp } from '../utils/supabaseClient';
import Toast from '../components/Toast';
import CosmosBackground from '../components/CosmosBackground';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode') || 'signup';
  
  const [step, setStep] = useState(1); // 1: Input, 2: OTP, 3: Key Allotment (Signup only)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  useEffect(() => {
    if (mode === 'signup' && step === 3) {
      setGeneratedKey(generateRecoveryKey());
    }
  }, [mode, step]);

  const handleNext = async () => {
    if (step === 1 && (!email.includes('@') || password.length < 6)) return;
    
    setIsLoading(true);
    
    if (isSupabaseConfigured) {
      if (mode === 'signup') {
        const { error } = await signUp(email, password);
        setIsLoading(false);
        if (error) {
          setToast({ message: error.message, type: 'error' });
          return;
        }
        setToast({ message: 'OTP sent to your email!', type: 'success' });
        setStep(step + 1);
      } else {
        const { error } = await signInWithPassword(email, password);
        setIsLoading(false);
        if (error) {
          setToast({ message: error.message, type: 'error' });
          return;
        }
        setToast({ message: 'Welcome back!', type: 'success' });
        handleFinalize();
      }
    } else {
      // Fallback Simulation
      setTimeout(() => {
        setIsLoading(false);
        if (mode === 'signup') {
          const code = Math.floor(100000 + Math.random() * 900000).toString();
          setSentOtp(code);
          setToast({ message: `[SIM] Signup OTP is: ${code}`, type: 'warning' });
          setStep(step + 1);
        } else {
          setToast({ message: 'Simulation Mode: Login Success', type: 'info' });
          handleFinalize();
        }
      }, 1500);
    }
  };

  const handleVerifyStep = async () => {
    setIsLoading(true);
    
    if (isSupabaseConfigured) {
      const { data, error } = await verifyOtp(email, otp);
      setIsLoading(false);
      if (error) {
        setToast({ message: 'Invalid OTP code.', type: 'error' });
        return;
      }
      setToast({ message: 'Identity Verified!', type: 'success' });
      mode === 'signup' ? setStep(3) : handleFinalize();
    } else {
      // Simulation logic
      setTimeout(() => {
        setIsLoading(false);
        if (otp !== sentOtp) {
          setToast({ message: 'Invalid simulation OTP.', type: 'error' });
          return;
        }
        setToast({ message: 'Simulation: Verified!', type: 'success' });
        mode === 'signup' ? setStep(3) : handleFinalize();
      }, 1000);
    }
  };

  const handleFinalize = () => {
    console.log('🚀 [Cosmo-Auth] Bypassing to Dashboard...');
    navigate('/dashboard');
  };

  return (
    <div style={authContainer}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={authCard}
      >
        <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Shield size={48} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>
            {mode === 'signup' ? 'Create Secure Vault' : 'Secure Login'}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            {mode === 'signup' ? 'Join the 1TB security revolution.' : 'Access your encrypted digital universe.'}
          </p>
          {!isSupabaseConfigured && (
            <div style={warningBadge}>
              <AlertCircle size={14} />
              <span>Running in Simulation Mode</span>
            </div>
          )}
        </header>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={inputGroup}>
                <label style={labelStyle}>Email Address</label>
                <div style={inputWrapper}>
                  <Smartphone size={18} color="var(--text-muted)" />
                  <input 
                    type="email" 
                    placeholder="cosmos@storage.com" 
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div style={inputGroup}>
                <label style={labelStyle}>Password</label>
                <div style={inputWrapper}>
                  <Lock size={18} color="var(--text-muted)" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {password && password.length < 6 && (
                  <p style={{ color: '#ef4444', fontSize: '0.7rem', marginTop: '0.4rem' }}>Password must be at least 6 characters.</p>
                )}
              </div>

              {email && !email.includes('@') && (
                <p style={{ color: '#ef4444', fontSize: '0.7rem', marginBottom: '1rem', textAlign: 'center' }}>
                  Please enter a valid email address with an "@" symbol.
                </p>
              )}

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                {mode === 'signup' ? 'We will send a one-time verification code to this email.' : 'Enter your password to access your vault.'}
              </p>
              
              <button 
                className="btn-primary" 
                style={{ width: '100%' }}
                onClick={handleNext}
                disabled={isLoading || !email.includes('@') || password.length < 6}
              >
                {isLoading ? (mode === 'signup' ? 'Creating Account...' : 'Logging In...') : (mode === 'signup' ? 'Create Account' : 'Login')} <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={inputGroup}>
                <label style={labelStyle}>Email Verification</label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Enter the 6-digit code sent to {email}
                </p>
                <div style={inputWrapper}>
                  <Smartphone size={18} color="var(--text-muted)" />
                  <input 
                    type="text" 
                    placeholder="Enter Code" 
                    style={{ ...inputStyle, textAlign: 'center', letterSpacing: '4px' }}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  />
                </div>
              </div>
              <button 
                className="btn-primary" 
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={handleVerifyStep}
                disabled={isLoading || otp.length < 6}
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>
            </motion.div>
          )}

          {step === 3 && mode === 'signup' && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <CheckCircle size={48} color="#10b981" style={{ marginBottom: '1rem' }} />
                <h4>Identity Verified</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  We have generated your unique Zero-Knowledge Encryption Key. 
                  This key is required to access your data on any device.
                </p>
              </div>
              <div style={keyBox}>
                <Lock size={16} color="var(--secondary)" />
                <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{generatedKey}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>
                ⚠️ Save this key now! We do not store it and cannot recover it for you.
              </p>
              <button 
                className="btn-primary" 
                style={{ width: '100%', marginTop: '2rem' }}
                onClick={handleFinalize}
              >
                Go to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
            <button 
              style={{ background: 'transparent', color: 'var(--secondary)', marginLeft: '0.5rem', fontWeight: 'bold' }}
              onClick={() => {
                setStep(1);
                navigate(`/auth?mode=${mode === 'signup' ? 'login' : 'signup'}`);
              }}
            >
              {mode === 'signup' ? 'Login' : 'Sign Up'}
            </button>
          </p>

          <div style={{ marginTop: '1.5rem' }}>
            <button 
              onClick={handleFinalize}
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                color: 'var(--text-muted)', 
                padding: '0.5rem 1rem', 
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)',
                width: '100%'
              }}
            >
              🚀 Skip to Dashboard (Bypass for Testing)
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      <CosmosBackground />
    </div>
  );
};

const authContainer = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem'
};

const authCard = {
  width: '100%',
  maxWidth: '450px',
  padding: '3rem'
};

const inputGroup = {
  marginBottom: '1.5rem'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.9rem',
  fontWeight: '600',
  marginBottom: '0.5rem',
  color: 'var(--text-main)'
};

const inputWrapper = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '0.75rem',
  padding: '0.8rem 1rem',
  transition: 'var(--transition)'
};

const inputStyle = {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: 'var(--text-main)',
  fontSize: '1rem',
  width: '100%',
  fontFamily: 'inherit'
};

const keyBox = {
  background: 'rgba(6, 182, 212, 0.1)',
  border: '1px dashed var(--secondary)',
  padding: '1.5rem',
  borderRadius: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  justifyContent: 'center',
  color: 'var(--secondary)'
};

const warningBadge = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'rgba(245, 158, 11, 0.1)',
  color: '#f59e0b',
  padding: '0.4rem 0.8rem',
  borderRadius: '2rem',
  fontSize: '0.75rem',
  marginTop: '1rem',
  border: '1px solid rgba(245, 158, 11, 0.2)'
};

export default AuthPage;
