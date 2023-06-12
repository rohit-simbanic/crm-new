import { isEmpty } from "helpers/misc-helper";

const useAuthenticated = (): boolean => {
  const token = localStorage.getItem('accessToken');

  if (isEmpty(token)) return false;

  return true;
};

export default useAuthenticated;
