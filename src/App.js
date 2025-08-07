import React, { useEffect, useState } from 'react';
import verbList from './verbs.json';
import './App.css';

function getRandomVerbs(allVerbs, count) {
  const shuffled = [...allVerbs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function App() {
  const [quizVerbs, setQuizVerbs] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const selected = getRandomVerbs(verbList, 25);
    setQuizVerbs(selected);
    setUserInput(
      selected.map(() => ({
        past: '',
        participle: ''
      }))
    );
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...userInput];
    updated[index][field] = value;
    setUserInput(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checked = quizVerbs.map((verb, i) => {
      return {
        ...verb,
        userPast: userInput[i].past.trim().toLowerCase(),
        userParticiple: userInput[i].participle.trim().toLowerCase(),
        correctPast: verb.past.toLowerCase() === userInput[i].past.trim().toLowerCase(),
        correctParticiple: verb.participle.toLowerCase() === userInput[i].participle.trim().toLowerCase()
      };
    });
    setResults(checked);
  };

  return (
    <div className="App">
      <h1>German Irregular Verbs Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          {quizVerbs.map((verb, index) => (
            <div className="card" key={index}>
              <h3>Verb {index + 1}</h3>
              <p><strong>Infinitive:</strong> {verb.infinitive}</p>
              <p><strong>Translation:</strong> {verb.translation}</p>
              <input
                type="text"
                placeholder="Simple Past"
                value={userInput[index]?.past}
                onChange={(e) => handleChange(index, 'past', e.target.value)}
              />
              <input
                type="text"
                placeholder="Past Participle"
                value={userInput[index]?.participle}
                onChange={(e) => handleChange(index, 'participle', e.target.value)}
              />
              {results && (
                <div className="results">
                  <p>
                    Past: {results[index].correctPast ? '✅' : `❌ (${results[index].past})`}
                  </p>
                  <p>
                    Participle: {results[index].correctParticiple ? '✅' : `❌ (${results[index].participle})`}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
}

export default App;
