import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IRewardHistory, IRewardHistoryInterval } from '@/types/rewards/types';

const useRewardHistory= (interval: IRewardHistoryInterval) => {
    const { user } = useUser();

    const url = `/rewards/reward-history/?public_key=${user?.publicKey}&interval=${interval.value}`
    const { data, error, isValidating } = useSWRImmutable<IRewardHistory, any>(user?.publicKey && interval ? url : null , fetcher);

    return {
        rewardHistory: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRewardHistory;