import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GenericSelect } from './Select';
import '../../styles/NewProfileCreation.scss';

const currencies = [
  { value: '€', label: 'Hourly Rate(€)' },
  { value: '$', label: 'Hourly Rate($)' },
  { value: '£', label: 'Hourly Rate(£)' }
];

export default function Step6({ handleChange }) {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(currencies[0]);

  const _amount = useSelector((state) => state.profile.s6HourlyInput);
  const _currency = useSelector((state) => state.profile.s6Currency);

  useEffect(() => {
    handleChange('s6HourlyInput', amount);
  }, [amount]);

  useEffect(() => {
    handleChange('s6Currency', currency);
  }, [currency]);

  useEffect(() => {
    if (_amount) {
      setAmount(_amount);
    }
  }, [_amount]);

  useEffect(() => {
    if (_currency) {
      setCurrency(_currency);
    }
  }, [_currency]);

  return (
    <div className="step step6">
      <div className="hourlyContainer">
        <GenericSelect
          className="step6Select"
          placeholder="Choose your currency"
          options={[...currencies]}
          value={currencies.filter(({ value }) => value === currency)}
          onChange={(v) => setCurrency(v.value)}
        />
        <input
          type="number"
          className="hourlyInput"
          placeholder="Amount per hour:"
          max={1000000}
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}></input>
      </div>{' '}
      <h4 className="totalAmount">Total amount the client will see(including all taxes).</h4>
    </div>
  );
}
