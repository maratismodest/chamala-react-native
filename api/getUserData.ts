const GOOGLE_URL = "https://www.googleapis.com";

export default async function getUserData(accessToken: string) {
  const userInfoResponse = await fetch(`${GOOGLE_URL}/userinfo/v2/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  try {
    const { data } = await userInfoResponse.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
