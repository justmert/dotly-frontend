import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { ITotalRewards } from '@/types/rewards/types';

const useTotalRewards= () => {
    const { user } = useUser();

    const url = `/rewards/total-rewards/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<ITotalRewards, any>(user?.publicKey ? url : null , fetcher);

    return {
        totalRewards: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useTotalRewards;