import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IBalanceStats } from '@/types/overview/types';

const useBalanceStats= () => {
    const { user } = useUser();

    const url = `/overview/balance-stats/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IBalanceStats, any>(user?.publicKey ? url : null , fetcher);

    return {
        balanceStats: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useBalanceStats;