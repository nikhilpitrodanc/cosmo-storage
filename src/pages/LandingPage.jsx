import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Cloud, Zap, CheckCircle, Smartphone, Key, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CosmosBackground from '../components/CosmosBackground';

const LandingPage = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav style={navStyle}>
        <div className="logo" style={logoStyle}>
          <Cloud size={32} color="var(--secondary)" />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Cosmo<span className="gradient-text">Storage</span></span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button className="btn-secondary" onClick={() => navigate('/auth?mode=login')}>Login</button>
          <button className="btn-primary" onClick={() => navigate('/auth?mode=signup')}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '800px', textAlign: 'center' }}
        >
          <h1 style={heroTitleStyle}>
            Your Digital Universe, <br />
            <span className="gradient-text">Securely Encrypted.</span>
          </h1>
          <p style={heroSubtextStyle}>
            The future of storage is here. Get 1TB of ultra-secure, zero-knowledge cloud storage for free. 
            Protect your data with military-grade encryption and access it anywhere, anytime.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '3rem' }}>
            <button className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }} onClick={() => navigate('/auth?mode=signup')}>
              Claim Your 1TB Free
            </button>
            <button 
              className="btn-secondary" 
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
              onClick={() => scrollToSection('how-it-works')}
            >
              How it Works
            </button>
          </div>
        </motion.div>

        {/* Floating Hero Image/Visual */}
        <motion.div 
          className="animate-float"
          style={heroVisualContainer}
        >
          <div className="glass-card" style={heroCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <Shield size={24} color="var(--secondary)" />
              <span style={{ fontWeight: '600' }}>AES-256 Encryption Active</span>
            </div>
            <div style={storageMeterStyle}>
              <div style={storageProgressStyle}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              <span>0 GB Used</span>
              <span>1024 GB Free</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" style={howItWorksSectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>How It <span className="gradient-text">Works</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Your journey to ultimate data security in three simple steps.</p>
        </div>

        <div style={stepsGridStyle}>
          <div style={stepCardStyle}>
            <div style={stepNumberStyle}>1</div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <Lock size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h4>Local Encryption</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Before any data leaves your device, it's fragmented and encrypted using AES-256 GCM. 
                Your keys never touch our servers.
              </p>
            </div>
          </div>

          <div style={stepCardStyle}>
            <div style={stepNumberStyle}>2</div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <Database size={32} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
              <h4>Cosmic Distribution</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Your encrypted fragments are distributed across our global secure node network, 
                ensuring redundancy and 99.999% availability.
              </p>
            </div>
          </div>

          <div style={stepCardStyle}>
            <div style={stepNumberStyle}>3</div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <Smartphone size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h4>Instant Restore</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Access your files from any verified device. Use your biometric key or 
                recovery phrase to decrypt and reassemble your data instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={featuresSectionStyle}>
        <div className="glass-card" style={featureCardStyle}>
          <Lock size={40} color="var(--primary)" />
          <h3>Zero-Knowledge</h3>
          <p>Even we can't see your data. Your keys, your files, your privacy.</p>
        </div>
        <div className="glass-card" style={featureCardStyle}>
          <Zap size={40} color="var(--secondary)" />
          <h3>Lightning Speed</h3>
          <p>Optimized edge networks for instant backups and restores.</p>
        </div>
        <div className="glass-card" style={featureCardStyle}>
          <Shield size={40} color="var(--accent)" />
          <h3>Quantum Ready</h3>
          <p>Advanced encryption algorithms designed for the next era of security.</p>
        </div>
      </section>

      {/* 1TB Badge */}
      <div style={badgeContainerStyle}>
        <div className="glass-card" style={badgeStyle}>
          <CheckCircle size={20} color="var(--secondary)" />
          <span>1TB Free Lifetime Storage Included</span>
        </div>
      </div>

      <CosmosBackground />
    </div>
  );
};

// Inline Styles
const navStyle = {
  padding: '1.5rem 5%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
  background: 'rgba(2, 6, 23, 0.2)',
  backdropFilter: 'blur(30px) saturate(200%)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const heroSectionStyle = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 10%',
  paddingTop: '5rem',
  position: 'relative'
};

const heroTitleStyle = {
  fontSize: '4.5rem',
  fontWeight: '800',
  lineHeight: '1.1',
  marginBottom: '1.5rem'
};

const heroSubtextStyle = {
  fontSize: '1.25rem',
  color: 'var(--text-muted)',
  lineHeight: '1.6',
  maxWidth: '700px',
  margin: '0 auto'
};

const heroVisualContainer = {
  marginTop: '5rem',
  width: '100%',
  maxWidth: '400px'
};

const heroCardStyle = {
  padding: '1.5rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '1.5rem'
};

const storageMeterStyle = {
  height: '8px',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '4px',
  overflow: 'hidden'
};

const storageProgressStyle = {
  width: '15%',
  height: '100%',
  background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
  boxShadow: '0 0 10px var(--primary)'
};

const featuresSectionStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
  padding: '5rem 10%',
  background: 'transparent'
};

const featureCardStyle = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem'
};

const badgeContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: '5rem'
};

const badgeStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.5rem',
  borderRadius: '2rem',
  fontSize: '0.9rem',
  border: '1px solid var(--secondary)'
};

const howItWorksSectionStyle = {
  padding: '8rem 10%',
  background: 'transparent',
  position: 'relative'
};

const stepsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '3rem'
};

const stepCardStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const stepNumberStyle = {
  position: 'absolute',
  top: '-1rem',
  left: '2rem',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '800',
  fontSize: '1.2rem',
  zIndex: 10,
  boxShadow: '0 0 20px var(--primary-glow)'
};

export default LandingPage;
