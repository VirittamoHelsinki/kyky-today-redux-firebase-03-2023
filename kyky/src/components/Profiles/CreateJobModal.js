import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJobForm } from '../../redux/sellers/jobFormSlice';
import Switch from 'react-switch';
import Checkbox from '../../components/Checkbox';
import AddJobImages from './AddJobImages';
import Categories from './CategoryTitleSelect';
import '../../styles/CreateJobModal.scss';

const currencies = [
  { value: '€', label: 'Hourly Rate(€)' },
  { value: '$', label: 'Hourly Rate($)' },
  { value: '£', label: 'Hourly Rate(£)' }
];

const CreateJobModal = ({ setShowCreateJobModal, editjob, setEditjob }) => {
  const [recurrent, setRecurrent] = useState(false);
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [insurance, setIncurance] = useState(false);
  const [price, setPrice] = useState(0);
  const [weekday, setWeekday] = useState(0);
  const [weekend, setWeekend] = useState(0);
  const [everyOtherWeekday, setEveryOtherWeekday] = useState(0);
  const [everyOtherWeekend, setEveryOtherWeekend] = useState(0);
  const [onceAMonth, setOnceAMonth] = useState(0);
  const [unit, setUnit] = useState(currencies[0].value);
  const [urls, setUrls] = useState([]);

  const dispatch = useDispatch();

  const _user = useSelector((state) => state.user);

  useEffect(() => {
    if (editjob) {
      setHeadline(editjob.headline);
      setDescription(editjob.description);
      setCategory(editjob.category);
      setTitle(editjob.title);
      setPlace(editjob.place);
      setIncurance(editjob.insurance);
      setPrice(editjob.price);
      setUnit(editjob.unit);
      setWeekday(editjob.weekday);
      setWeekend(editjob.weekend);
      setEveryOtherWeekday(editjob.everyOtherWeekday);
      setEveryOtherWeekend(editjob.everyOtherWeekend);
      setOnceAMonth(editjob.onceAMonth);
      setUrls(editjob.urls);
    }
  }, []);

  const handleSubmit = () => {
    dispatch(
      createJobForm({
        uid: _user.uid,
        name: _user.displayName,
        headline: headline,
        description: description,
        category: category,
        title: title,
        place: place,
        insurance: insurance,
        price: price,
        weekday: recurrent ? weekday : price,
        weekend: recurrent ? weekend : price,
        everyOtherWeekday: recurrent ? everyOtherWeekday : price,
        everyOtherWeekend: recurrent ? everyOtherWeekend : price,
        onceAMonth: recurrent ? onceAMonth : price,
        unit: unit,
        urls: urls,
        photoURL: _user.photoURL,
        slug: _user.slug,
        pageviews: 0
      })
    );
  };

  const addUrl = (u) => {
    const urlsArray = [...urls];
    urlsArray.push(u);
    setUrls(urlsArray);
  };

  const changeCategory = (c) => {
    setCategory(c);
  };

  const changeTitle = (t) => {
    setTitle(t);
  };

  useEffect(() => {
    document.getElementById('recurrent-input-field-wk').disabled = !recurrent;
    document.getElementById('recurrent-input-field-we').disabled = !recurrent;
    document.getElementById('recurrent-input-field-eowk').disabled = !recurrent;
    document.getElementById('recurrent-input-field-eowe').disabled = !recurrent;
    document.getElementById('recurrent-input-field-oam').disabled = !recurrent;
  }, [recurrent]);

  return (
    <div className="job-modal-main">
      <div className="job-modal-title-description">
        <div className="title-content">
          <div className="title-label">
            <p>Job title</p>
          </div>
          <div className="title-input">
            <input
              className="title-input-field"
              type="text"
              name="jobTitle"
              value={headline}
              onChange={(e) => {
                setHeadline(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="description-content">
          <div className="description-label">
            <p>Description</p>
          </div>
          <div className="description-textarea">
            <textarea
              className="textarea-field"
              name="job-description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="job-modal-category-location-insurance">
        <div className="category-content">
          <div className="category-label">
            <p>Job category</p>
          </div>
          <div className="category-dropdown">
            <Categories changeTitle={changeTitle} changeCategory={changeCategory} />
          </div>
        </div>
        <div className="location-content">
          <div className="location-label">
            <p>Location</p>
          </div>
          <div className="location-input">
            <input
              className="location-input-field"
              type="text"
              name="location-text"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="insurance-content">
          <div className="insurance-label">
            <p>I have insurance</p>
          </div>
          <div className="insurance-checkbox">
            <Checkbox
              onChange={(e) => {
                setIncurance(e.target.checked);
              }}
            />
          </div>
        </div>
      </div>
      <div className="job-modal-price-recurrents">
        <div className="price-content">
          <div className="price-label">
            <p>Price</p>
          </div>
          <div className="price-input">
            <input
              className="price-input-field"
              type="number"
              name="standard-price"
              value={price}
              min="1"
              max="1000"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="price-select">
            <select
              className="select-unit"
              onChange={(e) => {
                setUnit(e.target.value);
              }}>
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="recurrents-content">
          <div className="recurrents-label">
            <p>Recurrent prices</p>
          </div>
          <div className="recurrents-switch">
            <Switch
              width={32}
              height={16}
              handleDiameter={14}
              checked={recurrent}
              onChange={() => setRecurrent(!recurrent)}
            />
          </div>
        </div>
        <div className="recurrent-price-content">
          <div className={`recurrents ${recurrent ? '' : 'disabled'}`}>
            <div className="recurrent">
              <input
                id="recurrent-input-field-wk"
                type="number"
                name="standard_price"
                value={weekday}
                min="0"
                max="999"
                onChange={(e) => {
                  setWeekday(e.target.value);
                }}
              />
              <p className="unit-paragraph">{unit}/h</p>
              <p>Every weekday</p>
            </div>
            <div className="recurrent">
              <input
                id="recurrent-input-field-we"
                type="number"
                name="standard_price"
                value={weekend}
                min="0"
                max="999"
                onChange={(e) => {
                  setWeekend(e.target.value);
                }}
              />
              <p className="unit-paragraph">{unit}/h</p>
              <p>Every weekend</p>
            </div>
            <div className="recurrent">
              <input
                id="recurrent-input-field-eowk"
                type="number"
                name="standard_price"
                value={everyOtherWeekday}
                min="0"
                max="999"
                onChange={(e) => {
                  setEveryOtherWeekday(e.target.value);
                }}
              />
              <p className="unit-paragraph">{unit}/h</p>
              <p>Every other weekday</p>
            </div>
            <div className="recurrent">
              <input
                id="recurrent-input-field-eowe"
                type="number"
                name="standard_price"
                value={everyOtherWeekend}
                min="0"
                max="999"
                onChange={(e) => {
                  setEveryOtherWeekend(e.target.value);
                }}
              />
              <p className="unit-paragraph">{unit}/h</p>
              <p>Every other weekend</p>
            </div>
            <div className="recurrent">
              <input
                id="recurrent-input-field-oam"
                type="number"
                name="standard_price"
                value={onceAMonth}
                min="0"
                max="999"
                onChange={(e) => {
                  setOnceAMonth(e.target.value);
                }}
              />
              <p className="unit-paragraph">{unit}/h</p>
              <p>Once a month</p>
            </div>
          </div>
        </div>
      </div>
      <div className="job-modal-image">
        <div className="image-label">
          <p>Images</p>
        </div>
        <div className="images-content">
          <div className="images-container">
            <div className="image-box">
              <AddJobImages addUrl={addUrl} />
            </div>
            {urls.map((u) => {
              return (
                <div key={u} className="image-box">
                  <div className="file-upload">
                    <img className="file-upload-image" src={u} alt="" />
                    <button
                      className="file-remove"
                      type="button"
                      onClick={() => {
                        setUrls(urls.filter((url) => url !== u));
                      }}>
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="job-modal-buttons">
        <button
          className="modal-button"
          onClick={() => {
            setEditjob(null);
            setShowCreateJobModal(false);
          }}>
          Cancel
        </button>
        <button
          className="modal-button"
          onClick={() => {
            handleSubmit();
            setEditjob(null);
            setShowCreateJobModal(false);
          }}>
          Add job
        </button>
      </div>
    </div>
  );
};

export default CreateJobModal;
