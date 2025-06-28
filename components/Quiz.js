import { useEffect, useState } from "react";

export default function Quiz({ topic }) {
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic })
    })
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data.quiz);
        setAnswers({});
        setSubmitted(false);
      });
  }, [topic]);

  const handleAnswer = (qIndex, option) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [qIndex]: option }));
    }
  };

  const submitQuiz = () => setSubmitted(true);

  const score = quiz.reduce((acc, q, idx) => {
    return acc + (answers[idx] === q.answer ? 1 : 0);
  }, 0);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Quiz on {topic}</h3>

      {quiz.map((q, idx) => (
        <div key={idx} className="mb-4 p-4 border rounded">
          <p className="mb-2 font-medium">{q.question}</p>
          <div className="flex flex-wrap gap-2">
            {q.options.map((opt, i) => {
              const isSelected = answers[idx] === opt;
              const isCorrect = q.answer === opt;
              const isWrong = isSelected && !isCorrect;

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(idx, opt)}
                  className={`px-4 py-1 rounded border ${
                    submitted
                      ? isCorrect
                        ? "bg-green-300"
                        : isWrong
                        ? "bg-red-300"
                        : "bg-gray-200"
                      : isSelected
                      ? "bg-blue-300"
                      : "bg-gray-100"
                  }`}
                  disabled={submitted}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={submitQuiz}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Submit Quiz
        </button>
      ) : (
        <p className="mt-4 text-lg font-bold text-green-700">
          Your Score: {score} / {quiz.length}
        </p>
      )}
    </div>
  );
}
