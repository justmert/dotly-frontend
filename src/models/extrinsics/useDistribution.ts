import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IDistribution } from '@/types/extrinsics/types';

const useDistribution= () => {
    const { user } = useUser();

    const url = `/extrinsics/distribution/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IDistribution, any>(user?.publicKey ? url : null , fetcher);

    return {
        distribution: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDistribution;