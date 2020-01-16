import { UserData } from '../types/applicationWide';

const getAvatarPath = (avatarUrl: string): string => (
  avatarUrl.startsWith('http')
    ? avatarUrl
    : `${process.env.PUBLIC_URL}/avatars/${avatarUrl}`
);

const formatUserName = (user: UserData, sessionUser: UserData): string => (
  `${user.name}${sessionUser.id === user.id ? ' (you)' : ''}`
);


export { getAvatarPath, formatUserName };
