import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobs, fetchJobsByQuery } from '../redux/sellers/jobFormSlice';
import Card from '../components/Card';
import '../styles/CategoryPage.scss';

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
    if (category === 'all') {
      dispatch(fetchAllJobs());
    } else {
      dispatch(fetchJobsByQuery({ key: 'category', value: category_with_spaces }));
    }
  }, []);

  /* listen changes in redux's state, set cards when firebase returns the query result */
  useEffect(() => {
    if (_cards) {
      setCards(_cards);
    }
  }, [_cards]);

  return (
    <div className="category-main">
      <h1>{category_with_spaces}</h1>
      <div className="card-row">
        {cards.map((card, index) => (
          <Card job={card} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
