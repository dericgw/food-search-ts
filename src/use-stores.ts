import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';

const useStores = () => {
  const { store } = useContext(MobXProviderContext);
  return store;
};

export default useStores;
