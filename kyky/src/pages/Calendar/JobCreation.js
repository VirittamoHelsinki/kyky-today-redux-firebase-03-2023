import { useState, useContext, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createJobForm } from '../../redux/sellers/jobFormSlice';
import Switch from 'react-switch';
import Language from '../../language';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import Card from '../../components/Card';
import FileUpload2 from '../../components/calendar/AddPhotoArray';
import Categories from '../../components/CategoryTitleSelect';
import '../../styles/jobCreation.scss';

const currencies = [
  { value: '€', label: 'Hourly Rate(€)' },
  { value: '$', label: 'Hourly Rate($)' },
  { value: '£', label: 'Hourly Rate(£)' }
];

export default function JobCreation() {
  const [setSelectedWindow, setEditing, setScheduleWindow] = useOutletContext();
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
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const _user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        photoURL: _user.photoURL
      })
    );
    navigate('/calendar');
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

  const { lang } = useContext(Language);

  useEffect(() => {
    setSelectedWindow('job-creation');
  }, []);

  return (
    <main className="job-calendar-settings">
      <div className="settings">
        <h2 className="title">{lang.job_creation.h1}</h2>
        <div className="settings-container">
          <h3 className="title">{lang.job_creation.job_title}</h3>
          <div className="job-creation-setting">
            <input
              className="inputTitle"
              type="text"
              name="jobTitle"
              value={headline}
              onChange={(e) => {
                setHeadline(e.target.value);
              }}
            />
          </div>
          <h3 className="title">{lang.job_creation.job_description}</h3>
          <div className="job-creation-setting">
            <input
              className="inputLarge"
              type="text"
              name="job_description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="settings-container">
          <h3 className="title">{lang.job_creation.job_category}</h3>
          <div className="job-creation-setting">
            <Categories changeTitle={changeTitle} changeCategory={changeCategory} />
          </div>
          <h3 className="title">{lang.job_creation.place}</h3>
          <div className="job-creation-setting">
            <input
              className="inputTitle"
              type="text"
              name="place"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            />
          </div>
          <div className="job-creation-setting">
            <Checkbox
              onChange={(e) => {
                setIncurance(e.target.checked);
              }}>
              <span>{lang.job_creation.insurance}</span>
            </Checkbox>
          </div>
        </div>
        <div className="settings-container">
          <h3 className="title">Hinnat</h3>
          <div className="job-creation-setting">
            <input
              className="inputPrice"
              type="number"
              name="standard_price"
              value={price}
              min="1"
              max="1000"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
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
            <span>{lang.job_creation.standard_price}</span>
          </div>
          <div className="job-creation-setting">
            <label className="recurrent-switch">
              <Switch
                width={32}
                height={16}
                handleDiameter={14}
                checked={recurrent}
                onChange={() => setRecurrent(!recurrent)}
              />
              <span>Aseta toistuvat hinnat</span>
            </label>
          </div>
          <div className={`recurrents ${recurrent ? '' : 'disabled'}`}>
            <div className="recurrent">
              <input
                className="inputPrice"
                type="number"
                name="standard_price"
                value={weekday}
                min="0"
                max="999"
                onChange={(e) => {
                  setWeekday(e.target.value);
                }}
              />
              <span className="recurrent-unit">{unit}/h</span>
              <span className="recurrent-text">Joka arkipäivä</span>
            </div>
            <div className="recurrent">
              <input
                className="inputPrice"
                type="number"
                name="standard_price"
                value={weekend}
                min="0"
                max="999"
                onChange={(e) => {
                  setWeekend(e.target.value);
                }}
              />
              <span className="recurrent-unit">{unit}/h</span>
              <span className="recurrent-text">Joka viikonloppu</span>
            </div>
            <div className="recurrent">
              <input
                className="inputPrice"
                type="number"
                name="standard_price"
                value={everyOtherWeekday}
                min="0"
                max="999"
                onChange={(e) => {
                  setEveryOtherWeekday(e.target.value);
                }}
              />
              <span className="recurrent-unit">{unit}/h</span>
              <span className="recurrent-text">Joka toinen arkipäivä</span>
            </div>
            <div className="recurrent">
              <input
                className="inputPrice"
                type="number"
                name="standard_price"
                value={everyOtherWeekend}
                min="0"
                max="999"
                onChange={(e) => {
                  setEveryOtherWeekend(e.target.value);
                }}
              />
              <span className="recurrent-unit">{unit}/h</span>
              <span className="recurrent-text">Joka toinen viikonloppu</span>
            </div>
            <div className="recurrent">
              <input
                className="inputPrice"
                type="number"
                name="standard_price"
                value={onceAMonth}
                min="0"
                max="999"
                onChange={(e) => {
                  setOnceAMonth(e.target.value);
                }}
              />
              <span className="recurrent-unit">{unit}/h</span>
              <span className="recurrent-text">Kerran kuukaudessa</span>
            </div>
          </div>
        </div>
        <div className="settings-container">
          <h3 className="title">{lang.job_creation.pictures}</h3>
          <div className="job-creation-setting">
            <div className="picContainer">
              <div className="picBox">
                <FileUpload2 addUrl={addUrl} />
              </div>
              {urls.map((u) => {
                return (
                  <div key={u} className="picBox">
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
        <div className="buttons">
          <Button onClick={() => setShowPreviewModal(true)}>Esikatsele</Button>
          <Button type="submit" onClick={handleSubmit}>
            Julkaise
          </Button>
        </div>
      </div>
      {showPreviewModal && (
        <div className="preview-modal transparent-background">
          <div className="preview-modal">
            <Card
              job={{
                urls: urls,
                description: description,
                rating: '',
                name: _user.displayName,
                price: price,
                unit: unit
              }}
            />
            <button className="close-button" onClick={() => setShowPreviewModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
