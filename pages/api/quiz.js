export default function handler(req, res) {
  const { topic } = req.body;

  // You can make these smarter later or even use Groq/OpenAI
  const quizData = {
    general: [
      {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        answer: "Delhi"
      },
      {
        question: "Which is the largest ocean?",
        options: ["Atlantic", "Pacific", "Indian", "Arctic"],
        answer: "Pacific"
      }
    ],
    math: [
      {
        question: "What is 5 + 7?",
        options: ["10", "12", "13", "14"],
        answer: "12"
      },
      {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        answer: "8"
      }
    ],
    science: [
      {
        question: "Water boils at what temperature?",
        options: ["90°C", "100°C", "110°C", "120°C"],
        answer: "100°C"
      },
      {
        question: "Which planet is called the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
      }
    ],
    history: [
      {
        question: "Who was the first President of the USA?",
        options: ["Abraham Lincoln", "George Washington", "Jefferson", "Franklin"],
        answer: "George Washington"
      },
      {
        question: "When did World War II end?",
        options: ["1945", "1939", "1941", "1950"],
        answer: "1945"
      }
    ],
    geography: [
      {
        question: "Which is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
        answer: "Nile"
      },
      {
        question: "Which continent has the most countries?",
        options: ["Asia", "Africa", "Europe", "South America"],
        answer: "Africa"
      }
    ]
  };

  const quiz = quizData[topic] || quizData.general;
  res.status(200).json({ quiz });
}
