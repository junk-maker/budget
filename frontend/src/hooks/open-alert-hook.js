import {useMemo} from 'react';

const useIsOpened = arg => useMemo(() => Boolean(arg), [arg]);

export default useIsOpened;