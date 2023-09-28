import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IWeeklyTransactionRate } from '@/types/extrinsics/types';

const useWeeklyTransactionRate= () => {
    const { user } = useUser();

    const url = `/extrinsics/weekly-transaction-rate/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IWeeklyTransactionRate, any>(user?.publicKey ? url : null , fetcher);

    return {
        weeklyTransactionRate: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useWeeklyTransactionRate;