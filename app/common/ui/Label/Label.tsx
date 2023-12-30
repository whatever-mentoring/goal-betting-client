import Text from '../Text/Text';
import { Color, vars } from '../colors.css';
import { labelStyles } from './label.css';

export interface LabelProps {
  text: string;
  labelColor: Color;
  textColor?: Color;
}

const Label = ({ text, labelColor, textColor = 'white' }: LabelProps) => {
  return (
    <div style={{ backgroundColor: vars.color[labelColor] }} className={labelStyles.labelBox}>
      <Text.BodyXS color={textColor}>{text}</Text.BodyXS>
    </div>
  );
};

export default Label;
