import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IRecentExtrinsics } from '@/types/extrinsics/types';

const useRecentExtrinsics= () => {
    const { user } = useUser();

    const url = `/extrinsics/recent-extrinsics/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IRecentExtrinsics[], any>(user?.publicKey ? url : null , fetcher);

    return {
        recentExtrinsics: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentExtrinsics;