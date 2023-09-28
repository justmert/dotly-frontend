import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { ITotalExtrinsics } from '@/types/extrinsics/types';

const useTotalExtrinsics= () => {
    const { user } = useUser();

    const url = `/extrinsics/total-extrinsics/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<ITotalExtrinsics, any>(user?.publicKey ? url : null , fetcher);

    return {
        totalExtrinsics: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useTotalExtrinsics;