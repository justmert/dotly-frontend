import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IRecentTransfers } from '@/types/stats/types';

const useRecentTransfers= () => {
    const { user } = useUser();

    const url = `/stats/recent-transfers/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IRecentTransfers[], any>(user?.publicKey ? url : null , fetcher);

    return {
        recentTransfers: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentTransfers;