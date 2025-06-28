import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("../components/Chatbot"), { ssr: false });
const Quiz = dynamic(() => import("../components/Quiz"), { ssr: false });

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">📚 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-2xl font-semibold mb-2">🧠 Quick Quiz</h2>
          <Quiz />
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-2xl font-semibold mb-2">🤖 AI Tutor</h2>
          <Chatbot />
        </div>
      </div>
    </div>
  );
}