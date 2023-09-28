import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { ICallActivity, ICallActivityInterval } from '@/types/extrinsics/types';

const useCallActivity= (call_name: string, interval: ICallActivityInterval) => {
    const { user } = useUser();

    const url = `/extrinsics/call-activity/?public_key=${user?.publicKey}&call_name=${call_name}&interval=${interval.value}`
    const { data, error, isValidating } = useSWRImmutable<ICallActivity, any>(user?.publicKey && call_name && interval ? url : null , fetcher);

    return {
        callActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCallActivity;