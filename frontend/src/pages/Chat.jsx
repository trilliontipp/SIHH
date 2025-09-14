import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaPaperPlane, FaMicrophone, FaTimes, FaStop } from 'react-icons/fa';
import axios from 'axios';

// --- Styles (modified for responsiveness) ---
const globalStyles = {
  chatContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(180deg, #fefefe 0%, #f7f9fc 100%)',
    color: '#4a5568',
    fontFamily: "'Inter', sans-serif",
    padding: '0',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%', /* Increased width for mobile */
    maxWidth: '600px',
    height: 'calc(100vh - 60px)', /* Adjusted height for smaller screens */
    maxHeight: '700px',
    backgroundColor: '#ffffff',
    borderRadius: '20px', /* Slightly smaller border-radius for mobile */
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)', /* Softer shadow */
    border: '1px solid #f0f2f5',
    overflow: 'hidden',
    position: 'relative',
    margin: '10px', /* Added margin for spacing on mobile */
  },
  messagesBox: {
    flex: 1,
    overflowY: 'auto',
    padding: '15px 20px', /* Adjusted padding for mobile */
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', /* Adjusted gap for mobile */
  },
  messageBubble: {
    padding: '10px 15px', /* Adjusted padding for mobile */
    borderRadius: '15px', /* Slightly smaller border-radius */
    lineHeight: '1.4',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)', /* Softer shadow */
    fontSize: '0.9rem', /* Smaller font size for mobile */
    maxWidth: '85%', /* Increased max-width to fill more space */
    wordBreak: 'break-word',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#6a40ed',
    color: '#fff',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#eef1f5',
    color: '#374151',
  },
  loadingBubble: {
    alignSelf: 'flex-start',
    padding: '10px 15px', /* Adjusted padding for mobile */
    borderRadius: '15px', /* Slightly smaller border-radius */
    backgroundColor: '#eef1f5',
    color: '#374151',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)', /* Softer shadow */
  },
  inputArea: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px', /* Adjusted padding for mobile */
    borderTop: '1px solid #f0f2f5',
    backgroundColor: '#ffffff',
    gap: '8px', /* Adjusted gap for mobile */
  },
  textInput: {
    flex: 1,
    padding: '8px 0', /* Adjusted padding for mobile */
    borderRadius: '0',
    border: 'none',
    fontSize: '0.95rem', /* Smaller font size for mobile */
    backgroundColor: 'transparent',
    color: '#374151',
    outline: 'none',
  },
  sendButton: {
    width: '40px', /* Smaller button size */
    height: '40px', /* Smaller button size */
    borderRadius: '12px', /* Adjusted border-radius */
    border: 'none',
    backgroundColor: '#6a40ed',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem', /* Adjusted font size */
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 6px rgba(106, 64, 237, 0.2)', /* Softer shadow */
  },
  voiceOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', /* Darker overlay */
    backdropFilter: 'blur(8px)', /* Less blur */
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    borderRadius: '20px', /* Match content wrapper */
    color: '#fff',
    textAlign: 'center',
    padding: '15px', /* Adjusted padding for mobile */
    boxSizing: 'border-box',
  },
  transcriptText: {
    minHeight: '2em',
    fontStyle: 'italic',
    color: '#ddd',
    fontSize: '1.1rem', /* Smaller font size */
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '8px', /* Adjusted padding */
    borderRadius: '6px',
    backdropFilter: 'blur(3px)', /* Less blur */
    maxWidth: '350px', /* Reduced max-width */
    marginTop: '15px', /* Adjusted margin */
  },
  voiceStatusText: {
    fontSize: '1.3rem', /* Smaller font size */
    fontWeight: '500',
    marginBottom: '10px',
  },
  stopButton: {
    marginTop: '10px', /* Adjusted margin */
    padding: '6px 12px', /* Adjusted padding */
    borderRadius: '15px', /* Adjusted border-radius */
    border: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.85rem', /* Smaller font size */
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  voiceModeButtonStyle: {
    position: 'absolute',
    top: '15px', /* Adjusted position */
    right: '15px', /* Adjusted position */
    zIndex: 10,
    padding: '8px 15px', /* Adjusted padding */
    borderRadius: '10px', /* Adjusted border-radius */
    border: 'none',
    backgroundColor: '#6a40ed',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.9rem', /* Smaller font size */
    fontWeight: '500',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', /* Softer shadow */
    transition: 'all 0.3s ease',
  },
  microphoneIconStyle: {
    width: '80px', /* Smaller icon size */
    height: '80px', /* Smaller icon size */
    borderRadius: '50%',
    backgroundColor: '#6a40ed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem', /* Smaller icon font size */
    margin: '15px', /* Adjusted margin */
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    transform: 'scale(1)',
    border: '3px solid rgba(255,255,255,0.4)', /* Adjusted border */
  },
};

const Chat = () => {
  // --- State and Refs (no changes here) ---
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

  // --- Styles logic that depends on state (no changes here, but using the updated styles object) ---
  const voiceModeButtonStyle = {
    ...globalStyles.voiceModeButtonStyle,
    backgroundColor: isVoiceModeActive ? '#e02424' : '#6a40ed',
  };
  const microphoneIconStyle = {
    ...globalStyles.microphoneIconStyle,
    backgroundColor: isListening ? '#e02424' : '#6a40ed',
    transform: isListening ? 'scale(1.1)' : 'scale(1)',
  };

  const findBestVoice = useCallback((lang) => {
    if (!speechSynthRef.current) return null;
    if (voicesRef.current.length === 0) {
      voicesRef.current = speechSynthRef.current.getVoices();
    }
    const voices = voicesRef.current;
    if (voices.length === 0) {
      console.warn("findBestVoice: No voices are available from the browser.");
      return null;
    }

    let preferredVoice = voices.find(voice => voice.lang === lang);
    if (preferredVoice) return preferredVoice;

    if (lang === 'hi-IN') {
      preferredVoice = voices.find(voice => voice.lang === 'en-IN');
      if (preferredVoice) return preferredVoice;
    }
    if (lang.startsWith('en')) {
      preferredVoice = voices.find(voice => voice.lang.startsWith('en-'));
      if (preferredVoice) return preferredVoice;
    }
    return voices[0];
  }, []);

  const speak = useCallback((text) => {
    if (!speechSynthRef.curren
