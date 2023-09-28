import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { ITotalTransfers } from '@/types/stats/types';

const useTotalTransfers= () => {
    const { user } = useUser();

    const url = `/stats/total-transfers/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<ITotalTransfers, any>(user?.publicKey ? url : null , fetcher);

    return {
        totalTransfers: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useTotalTransfers;