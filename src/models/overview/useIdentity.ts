import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IIdentity } from '@/types/overview/types';

const useIdentity= () => {
    const { user } = useUser();

    const url = `/overview/identity?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IIdentity[], any>(user?.publicKey ? url : null , fetcher);

    return {
        identity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useIdentity;