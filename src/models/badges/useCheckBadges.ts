import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IBadges } from '@/types/badges/types';

const useCheckBadges= () => {
    const { user } = useUser();

    const url = `/badges/check-badges/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IBadges[], any>(user?.publicKey ? url : null , fetcher);

    return {
        badges: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCheckBadges;