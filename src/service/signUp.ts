import FirebaseAuthClient from '@/lib/firebaseAuthClient';

type User = {
  publicId: string;
  refreshToken: string;
  email: string;
};

export default async function signUp({
  email,
  password,
}: Record<string, string>): Promise<User> {
  const {
    localId: publicId,
    email: emailAddress,
    refreshToken,
  } = await FirebaseAuthClient.postSignUp({ email, password });

  // Put response data to mysql database by prisma client
  return {
    publicId,
    refreshToken,
    email: emailAddress,
  };
}
