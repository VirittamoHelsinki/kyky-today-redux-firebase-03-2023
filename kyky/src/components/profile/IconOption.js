import { components } from 'react-select';
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
