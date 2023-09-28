import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IBalanceDistribution } from '@/types/overview/types';

const useBalanceDistribution = () => {
    const { user } = useUser();

    const url = `/overview/balance-distribution/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IBalanceDistribution[], any>(user?.publicKey ? url : null , fetcher);

    return {
        balanceDistribution: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useBalanceDistribution;