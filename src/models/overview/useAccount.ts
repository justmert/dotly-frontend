import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/utils/fetcher';
import { useUser } from '../user/useUser';

import { IAccount } from '@/types/overview/types';

const useAccount = () => {
    const { user } = useUser();

    const url = `/overview/account/?public_key=${user?.publicKey}`
    const { data, error, isValidating } = useSWRImmutable<IAccount, any>(user?.publicKey ? url : null , fetcher);

    return {
        account: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useAccount;