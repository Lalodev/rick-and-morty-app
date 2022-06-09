import { useEffect, useState } from 'react';
import './App.css';
import Characters from './components/Characters';
import Navbar from './components/Navbar';
import Pagination from './components/Pagination';

function App() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});

  const initialUrl = 'https://rickandmortyapi.com/api/character';

  const fetchCharacteres = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((error) => console.log(error));
  };

  const onPrevious = () => {
    fetchCharacteres(info.prev);
  };

  const onNext = () => {
    fetchCharacteres(info.next);
  };

  useEffect(() => {
    fetchCharacteres(initialUrl);
  }, []);

  return (
    <div>
      <Navbar brand="Rick and Morty App" />
      <div className="container mt-5">
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevious}
          onNext={onNext}
        />
        <Characters characters={characters} />
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </div>
    </div>
  );
}

export default App;
