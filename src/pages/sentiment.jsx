import React, { useEffect, useState } from "react";
import { auth, db } from "../js/firebase-init";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Sentiment() {
  const [username, setUsername] = useState("");
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const greetingUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          window.location.href = "/login";
          return;
        }
        const uid = user.uid;
        const docSnap = await getDoc(doc(db, "users", uid));
        setUsername(docSnap.exists() ? docSnap.data().username : "User");
      });
    };
    greetingUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lines = inputText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    if (lines.length === 0) {
      alert("Tolong masukkan minimal satu review.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texts: lines }),
      });

      const data = await response.json();
      setResults(data.results);
      setSummary(data.summary);
      setError("");
    } catch (err) {
      console.error("Error:", err);
      setError("Gagal menghubungi server.");
    }
  };

  return (
    <>
      <nav className="bg-slate-900 text-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <Link to="/flow" className="flex items-center space-x-3">
            <img src="/image/Sentinova.png" className="h-9" alt="Sentinova Logo" />
          </Link>
          <ul className="font-medium flex">
            <li>
              <span className="text-white font-poppins rounded-lg px-5 py-2.5">
                Halo, {username}
              </span>
            </li>
          </ul>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-poppins px-4">
        <h2 className="text-3xl font-bold mb-8 text-center mt-3">
          Sentiment Analysis
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center w-full max-w-2xl space-y-4 md:space-y-0 md:space-x-4"
        >
          <textarea
            rows="3"
            placeholder="Tulis beberapa review, 1 baris 1 review..."
            className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 text-white"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-400 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition duration-200"
          >
            Submit
          </button>
        </form>

        {error && (
          <div className="text-red-500 mt-4">{error}</div>
        )}

        {results.length > 0 && (
          <div className="bg-transparen rounded-lg p-6 mt-8 w-full max-w-2xl text-white shadow-md">
            {results.map((item, idx) => (
              <div className="mb-4" key={idx}>
                <p>
                  <strong>Text {idx + 1}:</strong> {item.text}
                </p>
                <p>
                  <strong>Predicted Sentiment:</strong> {item.predicted_sentiment}
                </p>
                <p>
                  <strong>Probabilities:</strong> Negative: {item.negative}% | Neutral: {item.netral}% | Positive: {item.positive}%
                </p>
              </div>
            ))}
          </div>
        )}

        {summary && (
          <div className="w-full max-w-md mx-auto mt-8 bg-slate-800 p-6 rounded-lg">
            <Bar
              data={{
                labels: ['Negative', 'Neutral', 'Positive'],
                datasets: [
                  {
                    label: 'Jumlah Review',
                    data: [summary.Negative, summary.Netral, summary.Positive],
                    backgroundColor: ['#ef4444', '#facc15', '#22c55e'],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: 'Distribusi Sentimen' },
                },
              }}
            />
            <div className="mt-6 flex justify-around text-lg font-semibold">
              <div className="text-red-400">Negative: {summary.Negative}</div>
              <div className="text-yellow-300">Neutral: {summary.Netral}</div>
              <div className="text-green-400">Positive: {summary.Positive}</div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
