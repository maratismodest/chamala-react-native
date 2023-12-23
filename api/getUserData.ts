async function getUserData(accessToken: string) {
  const userInfoResponse = await fetch(
    "https://www.googleapis.com/userinfo/v2/me",
    {
      headers: {Authorization: `Bearer ${accessToken}`},
    },
  );

  userInfoResponse.json().then((data) => {
    return data;
  });
}
