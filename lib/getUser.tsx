export default async function getUser(userId: string) {
  console.log("userID : ", userId);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (!res.ok) undefined;

  return res.json();
}
