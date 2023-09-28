import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { ITransferHistory, ITransferHistoryInterval } from '@/types/stats/types';

const useTransferHistory= (interval: ITransferHistoryInterval) => {
    const { user } = useUser();

    const url = `/stats/transfer-history/?public_key=${user?.publicKey}&interval=${interval.value}`
    const { data, error, isValidating } = useSWRImmutable<ITransferHistory, any>(user?.publicKey && interval ? url : null , fetcher);

    return {
        transferHistory: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useTransferHistory;