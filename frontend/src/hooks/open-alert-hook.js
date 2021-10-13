import {useMemo} from 'react';

const useIsOpened = arg => useMemo(() => !!arg, [arg]);

export default useIsOpened;