import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Key, 
  Smartphone, 
  Lock, 
  AlertTriangle,
  ChevronRight,
  Info,
  Unlock,
  Archive
} from 'lucide-react';
import Toast from '../components/Toast';

const SecurityHub = ({ score }) => {
  const [showRestore, setShowRestore] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [restoreStatus, setRestoreStatus] = useState('idle'); // idle, processing, success
  const [toast, setToast] = useState(null);
  const [showKeyModal, setShowKeyModal] = useState(false);

  const recommendations = [
    {
      title: 'Enable Two-Factor Authentication',
      description: 'Add an extra layer of security to your account with TOTP or Biometrics.',
      impact: 'High',
      status: 'Action Required',
      icon: <Smartphone size={24} color="var(--primary)" />
    },
    {
      title: 'Backup Recovery Key',
      description: 'Ensure your master recovery key is stored in a physically secure location.',
      impact: 'Critical',
      status: 'Pending',
      icon: <Key size={24} color="var(--secondary)" />
    },
    {
      title: 'Auto-Lock Inactive Sessions',
      description: 'Automatically log out from devices after 15 minutes of inactivity.',
      impact: 'Medium',
      status: 'Enabled',
      icon: <Lock size={24} color="#10b981" />
    }
  ];

  const handleFix = (title) => {
    if (title === 'Backup Recovery Key') {
      setShowKeyModal(true);
    } else {
      setToast({ message: `${title} logic is simulated for this demo.`, type: 'info' });
    }
  };

  return (
    <div style={containerStyle}>
      <header style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Security <span className="gradient-text">Hub</span></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage your data protection strategy and recovery protocols.</p>
      </header>

      <div style={gridStyle}>
        {/* Security Score */}
        <div className="glass-card" style={scoreCard}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Security Score</h3>
          <div style={scoreCircle}>
            <div style={scoreValue}>{score}</div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
            Your security is <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Strong</span>. Complete pending actions to reach 100.
          </p>
        </div>

        {/* Recommendations */}
        <div style={{ flex: 2 }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Recommendations <Info size={18} color="var(--text-muted)" />
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recommendations.map((rec, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 10 }}
                className="glass-card" 
                style={recCard}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={iconWrapper}>{rec.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{rec.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{rec.description}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px',
                      background: rec.status === 'Enabled' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: rec.status === 'Enabled' ? '#10b981' : '#ef4444',
                      fontWeight: 'bold'
                    }}>
                      {rec.status}
                    </span>
                    <div 
                      onClick={() => handleFix(rec.title)}
                      style={{ 
                        marginTop: '0.5rem', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end', 
                        color: 'var(--secondary)',
                        transition: 'var(--transition)'
                      }}
                      className="hover-glow"
                    >
                      Fix Now <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Backup Modal */}
      {showKeyModal && (
        <div style={overlayStyle}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card"
            style={modalStyle}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Key size={24} color="var(--secondary)" />
                <h3 style={{ fontSize: '1.5rem' }}>Master Recovery Key</h3>
              </div>
              <button onClick={() => setShowKeyModal(false)} style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '1.5rem' }}>×</button>
            </div>
            
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              This key is the ONLY way to recover your data if you lose your password. We do not store this key.
            </p>

            <div style={{ 
              background: 'rgba(6, 182, 212, 0.05)', 
              border: '1px dashed var(--secondary)', 
              padding: '1.5rem', 
              borderRadius: '0.75rem', 
              textAlign: 'center',
              fontFamily: 'monospace',
              fontSize: '1.2rem',
              color: 'var(--secondary)',
              letterSpacing: '2px',
              marginBottom: '2rem'
            }}>
              CS-89V2-LP0Q-X921-M0K3
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%' }}
              onClick={() => {
                setToast({ message: 'Key copied to clipboard! Keep it safe.', type: 'success' });
                setShowKeyModal(false);
              }}
            >
              Copy & Verify Backup
            </button>
          </motion.div>
        </div>
      )}

      {/* Emergency Recovery Section */}
      <div className="glass-card" style={recoveryBanner}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <AlertTriangle size={32} color="#f59e0b" />
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem' }}>Emergency Recovery Mode</h4>
            <p style={{ color: 'var(--text-muted)' }}>Lost access to your account? Initiate a secure identity-based recovery process.</p>
          </div>
          <button 
            className="btn-secondary" 
            style={{ borderColor: '#f59e0b', color: '#f59e0b' }}
            onClick={() => setShowRestore(true)}
          >
            Start Recovery
          </button>
        </div>
      </div>

      {/* Restore Simulation Modal */}
      {showRestore && (
        <div style={overlayStyle}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card"
            style={modalStyle}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Unlock size={24} color="var(--secondary)" />
                <h3 style={{ fontSize: '1.5rem' }}>Secure Restore</h3>
              </div>
              <button onClick={() => setShowRestore(false)} style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '1.5rem' }}>×</button>
            </div>

            {restoreStatus === 'idle' && (
              <>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Enter your 24-character Recovery Key to reassemble and decrypt your cosmic data fragments on this device.
                </p>
                <input 
                  type="text" 
                  placeholder="XXXX-XXXX-XXXX-XXXX-XXXX-XXXX" 
                  style={inputStyle}
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                />
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '1.5rem' }}
                  onClick={() => {
                    if (inputKey.length < 10) {
                      setToast({ message: 'Invalid key format. Please enter your 24-character key.', type: 'error' });
                      return;
                    }
                    setRestoreStatus('processing');
                    setTimeout(() => {
                      setRestoreStatus('success');
                      setToast({ message: 'Cosmic data fragments reassembled!', type: 'success' });
                    }, 2000);
                  }}
                >
                  Verify & Decrypt
                </button>
              </>
            )}

            {restoreStatus === 'processing' && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="animate-spin" style={{ margin: '0 auto 1.5rem' }}><Archive size={48} color="var(--secondary)" /></div>
                <h4>Reassembling Fragments...</h4>
                <p style={{ color: 'var(--text-muted)' }}>Connecting to secure nodes and applying your private key.</p>
              </div>
            )}

            {restoreStatus === 'success' && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ margin: '0 auto 1.5rem' }}><ShieldCheck size={64} color="#10b981" /></div>
                <h4 style={{ fontSize: '1.5rem' }}>Data Restored!</h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your digital universe has been successfully reassembled on this device.</p>
                <button className="btn-primary" style={{ width: '100%' }} onClick={() => setShowRestore(false)}>Access Files</button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      {/* Info Section */}
      <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid var(--border)' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Info size={18} color="var(--secondary)" /> 
          How Security Keys Work
        </h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
          Cosmo Storage follows a <strong>Zero-Knowledge</strong> protocol. This means your encryption key is only held by <strong>you</strong>. 
          When you use a new device, you must input your Recovery Key to allow that device to decrypt your files locally. 
          We recommend storing your key in a physical safe or a dedicated offline password manager.
        </p>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '2rem 0'
};

const gridStyle = {
  display: 'flex',
  gap: '2rem',
  alignItems: 'flex-start',
  flexWrap: 'wrap'
};

const scoreCard = {
  flex: 1,
  minWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '3rem 2rem',
  background: 'rgba(255, 255, 255, 0.08)'
};

const scoreCircle = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  border: '8px solid rgba(255, 255, 255, 0.05)',
  borderTopColor: 'var(--secondary)',
  borderRightColor: 'var(--primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)',
  background: 'rgba(255, 255, 255, 0.02)'
};

const scoreValue = {
  fontSize: '3.5rem',
  fontWeight: '800',
  fontFamily: 'monospace'
};

const recCard = {
  padding: '1.5rem'
};

const iconWrapper = {
  width: '50px',
  height: '50px',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.03)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const recoveryBanner = {
  marginTop: '3rem',
  border: '1.5px solid rgba(245, 158, 11, 0.4)',
  background: 'rgba(245, 158, 11, 0.1)',
  boxShadow: '0 0 30px rgba(245, 158, 11, 0.1)'
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(2, 6, 23, 0.95)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
  backdropFilter: 'blur(10px)'
};

const modalStyle = {
  maxWidth: '500px',
  width: '90%',
  padding: '3rem'
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid var(--border)',
  borderRadius: '0.75rem',
  color: 'var(--text-main)',
  fontFamily: 'monospace',
  fontSize: '1.1rem',
  textAlign: 'center',
  outline: 'none'
};

export default SecurityHub;
