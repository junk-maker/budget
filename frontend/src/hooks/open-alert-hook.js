import {useMemo} from 'react';

const useAlert = arg => useMemo(() => !!arg, [arg]);

export default useAlert;