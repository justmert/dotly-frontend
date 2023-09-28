import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IBalanceHistory } from '@/types/overview/types';

const useBalanceHistory = () => {
    const { user } = useUser();

    const url = `/overview/balance-history/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IBalanceHistory[], any>(user?.publicKey ? url : null , fetcher);

    return {
        balanceHistory: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useBalanceHistory;