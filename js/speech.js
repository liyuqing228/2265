/* ===================================
   AI Interview Simulator - Speech Module
   Handles Speech Recognition & Synthesis
   =================================== */

class SpeechModule {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.isListening = false;
    this.isSpeaking = false;
    this.finalTranscript = '';
    this.interimTranscript = '';
    this.recognitionSupported = false;

    this.initRecognition();
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser');
      this.recognitionSupported = false;
      return;
    }

    this.recognitionSupported = true;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'zh-CN';

    this.recognition.onstart = () => {
      this.isListening = true;
      this.finalTranscript = '';
      this.interimTranscript = '';
      if (this.onStart) this.onStart();
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      this.interimTranscript = interimTranscript;
      if (this.onResult) this.onResult(this.finalTranscript, this.interimTranscript);
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.isListening = false;
      if (this.onError) this.onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.finalTranscript && this.onEnd) {
        this.onEnd(this.finalTranscript);
      }
    };
  }

  getLanguage() {
    const scenario = sessionStorage.getItem('currentScenario');
    return scenario === 'english' ? 'en-US' : 'zh-CN';
  }

  setLanguage(lang) {
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  startListening(onStart, onResult, onEnd, onError) {
    if (!this.recognition) {
      console.warn('Speech recognition not available');
      return false;
    }

    this.onStart = onStart;
    this.onResult = onResult;
    this.onEnd = onEnd;
    this.onError = onError;

    this.finalTranscript = '';
    this.interimTranscript = '';

    try {
      this.recognition.lang = this.getLanguage();
      this.recognition.start();
      return true;
    } catch (e) {
      console.error('Failed to start speech recognition:', e);
      try {
        this.recognition.stop();
        setTimeout(() => {
          this.recognition.start();
        }, 100);
      } catch (e2) {
        console.error('Failed to restart speech recognition:', e2);
      }
      return false;
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.error('Error stopping recognition:', e);
      }
    }
    this.isListening = false;
  }

  speak(text, lang = 'zh-CN', onStart, onEnd) {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
        resolve();
      };

      utterance.onerror = (e) => {
        this.isSpeaking = false;
        console.warn('Speech synthesis error:', e);
        resolve();
      };

      this.synthesis.speak(utterance);
    });
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
    this.isSpeaking = false;
  }

  isAvailable() {
    return this.recognitionSupported && !!this.recognition;
  }
}

window.SpeechModule = SpeechModule;