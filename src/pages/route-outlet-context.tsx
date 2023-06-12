import { useOutletContext } from 'react-router-dom';

type OutletContextType = {
  routeName: String | '';
  setRouteName: (value: string) => any;
};

const useRouteName = () => {
  return useOutletContext<OutletContextType>();
};

export default useRouteName;
