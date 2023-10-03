import { useContext } from 'react';
import { AuthContext } from '@/navigators/MainNavigator';

export const useIsUserLoggedIn = () => {
  const { state } = useContext(AuthContext);
  console.log('state123: ', state);
  const isUserLoggedIn = state?.userToken ? true : false;
  return { isUserLoggedIn };
};
