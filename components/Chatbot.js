import { useState } from "react";

export default function Chatbot({ topic }) {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful AI tutor." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, topic }),
      });

      const data = await res.json();
      const reply = data?.response?.content || "No reply received.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "Error: Could not reach chatbot." }]);
    }

    setLoading(false);
  };

  // 🟧 Download Chat
  const downloadChat = () => {
    const chatText = messages
      .filter((msg) => msg.role !== "system")
      .map((msg) => `${msg.role === "user" ? "You" : "AI"}: ${msg.content}`)
      .join("\n\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "chat_history.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 🟪 Voice Input
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      alert("Voice input error: " + event.error);
    };

    recognition.start();
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Ask Your AI Tutor</h3>

      <div className="bg-white border rounded p-4 mb-2 h-64 overflow-y-scroll whitespace-pre-wrap">
        {messages
          .filter((m) => m.role !== "system")
          .map((msg, i) => (
            <p key={i} className="mb-2">
              <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
            </p>
          ))}
        {loading && <p><em>AI is typing...</em></p>}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />

        <div className="flex gap-2">
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>

          <button
            onClick={handleVoiceInput}
            className="bg-purple-600 text-white px-4 py-2 rounded"
            title="Speak"
          >
            🎤
          </button>

          <button
            onClick={downloadChat}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            📥 Download Chat
          </button>
        </div>
      </div>
    </div>
  );
}
