import FirebaseAuthClient, { type SignInUser } from '@/lib/firebaseAuthClient';

export default async function auth({
  email,
  password,
}: Record<string, string>): Promise<SignInUser> {
  const { localId, displayName, idToken, registered, refreshToken }
    = await FirebaseAuthClient.postSignIn({ email, password });
  return {
    localId,
    displayName,
    idToken,
    registered,
    refreshToken,
  };
}
