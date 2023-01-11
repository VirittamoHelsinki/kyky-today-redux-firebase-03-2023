import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsByQuery } from '../redux/sellers/jobFormSlice';

const CategoryPage = () => {
  const [cards, setCards] = useState([]);

  const _cards = useSelector((state) => state.jobs.cards);

  const dispatch = useDispatch();

  /* take a category from url path name */
  const { category } = useParams();

  /* convert the path name for rendering and database query */
  const category_with_spaces = category.replace(/_/g, ' ');

  /* dispatch a query to the firebase when page loads*/
  useEffect(() => {
    dispatch(fetchJobsByQuery({ key: 'category', value: category_with_spaces }));
  }, []);

  /* listen changes in redux's state, set cards when firebase returns the query result */
  useEffect(() => {
    if (_cards) {
      setCards(_cards);
    }
  }, [_cards]);

  const styles = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  };

  const imgstyle = {
    width: '400px',
    height: '300px'
  };

  return (
    <div>
      <h1>{category_with_spaces}</h1>
      <div style={styles}>
        {cards.map((card, index) => (
          <div key={index}>
            <img src={card.urls[0]} alt="" style={imgstyle} />
            <div>{card.name}</div>
            <div>{card.place}</div>
            <div>{card.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
