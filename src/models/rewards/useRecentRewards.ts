import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IRecentRewards } from '@/types/rewards/types';

const useRecentRewards= () => {
    const { user } = useUser();

    const url = `/rewards/recent-rewards/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IRecentRewards[], any>(user?.publicKey ? url : null , fetcher);

    return {
        recentRewards: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentRewards;