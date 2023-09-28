import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IRewardRelationship } from '@/types/rewards/types';

const useRewardRelationship= () => {
    const { user } = useUser();

    const url = `/rewards/reward-relationship/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IRewardRelationship, any>(user?.publicKey ? url : null , fetcher);

    return {
        rewardRelationship: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRewardRelationship;