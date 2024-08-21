import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Header from './components/Header';
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElements] = useState([]);
  const [artwork, setArtwork ] = useState(null);
  
  const questions = [
    {
      question: "If cats ruled the world, which breed would be the supreme leader?",
      options: ["A sneaky Siamese 🐈", "A fluffy Persian 🐾", "A playful Bengal 🐆", "A regal Ragdoll 👑"],
    },
  ];
  
  const keywords = {
    "Siamese": "siam",
    "Persian": "pers",
    "Bengal": "beng",
    "Ragdoll": "ragd",
  };
  
  const elements = {
    "A sneaky Siamese 🐈": "Siamese",
    "A fluffy Persian 🐾": "Persian",
    "A playful Bengal 🐆": "Bengal",
    "A regal Ragdoll 👑": "Ragdoll",
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  }
  
  async function fetchArtwork(keyword) {
    const api_key = 'live_ZevEdnDK2wrFn7AFpcEAKi15Gafi3kfdReD0LgYYz1EHMa8PvgsbPttzPsGcTn0p';
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${keyword}&api_key=${api_key}`);
    const data = await response.json();
      const artworkId = data[0].id;
      const artworkResponse = await fetch(`https://api.thecatapi.com/v1/images/${artworkId}`);
      const artworkData = await artworkResponse.json();

      if(!artworkData.url){
        return;
      }
      setArtwork(artworkData);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(answer => {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }
  
  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElements(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex]);

  function resetQ() {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setUserName('');
    setElements([]);
    setArtwork(null);
  }

  return (
    <UserProvider value={{ name: userName, setName: setUserName }}>
      <Header onReset={resetQ} />
      <Routes>
        <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question 
                question={questions[currentQuestionIndex].question} 
                options={questions[currentQuestionIndex].options} 
                onAnswer={handleAnswer} 
              />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          }
        />
      </Routes>
    </UserProvider>
  )
}