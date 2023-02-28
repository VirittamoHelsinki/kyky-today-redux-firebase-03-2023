import { components } from 'react-select';
import PropTypes from 'prop-types';
import { ReactComponent as CheckMark } from '../../image/check-mark.svg';

export default function IconOption(props) {
  const { Option } = components;

  return (
    <Option {...props}>
      {props.isSelected ? (
        <div className="optionContainer">
          <CheckMark id="checkMark" />
          <span className="optionLabelTextBold">{props.data.label}</span>
        </div>
      ) : (
        <div className="optionContainer">
          <div id="noCheckMark"></div>
          <span className="optionLabelText">{props.data.label}</span>
        </div>
      )}
    </Option>
  );
}

IconOption.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired
};
