import FirebaseAuthClient from '@/lib/firebaseAuthClient';

type User = {
  localId: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
};

export default async function auth({
  email,
  password,
}: Record<string, string>): Promise<User> {
  const { localId, displayName, idToken, registered, refreshToken }
    = await FirebaseAuthClient.postSignUp({ email, password });
  return {
    localId,
    displayName,
    idToken,
    registered,
    refreshToken,
  };
}
