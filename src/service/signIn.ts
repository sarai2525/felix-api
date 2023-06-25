import FirebaseAuthClient from '../lib/firebaseAuthClient.js';

interface User {
  publicId: string;
  displayName: string;
  registered: boolean;
  refreshToken: string;
  idToken: string;
  email: string;
}

export default async function signIn({ email, password }: Record<string, string>): Promise<User> {
  const {
    localId: publicId,
    displayName,
    idToken,
    registered,
    refreshToken
  } = await FirebaseAuthClient.postSignIn({ email, password });
  return {
    publicId,
    displayName,
    idToken,
    registered,
    refreshToken,
    email
  };
}
