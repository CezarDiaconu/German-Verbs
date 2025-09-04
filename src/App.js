import React, { useEffect, useState } from 'react';
import verbList from './verbs.json';
import prepVerbList from './prepVerbs.json'; // <-- save your big JSON with preposition verbs
import './App.css';

function getRandomVerbs(allVerbs, count) {
  const shuffled = [...allVerbs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function App() {
  const [quizVerbs, setQuizVerbs] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [results, setResults] = useState(null);

  const [prepQuizVerbs, setPrepQuizVerbs] = useState([]);
  const [prepUserInput, setPrepUserInput] = useState([]);
  const [prepResults, setPrepResults] = useState(null);

  useEffect(() => {
    // irregular verbs quiz
    const selected = getRandomVerbs(verbList, 25);
    setQuizVerbs(selected);
    setUserInput(selected.map(() => ({ past: '', participle: '' })));

    // prepositional verbs quiz
    const selectedPrep = getRandomVerbs(prepVerbList, 25);
    setPrepQuizVerbs(selectedPrep);
    setPrepUserInput(selectedPrep.map(() => ({ preposition: '' })));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...userInput];
    updated[index][field] = value;
    setUserInput(updated);
  };

  const handlePrepChange = (index, value) => {
    const updated = [...prepUserInput];
    updated[index].preposition = value;
    setPrepUserInput(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checked = quizVerbs.map((verb, i) => {
      return {
        ...verb,
        userPast: userInput[i].past.trim().toLowerCase(),
        userParticiple: userInput[i].participle.trim().toLowerCase(),
        correctPast:
          verb.past.toLowerCase() === userInput[i].past.trim().toLowerCase(),
        correctParticiple:
          verb.participle.toLowerCase() ===
          userInput[i].participle.trim().toLowerCase(),
      };
    });
    setResults(checked);
  };

  const handlePrepSubmit = (e) => {
    e.preventDefault();
    const checked = prepQuizVerbs.map((verb, i) => {
      return {
        ...verb,
        userPreposition: prepUserInput[i].preposition.trim().toLowerCase(),
        correctPreposition:
          verb.preposition.toLowerCase() ===
          prepUserInput[i].preposition.trim().toLowerCase(),
      };
    });
    setPrepResults(checked);
  };

  return (
    <div className="App">
      <h1>German Irregular Verbs Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          {quizVerbs.map((verb, index) => (
            <div className="card" key={`irregular-${index}`}>
              <h3>Verb {index + 1}</h3>
              <p>
                <strong>Infinitive:</strong> {verb.infinitive}
              </p>
              <p>
                <strong>Translation:</strong> {verb.translation}
              </p>
              <input
                type="text"
                placeholder="Simple Past"
                value={userInput[index]?.past}
                onChange={(e) =>
                  handleChange(index, 'past', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Past Participle"
                value={userInput[index]?.participle}
                onChange={(e) =>
                  handleChange(index, 'participle', e.target.value)
                }
              />
              {results && (
                <div className="results">
                  <p>
                    Past:{' '}
                    {results[index].correctPast
                      ? '✅'
                      : `❌ (${results[index].past})`}
                  </p>
                  <p>
                    Participle:{' '}
                    {results[index].correctParticiple
                      ? '✅'
                      : `❌ (${results[index].participle})`}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <button type="submit">Submit Irregular Quiz</button>
      </form>

      <h1>German Verbs with Prepositions Quiz</h1>
      <form onSubmit={handlePrepSubmit}>
        <div className="grid">
          {prepQuizVerbs.map((verb, index) => (
            <div className="card" key={`prep-${index}`}>
              <h3>Verb {index + 1}</h3>
              <p>
                <strong>Infinitive:</strong> {verb.infinitive}
              </p>
              <p>
                <strong>Translation:</strong> {verb.translation}
              </p>
              <input
                type="text"
                placeholder="Preposition"
                value={prepUserInput[index]?.preposition}
                onChange={(e) => handlePrepChange(index, e.target.value)}
              />
              {prepResults && (
                <div className="results">
                  <p>
                    Preposition:{' '}
                    {prepResults[index].correctPreposition
                      ? '✅'
                      : `❌ (${prepResults[index].preposition})`}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <button type="submit">Submit Prepositions Quiz</button>
      </form>
    </div>
  );
}

export default App;
