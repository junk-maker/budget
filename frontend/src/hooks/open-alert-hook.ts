import {useMemo} from 'react';

const useAlert = (arg: string): boolean => useMemo(() => !!arg, [arg]);

export default useAlert;