import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle color="#10b981" size={20} />,
    error: <XCircle color="#ef4444" size={20} />,
    warning: <AlertCircle color="#f59e0b" size={20} />,
    info: <Info color="var(--secondary)" size={20} />
  };

  const colors = {
    success: 'rgba(16, 185, 129, 0.1)',
    error: 'rgba(239, 68, 68, 0.1)',
    warning: 'rgba(245, 158, 11, 0.1)',
    info: 'rgba(6, 182, 212, 0.1)'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 20, x: '-50%' }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${colors[type]}`,
        borderRadius: '12px',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
        minWidth: '300px'
      }}
    >
      {icons[type]}
      <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', flex: 1 }}>{message}</span>
      <button 
        onClick={onClose}
        style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
      >
        ×
      </button>
    </motion.div>
  );
};

export default Toast;
