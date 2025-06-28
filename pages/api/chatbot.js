export default async function handler(req, res) {
  const { messages, topic } = req.body;

  try {
    const systemMessage = {
      role: "system",
      content: `You are a helpful AI tutor specialized in ${topic}. Answer questions accordingly.`,
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [systemMessage, ...messages.filter(m => m.role !== "system")],
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "No reply received from Groq";

    res.status(200).json({
      response: {
        role: "assistant",
        content: reply,
      },
    });
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: "Failed to reach Groq API" });
  }
}
