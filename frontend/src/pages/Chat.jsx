import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaPaperPlane, FaMicrophone, FaTimes, FaStop } from 'react-icons/fa';
import axios from 'axios';

// Enhanced responsive styles
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
    justifyContent: 'center' 
  },
  contentWrapper: { 
    display: 'flex', 
    flexDirection: 'column', 
    width: '90%', 
    maxWidth: '600px', 
    height: 'calc(100vh - 80px)', 
    maxHeight: '700px', 
    backgroundColor: '#ffffff', 
    borderRadius: '24px', 
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)', 
    border: '1px solid #f0f2f5', 
    overflow: 'hidden', 
    position: 'relative',
    // Mobile responsiveness
    '@media (max-width: 768px)': {
      width: '95%',
      height: '100vh',
      maxHeight: 'none',
      borderRadius: '0',
      border: 'none',
      boxShadow: 'none'
    }
  },
  messagesBox: { 
    flex: 1, 
    overflowY: 'auto', 
    padding: '20px 25px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '12px',
    // Mobile padding adjustment
    '@media (max-width: 768px)': {
      padding: '15px 16px'
    }
  },
  messageBubble: { 
    padding: '12px 18px', 
    borderRadius: '18px', 
    lineHeight: '1.5', 
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)', 
    fontSize: '0.95rem', 
    maxWidth: '80%', 
    wordBreak: 'break-word',
    // Mobile adjustments
    '@media (max-width: 768px)': {
      fontSize: '0.9rem',
      padding: '10px 14px',
      maxWidth: '85%'
    }
  },
  userBubble: { 
    alignSelf: 'flex-end', 
    backgroundColor: '#6a40ed', 
    color: '#fff' 
  },
  assistantBubble: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#eef1f5', 
    color: '#374151' 
  },
  loadingBubble: { 
    alignSelf: 'flex-start', 
    padding: '12px 18px', 
    borderRadius: '18px', 
    backgroundColor: '#eef1f5', 
    color: '#374151', 
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    '@media (max-width: 768px)': {
      padding: '10px 14px'
    }
  },
  inputArea: { 
    display: 'flex', 
    alignItems: 'center', 
    padding: '15px 25px', 
    borderTop: '1px solid #f0f2f5', 
    backgroundColor: '#ffffff', 
    gap: '10px',
    // Mobile adjustments
    '@media (max-width: 768px)': {
      padding: '12px 16px',
      gap: '8px'
    }
  },
  textInput: { 
    flex: 1, 
    padding: '10px 0', 
    borderRadius: '0', 
    border: 'none', 
    fontSize: '1rem', 
    backgroundColor: 'transparent', 
    color: '#374151', 
    outline: 'none',
    '@media (max-width: 768px)': {
      fontSize: '16px', // Prevents zoom on iOS
      padding: '8px 0'
    }
  },
  sendButton: { 
    width: '45px', 
    height: '45px', 
    borderRadius: '14px', 
    border: 'none', 
    backgroundColor: '#6a40ed', 
    color: '#fff', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '1.2rem', 
    transition: 'all 0.2s ease', 
    boxShadow: '0 4px 10px rgba(106, 64, 237, 0.3)',
    '@media (max-width: 768px)': {
      width: '40px',
      height: '40px',
      fontSize: '1.1rem'
    }
  },
  voiceOverlay: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    backdropFilter: 'blur(10px)', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 5, 
    borderRadius: '24px', 
    color: '#fff', 
    textAlign: 'center', 
    padding: '20px', 
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      borderRadius: '0',
      padding: '16px'
    }
  },
  transcriptText: { 
    minHeight: '2em', 
    fontStyle: 'italic', 
    color: '#ddd', 
    fontSize: '1.2rem', 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    padding: '10px', 
    borderRadius: '8px', 
    backdropFilter: 'blur(5px)', 
    maxWidth: '400px', 
    marginTop: '20px',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      maxWidth: '90%',
      marginTop: '15px',
      padding: '8px'
    }
  },
  voiceStatusText: { 
    fontSize: '1.5rem', 
    fontWeight: '500', 
    marginBottom: '10px',
    '@media (max-width: 768px)': {
      fontSize: '1.3rem'
    }
  },
  stopButton: { 
    marginTop: '15px', 
    padding: '8px 16px', 
    borderRadius: '20px', 
    border: 'none', 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    color: '#fff', 
    cursor: 'pointer', 
    fontSize: '0.9rem', 
    fontWeight: '500', 
    transition: 'all 0.2s ease', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '6px',
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
      padding: '6px 12px'
    }
  }
};

const Chat = () => {
  // State and Refs
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Namaste! How can I help you explore Indian heritage today?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interruptDetected, setInterruptDetected] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const recognitionRef = useRef(null);
  const speechSynthRef = useRef(null);
  const utteranceRef = useRef(null);
  const voicesRef = useRef([]);
  const silenceTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive styles that depend on state
  const voiceModeButtonStyle = {
    position: 'absolute', 
    top: isMobile ? '15px' : '20px', 
    right: isMobile ? '15px' : 'calc(5% + 20px)', 
    zIndex: 10,
    padding: isMobile ? '8px 16px' : '10px 20px', 
    borderRadius: '12px', 
    border: 'none',
    backgroundColor: isVoiceModeActive ? '#e02424' : '#6a40ed', 
    color: '#fff', 
    cursor: 'pointer',
    display: 'flex', 
    alignItems: 'center', 
    gap: isMobile ? '6px' : '8px',
    fontSize: isMobile ? '0.9rem' : '1rem', 
    fontWeight: '500', 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',
  };

  const microphoneIconStyle = {
    width: isMobile ? '80px' : '100px', 
    height: isMobile ? '80px' : '100px', 
    borderRadius: '50%',
    backgroundColor: isListening ? '#e02424' : '#6a40ed',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    fontSize: isMobile ? '2.5rem' : '3rem', 
    margin: isMobile ? '15px' : '20px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    transform: isListening ? 'scale(1.1)' : 'scale(1)',
    border: '4px solid rgba(255,255,255,0.5)',
  };

  // Apply responsive styles using CSS-in-JS
  const getResponsiveStyle = (baseStyle) => {
    if (!isMobile) return baseStyle;
    
    const mobileOverrides = baseStyle['@media (max-width: 768px)'];
    if (mobileOverrides) {
      const { '@media (max-width: 768px)': _, ...rest } = baseStyle;
      return { ...rest, ...mobileOverrides };
    }
    return baseStyle;
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
    if (!speechSynthRef.current || !text || text.trim() === '' || !isVoiceModeActive || window.speechSynthesis.speaking) {
      return;
    }
    
    const isHindi = /[\u0900-\u097F]/.test(text);
    const targetLang = isHindi ? 'hi-IN' : 'en-IN';
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    const voice = findBestVoice(targetLang);

    if (voice) {
      utterance.voice = voice;
      utterance.pitch = 1.0;
      utterance.rate = 1.0;
    } else {
      console.error("Could not find any voice to speak with. Aborting speech.");
      return;
    }

    utterance.onstart = () => { setIsSpeaking(true); setIsListening(false); try { recognitionRef.current?.stop(); } catch (e) {} };
    utterance.onend = () => { setIsSpeaking(false); if (isVoiceModeActive && !interruptDetected) { try { recognitionRef.current?.start(); } catch (e) {} } utteranceRef.current = null; };
    utterance.onerror = (event) => { console.error('TTS error:', event.error); setIsSpeaking(false); };

    speechSynthRef.current.speak(utterance);
  }, [isVoiceModeActive, interruptDetected, findBestVoice]);

  const sendMessage = useCallback(async (messageText) => {
    if (messageText.trim() === '') return;
    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setTranscript('');
    try {
      const response = await axios.post('https://sihh-si9b.vercel.app/api/chat', { message: messageText });
      const botReply = response.data.reply || 'I did not get a response.';
      const botMessage = { role: 'assistant', content: botReply };
      setMessages(prev => [...prev, botMessage]);
      if (isVoiceModeActive) speak(botReply);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, an error occurred.' };
      setMessages(prev => [...prev, errorMessage]);
      if (isVoiceModeActive) speak('Sorry, an error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [isVoiceModeActive, speak]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser doesn't support speech recognition.");
      return;
    }

    speechSynthRef.current = window.speechSynthesis;
    if (!speechSynthRef.current) {
        console.error("Speech synthesis not supported in this browser.");
        return;
    }

    const loadVoices = () => {
      voicesRef.current = speechSynthRef.current.getVoices();
      if (voicesRef.current.length === 0) {
        speechSynthRef.current.onvoiceschanged = () => {
          voicesRef.current = speechSynthRef.current.getVoices();
          console.log("Voices loaded asynchronously:", voicesRef.current);
        };
      } else {
        console.log("Voices loaded synchronously:", voicesRef.current);
      }
    };
    loadVoices();

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      if (isVoiceModeActive && !isSpeaking && !interruptDetected) {
        setTimeout(() => {
          if (isVoiceModeActive && !isSpeaking && !interruptDetected && recognitionRef.current) {
            try { recognitionRef.current.start(); } catch (e) {}
          }
        }, 500);
      }
    };
    recognition.onerror = (event) => {
      console.error('Recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setIsVoiceModeActive(false);
        alert('Microphone permission denied.');
      }
    };
    recognition.onresult = (event) => {
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      if (isSpeaking) {
        speechSynthRef.current.cancel();
        setIsSpeaking(false);
        setInterruptDetected(true);
        setTimeout(() => setInterruptDetected(false), 1000);
      }
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        else interimTranscript += event.results[i][0].transcript;
      }
      setTranscript(interimTranscript);
      if (finalTranscript.trim()) {
        const cleanTranscript = finalTranscript.trim();
        setTranscript('');
        silenceTimeoutRef.current = setTimeout(() => {
          if (cleanTranscript.length > 1) sendMessage(cleanTranscript);
        }, 1000);
      }
    };

    if (isVoiceModeActive) {
      try { recognition.start(); } catch (e) {}
    }

    return () => {
      try { recognition.stop(); } catch (e) {}
      speechSynthRef.current.cancel();
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
    };
  }, [isVoiceModeActive, isSpeaking, interruptDetected, sendMessage, speak, findBestVoice]);

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

  return (
    <div style={getResponsiveStyle(globalStyles.chatContainer)}>
      <button onClick={toggleVoiceMode} style={voiceModeButtonStyle}>
        {isVoiceModeActive ? <FaTimes /> : <FaMicrophone />}
        {isMobile 
          ? (isVoiceModeActive ? 'Stop' : 'Talk') 
          : (isVoiceModeActive ? 'Stop Conversation' : 'Talk with Heritage Bot')
        }
      </button>
      <div style={getResponsiveStyle(globalStyles.contentWrapper)}>
        {isVoiceModeActive && (
          <div style={getResponsiveStyle(globalStyles.voiceOverlay)}>
            <div style={getResponsiveStyle(globalStyles.voiceStatusText)}>
              {isSpeaking ? "Speaking..." : isListening ? "Listening..." : "Say something..."}
            </div>
            <div style={microphoneIconStyle}>
              <FaMicrophone />
            </div>
            <p style={getResponsiveStyle(globalStyles.transcriptText)}>
              {transcript || "💡 You can interrupt me by speaking!"}
            </p>
            {isSpeaking && (
              <button 
                onClick={() => { if (speechSynthRef.current) speechSynthRef.current.cancel(); }} 
                style={getResponsiveStyle(globalStyles.stopButton)}
              >
                <FaStop /> Stop Speaking
              </button>
            )}
          </div>
        )}
        <div style={getResponsiveStyle(globalStyles.messagesBox)}>
          {messages.map((msg, index) => (
            <div 
              key={index} 
              style={{
                ...getResponsiveStyle(globalStyles.messageBubble), 
                ...(msg.role === 'user' ? globalStyles.userBubble : globalStyles.assistantBubble)
              }}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && !isVoiceModeActive && (
            <div style={getResponsiveStyle(globalStyles.loadingBubble)}>
              <span style={{ animation: 'blink 1s infinite' }}>Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div style={getResponsiveStyle(globalStyles.inputArea)}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()} 
            placeholder="Ask about Indian heritage..." 
            style={getResponsiveStyle(globalStyles.textInput)} 
            disabled={isVoiceModeActive} 
          />
          <button 
            onClick={handleSend} 
            disabled={isLoading || isVoiceModeActive || !input.trim()} 
            style={{
              ...getResponsiveStyle(globalStyles.sendButton), 
              opacity: (isLoading || isVoiceModeActive || !input.trim()) ? 0.5 : 1, 
              cursor: (isLoading || isVoiceModeActive || !input.trim()) ? 'not-allowed' : 'pointer'
            }}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
      <style>
        {`
          @keyframes blink { 50% { opacity: 0.4; } }
          
          /* Mobile viewport optimization */
          @media (max-width: 768px) {
            body {
              -webkit-text-size-adjust: 100%;
              -webkit-user-select: none;
              -webkit-touch-callout: none;
            }
            
            /* Prevent zoom on input focus */
            input[type="text"] {
              font-size: 16px !important;
            }
            
            /* Smooth scrolling for mobile */
            * {
              -webkit-overflow-scrolling: touch;
            }
            
            /* Hide scrollbar on mobile */
            ::-webkit-scrollbar {
              display: none;
            }
          }
          
          /* Desktop specific styles */
          @media (min-width: 769px) {
            /* Custom scrollbar for desktop */
            ::-webkit-scrollbar {
              width: 6px;
            }
            
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb {
              background: #c1c1c1;
              border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: #a8a8a8;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Chat;
