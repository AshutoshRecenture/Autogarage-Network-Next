import { useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export function useAiChat(chatMode, captchaToken) {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const audioRef = useRef(null);
  const recognitionRef = useRef(null);
  const initialized = useRef(false);

  // Session ID is generated dynamically when chatMode is selected

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const playAudioResponse = async (text, startListeningAfter = false) => {
    if (!text || text.includes("[Error:")) {
      if (startListeningAfter && chatMode === 'voice') {
         try { recognitionRef.current?.start(); setIsListening(true); } catch(e){}
      }
      return;
    }
    
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        if (startListeningAfter && chatMode === 'voice') {
           try { recognitionRef.current?.start(); setIsListening(true); } catch(e){}
        }
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);

        audioRef.current.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(url);
          if (startListeningAfter && chatMode === 'voice') {
            try {
              recognitionRef.current?.start();
              setIsListening(true);
            } catch (err) {}
          }
        };
      }
    } catch (error) {
      if (startListeningAfter && chatMode === 'voice') {
         try { recognitionRef.current?.start(); setIsListening(true); } catch(e){}
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const sendMessage = async (textToSubmit) => {
    if (!textToSubmit.trim() || !sessionId) return;
    stopAudio();

    const userMsg = { id: uuidv4(), role: "user", content: textToSubmit };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, sessionId, mode: chatMode, captchaToken }),
      });

      if (!res.ok) {
        let errorMsg = "API Failed";
        try {
          const errData = await res.json();
          errorMsg = errData.error || errorMsg;
          if (errData.stack) console.error("Server Stack:", errData.stack);
        } catch(e) {}
        throw new Error(errorMsg);
      }

      // Sync selected service from response header
      const serviceHeader = res.headers.get("X-Selected-Service");
      if (serviceHeader) {
        setSelectedService(serviceHeader);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      const asstId = uuidv4();

      setMessages((prev) => [...prev, { id: asstId, role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        if (text) {
          assistantContent += text;
          setMessages((prev) => prev.map((m) => m.id === asstId ? { ...m, content: assistantContent } : m));
        }
      }
      playAudioResponse(assistantContent, chatMode === 'voice');
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = useCallback((e) => {
    if (e) e.preventDefault();
    sendMessage(input);
  }, [input, sessionId, messages, chatMode]);

  const handleServiceSelect = useCallback((serviceName) => {
    setSelectedService(serviceName);
    sendMessage(serviceName);
  }, [sessionId, messages, chatMode]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      stopAudio();
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {}
    }
  }, [isListening]);

  // Initialization logic based on selected chatMode
  useEffect(() => {
    if (chatMode && !initialized.current) {
      initialized.current = true;
      
      // Generate a fresh session ID for this specific interaction
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      
      const initialGreeting = "Hello! How can I help you today?";
      
      const asstId = uuidv4();
      setMessages([{ id: asstId, role: "assistant", content: initialGreeting }]);
      
      if (chatMode === 'voice') {
        playAudioResponse(initialGreeting, true);
      }
    } else if (!chatMode) {
      // Reset if mode is cleared
      initialized.current = false;
      setMessages([]);
      setSelectedService(null);
      stopAudio();
      setIsListening(false);
      recognitionRef.current?.stop();
    }
  }, [chatMode]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setTimeout(() => {
            sendMessage(transcript);
          }, 300);
        };

        recognitionRef.current.onerror = () => setIsListening(false);
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, [sessionId, messages, chatMode]);

  const resetChat = useCallback(() => {
    // Stop any ongoing audio/speech
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setIsPlaying(false);
    try { recognitionRef.current?.abort(); } catch(e) {}
    setIsListening(false);

    // Reset state and generate a fresh session
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setSelectedService(null);
    setInput("");

    const initialGreeting = "Hello! How can I help you today?";
    const asstId = uuidv4();
    setMessages([{ id: asstId, role: "assistant", content: initialGreeting }]);

    if (chatMode === "voice") {
      playAudioResponse(initialGreeting, true);
    }
  }, [chatMode]);

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isListening,
    isPlaying,
    toggleListening,
    stopAudio,
    setInput,
    audioRef,
    selectedService,
    setSelectedService,
    handleServiceSelect,
    resetChat,
  };
}
