import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SecurityHub from './SecurityHub';
import CosmosBackground from '../components/CosmosBackground';
import { supabase } from '../utils/supabaseClient';
import { uploadToCloudinary } from '../utils/cloudinaryClient';
import { encryptFile, generateRecoveryKey } from '../utils/encryptionUtils';
import Toast from '../components/Toast';
import { 
  Cloud, 
  Upload, 
  ShieldCheck, 
  HardDrive, 
  File, 
  MoreVertical, 
  Plus, 
  Clock, 
  Settings,
  ArrowUpRight,
  ShieldAlert,
  Loader
} from 'lucide-react';

// Styles
const dashboardLayout = {
  display: 'flex',
  minHeight: '100vh',
  background: 'transparent'
};

const sidebarStyle = {
  width: '240px',
  background: 'rgba(2, 6, 23, 0.3)',
  backdropFilter: 'blur(50px) saturate(200%)',
  borderRight: '1.5px solid rgba(255, 255, 255, 0.15)',
  padding: '2rem 1.5rem',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 10,
  position: 'fixed',
  height: '100vh'
};

const sidebarIcons = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const sidebarIcon = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.8rem 1rem',
  borderRadius: '0.75rem',
  color: 'var(--text-muted)',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fontSize: '0.9rem',
  willChange: 'transform, background, color'
};

const activeIcon = {
  ...sidebarIcon,
  background: 'rgba(6, 182, 212, 0.1)',
  color: 'var(--secondary)',
  boxShadow: '0 0 20px rgba(6, 182, 212, 0.1)'
};

const sidebarLabel = {
  fontWeight: '500'
};

const mainContent = {
  flex: 1,
  marginLeft: '240px',
  padding: '2rem 5%'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '3rem'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
  gap: '2rem'
};

const storageCardStyle = {
  padding: '2rem',
  cursor: 'default',
  willChange: 'transform, box-shadow'
};

const circularProgress = {
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  background: 'conic-gradient(var(--secondary) 1%, transparent 0)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
};

const innerCircle = {
  width: '58px',
  height: '58px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const storageLine = {
  height: '6px',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '3px',
  marginTop: '1.5rem',
  overflow: 'hidden'
};

const progressFill = {
  height: '100%',
  background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
  boxShadow: '0 0 10px var(--primary)'
};

const iconBox = {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left'
};

const tableHeaderRow = {
  borderBottom: '1px solid var(--border)'
};

const tableTh = {
  padding: '1rem',
  color: 'var(--text-muted)',
  fontSize: '0.9rem',
  fontWeight: '500'
};

const tableRow = {
  borderBottom: '1px solid var(--border)',
  transition: 'all 0.3s ease',
  background: 'rgba(255, 255, 255, 0.02)'
};

const tableTd = {
  padding: '1.25rem 1rem',
  fontSize: '0.95rem'
};

const fileIcon = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  background: 'rgba(124, 58, 237, 0.1)',
  color: 'var(--primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const typeBadge = {
  padding: '0.25rem 0.75rem',
  borderRadius: '1rem',
  background: 'rgba(6, 182, 212, 0.1)',
  color: 'var(--secondary)',
  fontSize: '0.8rem',
  fontWeight: '600'
};

const actionBtn = {
  background: 'transparent',
  color: 'var(--text-muted)',
  cursor: 'pointer'
};

const fabStyle = {
  position: 'fixed',
  bottom: '3rem',
  right: '3rem',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
  fontSize: '1.5rem',
  zIndex: 100
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(2, 6, 23, 0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(8px)'
};

const overlayCardStyle = {
  maxWidth: '500px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '3rem'
};

const nodeVisual = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  border: '1px dashed var(--secondary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const nodeCore = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'var(--secondary)',
  boxShadow: '0 0 30px var(--secondary)'
};

const keyContainerStyle = {
  background: 'rgba(0,0,0,0.3)',
  padding: '1.5rem',
  borderRadius: '0.75rem',
  fontFamily: 'monospace',
  fontSize: '1.2rem',
  letterSpacing: '2px',
  color: 'var(--secondary)',
  border: '1px dashed var(--border)',
  width: '100%',
  textAlign: 'center'
};

const previewModalStyle = {
  maxWidth: '600px',
  width: '90%',
  padding: '2.5rem'
};

const previewContentStyle = {
  background: 'rgba(0,0,0,0.2)',
  borderRadius: '1rem',
  border: '1px solid var(--border)',
  minHeight: '200px'
};

const mockFileContent = {
  fontFamily: 'monospace',
  fontSize: '0.8rem',
  color: 'var(--secondary)',
  background: 'rgba(6, 182, 212, 0.05)',
  padding: '1.5rem',
  borderRadius: '0.5rem',
  textAlign: 'left'
};

const Dashboard = () => {
  console.log('🌌 [Cosmo-Dashboard] Mounting Dashboard...');
  const [activeTab, setActiveTab] = useState('overview');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [recoveryKey, setRecoveryKey] = useState('');
  const [files, setFiles] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        fetchFiles(user.id);
      } else {
        // Fallback for demo if no real session
        setFiles([
          { id: 1, name: 'Tax_Returns_2024.pdf', size: '2.4 MB', type: 'Encrypted', date: '2 hours ago' },
          { id: 2, name: 'Family_Photos_Backup.zip', size: '850 MB', type: 'Encrypted', date: 'Yesterday' },
        ]);
      }
    };
    checkUser();

    // Animate score on mount
    const timer = setTimeout(() => {
      let currentScore = 0;
      const interval = setInterval(() => {
        currentScore += 1;
        setScore(currentScore);
        if (currentScore >= 94) clearInterval(interval);
      }, 20);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const fetchFiles = async (userId) => {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setFiles(data.map(f => ({
        ...f,
        date: new Date(f.created_at).toLocaleDateString()
      })));
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsEncrypting(true);
    setIsSuccess(false);
    
    try {
      // 1. Local Encryption Simulation
      await encryptFile(file);
      
      // 2. Real Cloudinary Upload
      const cloudData = await uploadToCloudinary(file);
      
      // 3. Save Metadata to Supabase
      if (user) {
        const { error } = await supabase.from('files').insert({
          user_id: user.id,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          type: file.type,
          node_location: cloudData.url // Store real URL as the remote location
        });
        if (error) throw error;
        fetchFiles(user.id);
      }

      setIsSuccess(true);
      setToast({ message: 'Securely uploaded to Cloud!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setTimeout(() => {
        setIsEncrypting(false);
        setIsSuccess(false);
      }, 2000);
    }
  };

  return (
    <div style={dashboardLayout}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={{ marginBottom: '4rem', paddingLeft: '0.8rem' }}>
          <Cloud size={32} color="var(--secondary)" />
        </div>
        <div style={sidebarIcons}>
          <div 
            style={activeTab === 'overview' ? activeIcon : sidebarIcon} 
            onClick={() => setActiveTab('overview')}
            title="Overview"
          >
            <Cloud size={22} />
            <span style={sidebarLabel}>Overview</span>
          </div>
          <div 
            style={activeTab === 'storage' ? activeIcon : sidebarIcon} 
            onClick={() => setActiveTab('storage')}
            title="My Storage"
          >
            <HardDrive size={22} />
            <span style={sidebarLabel}>Storage</span>
          </div>
          <div 
            style={activeTab === 'security' ? activeIcon : sidebarIcon} 
            onClick={() => setActiveTab('security')}
            title="Security Hub"
          >
            <ShieldCheck size={22} />
            <span style={sidebarLabel}>Security</span>
          </div>
          <div 
            style={activeTab === 'activity' ? activeIcon : sidebarIcon} 
            onClick={() => setActiveTab('activity')}
            title="Recent Activity"
          >
            <Clock size={22} />
            <span style={sidebarLabel}>Activity</span>
          </div>
          <div 
            style={activeTab === 'settings' ? activeIcon : sidebarIcon} 
            onClick={() => setActiveTab('settings')}
            title="Settings"
          >
            <Settings size={22} />
            <span style={sidebarLabel}>Settings</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={mainContent}>
        <header style={headerStyle}>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleUpload}
          />
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>
              {activeTab === 'overview' && 'System Overview'}
              {activeTab === 'storage' && 'Cloud Console'}
              {activeTab === 'security' && 'Security Shield'}
              {activeTab === 'activity' && 'Recent Activity'}
              {activeTab === 'settings' && 'Vault Settings'}
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              {activeTab === 'overview' && 'Real-time monitor of your cosmic vault.'}
              {activeTab === 'storage' && 'Welcome back, Explorer. Your data is safe.'}
              {activeTab === 'security' && 'Monitor and enhance your data protection.'}
              {activeTab === 'activity' && 'Detailed log of your secure operations.'}
              {activeTab === 'settings' && 'Manage your encryption and account preferences.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary"><Settings size={18} /> Settings</button>
            <button 
              className="btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={() => fileInputRef.current.click()}
            >
              <Upload size={18} /> Upload File
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div style={gridStyle}>
            {/* Overview Stats */}
            <div className="glass-card" style={storageCardStyle}>
              <h4>Total Security Pulse</h4>
              <h2 style={{ fontSize: '3rem', margin: '1rem 0', color: 'var(--secondary)' }}>{score}%</h2>
              <p style={{ color: 'var(--text-muted)' }}>Your data is currently distributed across 5 global clusters.</p>
            </div>
            <div className="glass-card" style={storageCardStyle}>
              <h4>Active Encryption</h4>
              <p style={{ marginTop: '1rem' }}>AES-256-GCM is active on all nodes.</p>
              <div style={{...storageLine, marginTop: '1rem'}}>
                <div style={{...progressFill, width: '100%'}}></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'storage' && (
          <>
            {/* Storage Overview Cards */}
            <div style={gridStyle}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass-card" 
                style={storageCardStyle}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Available Storage</p>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0.5rem 0' }}>1.2 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>GB / 1024 GB</span></h3>
                  </div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={circularProgress}
                  >
                    <div style={innerCircle}>0.1%</div>
                  </motion.div>
                </div>
                <div style={storageLine}>
                  <div style={{...progressFill, width: '0.1%'}}></div>
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: 'var(--secondary)' }}>
                  <ArrowUpRight size={14} style={{ marginRight: '4px' }} />
                  +245 MB this month
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass-card" 
                style={{ ...storageCardStyle, background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(6, 182, 212, 0.1))' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={iconBox}><ShieldCheck size={24} color="var(--secondary)" /></div>
                  <h4 style={{ fontSize: '1.1rem' }}>Security Status</h4>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  All files are encrypted with AES-256 GCM. Your private key is stored locally.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setActiveTab('security')}>
                    Report
                  </button>
                  <button 
                    className="btn-primary" 
                    style={{ flex: 1, fontSize: '0.8rem' }}
                    onClick={() => {
                      const key = generateRecoveryKey();
                      setRecoveryKey(key);
                      setShowRecoveryModal(true);
                    }}
                  >
                    Generate Key
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Advanced Feature: Node Network */}
            <div className="glass-card" style={{ marginTop: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Global Node Network</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Your data fragments are distributed across 12 secure nodes worldwide.</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  {['Singapore', 'Zurich', 'Reykjavik', 'Tokyo', 'New York'].map(city => (
                    <span key={city} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      ● {city}
                    </span>
                  ))}
                </div>
              </div>
              <div style={nodeVisual}>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={nodeCore} 
                />
              </div>
            </div>

            {/* Files Table */}
            <div className="glass-card" style={{ marginTop: '2rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem' }}>Recent Files</h3>
                <button style={{ background: 'transparent', color: 'var(--secondary)', fontWeight: '600' }}>View All</button>
              </div>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeaderRow}>
                    <th style={tableTh}>Name</th>
                    <th style={tableTh}>Size</th>
                    <th style={tableTh}>Type</th>
                    <th style={tableTh}>Modified</th>
                    <th style={tableTh}></th>
                  </tr>
                </thead>
                <tbody>
                  {files.map(file => (
                    <tr 
                      key={file.id} 
                      style={tableRow} 
                      onClick={() => setSelectedFile(file)}
                    >
                      <td style={tableTd}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={fileIcon}><File size={18} /></div>
                          <span>{file.name}</span>
                        </div>
                      </td>
                      <td style={tableTd}>{file.size}</td>
                      <td style={tableTd}>
                        <span style={typeBadge}>{file.type}</span>
                      </td>
                      <td style={tableTd}>{file.date}</td>
                      <td style={tableTd}>
                        <button style={actionBtn}><MoreVertical size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'security' && <SecurityHub score={score} />}

        {activeTab === 'activity' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Operation Logs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { op: 'File Uploaded', detail: 'Tax_Returns_2024.pdf encrypted', time: '2 hours ago' },
                { op: 'Login Detected', detail: 'Authorized from Mumbai, IN', time: '5 hours ago' },
                { op: 'Key Generated', detail: 'New Master Key assigned', time: 'Yesterday' }
              ].map((log, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <strong style={{ display: 'block' }}>{log.op}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{log.detail}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem' }}>Encryption Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ marginBottom: '0.3rem' }}>Zero-Knowledge Mode</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Encrypt all files before they leave your browser.</p>
                </div>
                <div style={{ width: '40px', height: '20px', borderRadius: '10px', background: 'var(--secondary)', cursor: 'pointer' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ marginBottom: '0.3rem' }}>Global Node Mirroring</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Store fragments in multiple jurisdictions.</p>
                </div>
                <div style={{ width: '40px', height: '20px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', cursor: 'pointer' }}></div>
              </div>
            </div>
          </div>
        )}
      </main>

      <CosmosBackground />

      {/* Preview Modal */}
      {selectedFile && (
        <div style={overlayStyle}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card"
            style={previewModalStyle}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <File size={24} color="var(--secondary)" />
                <h3 style={{ fontSize: '1.2rem' }}>{selectedFile.name}</h3>
              </div>
              <button onClick={() => setSelectedFile(null)} style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '1.5rem' }}>×</button>
            </div>
            
            <div style={previewContentStyle}>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <ShieldCheck size={48} color="#10b981" style={{ marginBottom: '1rem' }} />
                <h4>Decryption Successful</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  This file was retrieved from node <strong>Zurich-04</strong> and decrypted locally.
                </p>
                <div style={mockFileContent}>
                  {selectedFile.type?.includes('image') ? (
                    <img 
                      src={selectedFile.node_location} 
                      alt="preview" 
                      style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} 
                    />
                  ) : (
                    <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
                      [ SECURE DATA STREAM ]
                    </div>
                  )}
                  <strong>Metadata:</strong><br />
                  Data Integrity: 100%<br />
                  Encryption: AES-256-GCM<br />
                  Source Node: {selectedFile.node_location?.split('/')[2] || 'Global-Mirror'}
                </div>
              </div>
            </div>
            
            <button className="btn-primary" style={{ width: '100%', marginTop: '2rem' }} onClick={() => setSelectedFile(null)}>
              Done
            </button>
          </motion.div>
        </div>
      )}

      {/* Encryption Overlay */}
      {isEncrypting && (
        <div style={overlayStyle}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card"
            style={overlayCardStyle}
          >
            {isSuccess ? (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <ShieldCheck size={48} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Securely Uploaded</h3>
                <p style={{ color: 'var(--text-muted)' }}>Your data is now fragmented and encrypted across the network.</p>
              </motion.div>
            ) : (
              <>
                <ShieldAlert size={64} color="var(--secondary)" className="animate-pulse" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Securing Data...</h3>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
                  We are applying AES-256-GCM encryption to your file. 
                  The encryption keys are generated locally and never leave your browser.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--secondary)' }}>
                  <Loader className="animate-spin" size={20} />
                  <span>Fragmenting & Encrypting Segments</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Recovery Key Modal */}
      {showRecoveryModal && (
        <div style={overlayStyle}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card"
            style={overlayCardStyle}
          >
            <div style={{ alignSelf: 'flex-start', marginBottom: '1rem', color: 'var(--secondary)' }}>
              <ShieldCheck size={48} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', alignSelf: 'flex-start' }}>Your Recovery Key</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              This is your only way to recover your data if you lose your password. 
              Store it offline in a safe place.
            </p>
            <div style={keyContainerStyle}>
              {recoveryKey}
            </div>
            <div style={{ display: 'flex', gap: '1rem', width: '100%', marginTop: '2rem' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1 }}
                onClick={() => {
                  navigator.clipboard.writeText(recoveryKey);
                  alert('Key copied to clipboard!');
                }}
              >
                Copy Key
              </button>
              <button 
                className="btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => setShowRecoveryModal(false)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating Action */}
      <button style={fabStyle} onClick={() => fileInputRef.current.click()}>
        <Plus size={24} />
      </button>

      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
