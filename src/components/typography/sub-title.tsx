import { ObjectType } from 'types';
import H6 from './h6';

interface TitleProps {
  value: string;
  sx?: ObjectType;
}

const SubTitle = (props: TitleProps) => {
  const { value, sx } = props;
  return <H6 value={value} gutterBottom={true} sx={sx} />;
};

export default SubTitle;
