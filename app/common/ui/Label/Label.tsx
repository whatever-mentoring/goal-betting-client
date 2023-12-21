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
      <Text.ButtonM color={textColor}>{text}</Text.ButtonM>
    </div>
  );
};

export default Label;
