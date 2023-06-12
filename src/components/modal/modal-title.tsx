import { ReactNode } from 'react';
import Title from '../typography/title';

interface TitleType {
  value: ReactNode;
}

const ModalTitle = ({ value }: TitleType) => {
  return <Title value={value} />;
};

export default ModalTitle;
