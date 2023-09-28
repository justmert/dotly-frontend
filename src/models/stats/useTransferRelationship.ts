import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { ITransferRelationship } from '@/types/stats/types';

const useTransferRelationship= () => {
    const { user } = useUser();

    const url = `/stats/transfer-relationship/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<ITransferRelationship, any>(user?.publicKey ? url : null , fetcher);

    return {
        transferRelationship: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useTransferRelationship;