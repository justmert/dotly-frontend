import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { ISuccessRate } from '@/types/extrinsics/types';

const useSuccessRate= () => {
    const { user } = useUser();

    const url = `/extrinsics/success-rate/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<ISuccessRate, any>(user?.publicKey ? url : null , fetcher);

    return {
        successRate: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useSuccessRate;