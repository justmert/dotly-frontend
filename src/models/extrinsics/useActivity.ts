import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IActivity, IActivityInterval } from '@/types/extrinsics/types';

const useActivity= (interval: IActivityInterval) => {
    const { user } = useUser();

    const url = `/extrinsics/activity/?public_key=${user?.publicKey}&interval=${interval.value}`
    const { data, error, isValidating } = useSWRImmutable<IActivity, any>(user?.publicKey && interval ? url : null , fetcher);

    return {
        activity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useActivity;