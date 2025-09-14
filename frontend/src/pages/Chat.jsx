import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaPaperPlane, FaMicrophone, FaTimes, FaStop } from 'react-icons/fa';
import axios from 'axios';

// --- Styles (Now with responsive logic) ---
const getGlobalStyles = (isMobile) => ({
  chatContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(180deg, #fefefe 0%, #f7f9fc 100%)',
    color: '#4a5568',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    // Center the content wrapper on desktop only
    ...(isMobile ? {} : { alignItems: 'center', justifyContent: 'center' }),
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    position: 'relative',
    // --- Responsive adjustments for the main chat window ---
    ...(isMobile
      ? { width: '100%', height: '100%', borderRadius: '0', border: 'none' }
      : { width: '90%', maxWidth: '600px', height: 'calc(100vh - 80px)', maxHeight: '700px', borderRadius: '24px', boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)', border: '1px solid #f0f2f5' }
    )
  },
  messagesBox: {
    flex: 1,
    overflowY: 'auto',
    padding: isMobile ? '20px 15px' : '20px 25px', // Reduced padding on mobile
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  messageBubble: {
    padding: '12px 18px',
    borderRadius: '18px',
    lineHeight: '1.5',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    fontSize: '0.95rem',
    maxWidth: '80%',
    wordBreak: 'break-word'
  },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#6a40ed', color: '#fff' },
  assistantBubble: { alignSelf: 'flex-start', backgroundColor: '#eef1f5', color: '#374151' },
  loadingBubble: { alignSelf: 'flex-start', padding: '12px 18px', borderRadius: '18px', backgroundColor: '#eef1f5', color: '#374151', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  inputArea: {
    display: 'flex',
    alignItems: 'center',
    padding: isMobile ? '15px 15px' : '15px 25px', // Reduced padding on mobile
    borderTop: '1px solid #f0f2f5',
    backgroundColor: '#ffffff',
    gap: '10px'
  },
  textInput: { flex: 1, padding: '10px 0', borderRadius: '0', border: 'none', fontSize: '1rem', backgroundColor: 'transparent', color: '#374151', outline: 'none' },
  sendButton: { width: '45px', height: '45px', borderRadius: '14px', border: 'none', backgroundColor: '#6a40ed', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', transition: 'all 0.2s ease', boxShadow: '0 4px 10px rgba(106, 64, 237, 0.3)' },
  voiceOverlay: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(10px)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    zIndex: 5, color: '#fff', textAlign: 'center', padding: '20px', boxSizing: 'border-box',
    // --- Responsive adjustment for border radius ---
    borderRadius: isMobile ? '0' : '24px',
  },
  transcriptText: { minHeight: '2em', fontStyle: 'italic', color: '#ddd', fontSize: '1.2rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', backdropFilter: 'blur(5px)', maxWidth: '400px', marginTop: '20px' },
  voiceStatusText: {
    // --- Responsive font size ---
    fontSize: isMobile ? '1.3rem' : '1.5rem',
    fontWeight: '500',
    marginBottom: '10px'
  },
  stopButton: { marginTop: '15px', padding: '8px 16px', borderRadius: '20px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fff', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px' }
});

const Chat = () => {
  // --- State for mobile responsiveness ---
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // --- All other state and refs (no changes here) ---
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Namaste! How can I help you explore Indian heritage today?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interruptDetected, setInterruptDetected] = useState(false);
  const recognitionRef = useRef(null);
  const speechSynthRef = useRef(null);
  const utteranceRef = useRef(null);
  const voicesRef = useRef([]);
  const silenceTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // --- Effect to handle screen resizing ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Generate styles based on screen size ---
  const globalStyles = getGlobalStyles(isMobile);

  // --- Styles logic that depends on state (now with responsive logic) ---
  const voiceModeButtonStyle = {
    position: 'absolute',
    // --- Responsive adjustments for button position ---
    top: isMobile ? '15px' : '20px',
    right: isMobile ? '15px' : 'calc(5% + 20px)',
    zIndex: 10,
    padding: '10px 20px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: isVoiceModeActive ? '#e02424' : '#6a40ed',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',
  };
  const microphoneIconStyle = {
    // --- Responsive adjustments for icon size ---
    width: isMobile ? '80px' : '100px',
    height: isMobile ? '80px' : '100px',
    fontSize: isMobile ? '2.5rem' : '3rem',
    borderRadius: '50%',
    backgroundColor: isListening ? '#e02424' : '#6a40ed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    transform: isListening ? 'scale(1.1)' : 'scale(1)',
    border: '4px solid rgba(255,255,255,0.5)',
  };

  // --- All functions (findBestVoice, speak, sendMessage, etc.) remain unchanged ---
  const findBestVoice = useCallback(/* ...no changes... */);
  const speak = useCallback(/* ...no changes... */);
  const sendMessage = useCallback(/* ...no changes... */);
  
  // --- useEffect for SpeechRecognition (no changes) ---
  useEffect(() => { /* ...no changes... */ }, [isVoiceModeActive, isSpeaking, interruptDetected, sendMessage, speak, findBestVoice]);
  
  const scrollToBottom = useCallback(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);
  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const handleSend = () => { if (input.trim() && !isLoading) sendMessage(input); };
  const toggleVoiceMode = useCallback(() => {
    setIsVoiceModeActive(prev => {
      if (prev) {
        if (recognitionRef.current) try { recognitionRef.current.stop(); } catch(e) {}
        if (speechSynthRef.current) speechSynthRef.current.cancel();
      }
      return !prev;
    });
  }, []);

  // --- JSX Rendering (unchanged structure, but styles are now responsive) ---
  return (
    <div style={globalStyles.chatContainer}>
      <button onClick={toggleVoiceMode} style={voiceModeButtonStyle}>
        {isVoiceModeActive ? <FaTimes /> : <FaMicrophone />}
        {isVoiceModeActive ? 'Stop' : 'Talk with Bot'}
      </button>
      <div style={globalStyles.contentWrapper}>
        {isVoiceModeActive && (
          <div style={globalStyles.voiceOverlay}>
            <div style={globalStyles.voiceStatusText}>{isSpeaking ? "Speaking..." : isListening ? "Listening..." : "Say something..."}</div>
            <div style={microphoneIconStyle}><FaMicrophone /></div>
            <p style={globalStyles.transcriptText}>{transcript || "💡 You can interrupt me by speaking!"}</p>
            {isSpeaking && (<button onClick={() => { if (speechSynthRef.current) speechSynthRef.current.cancel(); }} style={globalStyles.stopButton}><FaStop /> Stop Speaking</button>)}
          </div>
        )}
        <div style={globalStyles.messagesBox}>
          {messages.map((msg, index) => (<div key={index} style={{...globalStyles.messageBubble, ...(msg.role === 'user' ? globalStyles.userBubble : globalStyles.assistantBubble)}}>{msg.content}</div>))}
          {isLoading && !isVoiceModeActive && (<div style={globalStyles.loadingBubble}><span style={{ animation: 'blink 1s infinite' }}>Thinking...</span></div>)}
          <div ref={messagesEndRef} />
        </div>
        <div style={globalStyles.inputArea}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()} placeholder="Ask about Indian heritage..." style={globalStyles.textInput} disabled={isVoiceModeActive} />
          <button onClick={handleSend} disabled={isLoading || isVoiceModeActive || !input.trim()} style={{...globalStyles.sendButton, opacity: (isLoading || isVoiceModeActive || !input.trim()) ? 0.5 : 1, cursor: (isLoading || isVoiceModeActive || !input.trim()) ? 'not-allowed' : 'pointer'}}><FaPaperPlane /></button>
        </div>
      </div>
      <style>{` @keyframes blink { 50% { opacity: 0.4; } } `}</style>
    </div>
  );
};

export default Chat;
