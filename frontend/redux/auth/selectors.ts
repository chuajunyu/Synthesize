import { RootState } from '@/redux/store';
import { User } from '@/lib/types';

export const selectIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn;
export const selectUser = (state: RootState): User | null => state.auth.user;
