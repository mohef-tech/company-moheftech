import bcrypt from "bcryptjs";

export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const validUsername = process.env.ADMIN_USERNAME;
  const validPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!validUsername || !validPasswordHash) {
    throw new Error(
      "ADMIN_USERNAME atau ADMIN_PASSWORD_HASH belum di-set di environment variable"
    );
  }

  const decodedPasswordHash = Buffer.from(validPasswordHash, "base64").toString("utf-8");

  const isUsernameCorrect = username === validUsername;
  const isPasswordCorrect = await bcrypt.compare(password, decodedPasswordHash);

  return isUsernameCorrect && isPasswordCorrect;
}