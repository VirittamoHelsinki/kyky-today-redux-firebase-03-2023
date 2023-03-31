import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobs, fetchCategoryJobs } from '../redux/jobs/jobSlice';
import Card from '../components/Card';
import '../styles/CategoryPage.scss';

const CategoryPage = () => {
  const [cards, setCards] = useState([]);

  const _all = useSelector((state) => state.jobs.all);

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
      dispatch(fetchCategoryJobs({ key: 'category', value: category_with_spaces }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* listen changes in redux's state, set cards when firebase returns the query result */
  useEffect(() => {
    if (_all) {
      setCards(_all);
    }
  }, [_all]);

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
