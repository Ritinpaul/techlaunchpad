'use client';
import { useState } from 'react';

const SUGGESTIONS = [
  "Which program should I choose?",
  "Tell me about Live Projects",
  "How do placements work?",
  "What certifications are available?",
];

const REPLIES = {
  "Which program should I choose?": "If you need a CV point, go for Live Projects. If you also need interview prep, the All-In-One Combo is best value — it includes everything at a lower combined price.",
  "Tell me about Live Projects": "Live Projects offer real client work via Prodmark Consultants. You'll get a graded, verifiable project output for your CV — recruiters ask about it every time.",
  "How do placements work?": "We don't guarantee placements, but our credentials give you the talking points and CV weight needed to pass shortlists and ace interviews. 98.7% of our students placed in their desired domain.",
  "What certifications are available?": "We offer Advanced Excel and Power BI certifications — domain-specific credentials that add hard skills to your CV, complementing your MBA coursework.",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm here to help you navigate our programs and find the best fit for your CV gaps. How can I help?", isUser: false }
  ]);

  const handleSuggestion = (question) => {
    setMessages(prev => [
      ...prev,
      { text: question, isUser: true },
    ]);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: REPLIES[question] || "Please book a free career call for detailed guidance!", isUser: false }
      ]);
    }, 600);
  };

  return (
    <>
      <button
        className="chatbot-trigger"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
        </svg>
      </button>

      <div className={`chatbot-popup ${open ? 'open' : ''}`} role="dialog" aria-label="Chat assistant" aria-hidden={!open}>
        <div className="chat-header">
          <div className="chat-header-title">MBA Partner Guide</div>
          <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
        </div>

        <div className="chat-messages" id="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-message${m.isUser ? ' user' : ''}`}>{m.text}</div>
          ))}
        </div>

        <div className="chat-suggested-questions">
          <div className="chat-suggested-title">Suggested Questions</div>
          {SUGGESTIONS.map((q) => (
            <button key={q} className="chat-suggestion-btn" onClick={() => handleSuggestion(q)}>{q}</button>
          ))}
        </div>
      </div>
    </>
  );
}
