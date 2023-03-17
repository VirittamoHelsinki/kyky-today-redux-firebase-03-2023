import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import '../styles/CategoryPage.scss';

const SearchResultPage = () => {
  const [cards, setCards] = useState([]);

  const _result = useSelector((state) => state.jobs.result);

  /* listen changes in redux's state, set cards when firebase returns the query result */
  useEffect(() => {
    if (_result) {
      setCards(_result);
    }
  }, [_result]);

  return (
    <div className="category-main">
      <h1>Search result</h1>
      <div className="card-row">
        {cards.map((card, index) => (
          <Card job={card} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;
