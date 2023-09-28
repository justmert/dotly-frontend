import { createContext, Dispatch, SetStateAction } from 'react';
import { IUser } from '@/types/general';

type UserContextType = {
    user: IUser;
    setUser: Dispatch<SetStateAction<IUser>>;
}

export const UserContext = createContext<UserContextType>({ 
    user: ({ address: null, publicKey: null } as IUser),
    setUser: () => {},
});
