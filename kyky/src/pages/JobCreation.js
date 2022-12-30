import { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJobForm } from '../redux/sellers/jobCreationFormSlice';
import Language from '../language';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import '../styles/jobCreation.scss';
import FileUpload2 from '../components/FileUpload2';
import Categories from '../components/SubCategorySelect';

const units = ['hour', 'km', 'm2', 'person', 'slice'];

export default function JobCreation() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [place, setPlace] = useState('');
  const [insurance, setIncurance] = useState(false);
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState(units[0]);
  const [includeVAT, setIncludeVAT] = useState(false);
  const [addPrice, setAddPrice] = useState('');
  const [addUnit, setAddUnit] = useState(units[0]);
  const [urls, setUrls] = useState([]);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createJobForm({
        uid: user.uid,
        title: title,
        description: description,
        category: category,
        subCategory: subCategory,
        place: place,
        insurance: insurance,
        price: price,
        unit: unit,
        includeVAT: includeVAT,
        addPrice: addPrice,
        addUnit: addUnit,
        urls: urls
      })
    );
  };

  const addUrl = (u) => {
    const urlsArray = [...urls];
    urlsArray.push(u);
    setUrls(urlsArray);
  };

  const changeMainCat = (cat) => {
    setCategory(cat);
  };

  const changeSubCat = (cat) => {
    setSubCategory(cat);
  };

  const { lang } = useContext(Language);
  return (
    <main className="wrapper fixed-centered profile">
      <form className="card light wide " onSubmit={(e) => e.preventDefault()}>
        <h1>{lang.job_creation.h1}</h1>
        <section>
          <Input
            type="text"
            name="jobTitle"
            value={title}
            label={lang.job_creation.job_title}
            placeholder={lang.job_creation.name}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </section>

        <section>
          <p>{lang.job_creation.job_description}</p>
          <input
            className="inputLarge"
            type="text"
            name="job_description"
            value={description}
            label={lang.job_creation.job_description}
            placeholder={''}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </section>
        <section>
          <p>{lang.job_creation.job_category}</p>
          <Categories changeSubCat={changeSubCat} changeMainCat={changeMainCat} />
        </section>
        <section>
          <Input
            type="text"
            name="place"
            value={place}
            label={lang.job_creation.place}
            placeholder={lang.job_creation.name}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
          />
        </section>
        <section>
          <Checkbox
            onChange={(e) => {
              setIncurance(e.target.checked);
            }}>
            <p>{lang.job_creation.insurance}</p>
          </Checkbox>
        </section>
        <section>
          <p>{lang.job_creation.standard_price} </p>
          <div className="inputContainer">
            <input
              className="inputShort"
              type="text"
              name="standard_price"
              value={price}
              label={lang.job_creation.standard_price}
              placeholder={''}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            /
            <select
              onChange={(e) => {
                setUnit(e.target.value);
              }}>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section>
          <Checkbox
            onChange={(e) => {
              setIncludeVAT(e.target.checked);
            }}>
            <p>{lang.job_creation.include_alv}</p>
          </Checkbox>
        </section>
        <section>
          <p>{lang.job_creation.add_price} </p>
          <div className="inputContainer">
            <input
              className="inputShort"
              type="text"
              name="add_price"
              value={addPrice}
              label={lang.job_creation.add_price}
              placeholder={''}
              onChange={(e) => {
                setAddPrice(e.target.value);
              }}
            />
            /
            <select
              onChange={(e) => {
                setAddUnit(e.target.value);
              }}>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section>
          <p>{lang.job_creation.pictures}</p>
          <div className="picContainer">
            <div className="picBox">
              <FileUpload2 addUrl={addUrl} />
            </div>
            {urls.map((u) => {
              return (
                <div key={u} className="picBox">
                  <div className="file-upload">
                    <img src={u} alt="" />
                  </div>
                  <button
                    className="file-remove"
                    type="button"
                    onClick={() => {
                      setUrls(urls.filter((url) => url !== u));
                    }}>
                    <i className="material-icons-outlined">close</i>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
        <section>
          <Button type="submit" onClick={handleSubmit}>
            Julkaise
          </Button>
        </section>
      </form>
    </main>
  );
}
