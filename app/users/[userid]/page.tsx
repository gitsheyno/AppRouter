import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import UserPosts from "./components/UserPosts";
import { Suspense } from "react";
type Params = {
  params: {
    userid: string;
  };
};

export default async function UserPage({ params: { userid } }: Params) {
  const userData: Promise<User> = getUser(userid);
  const userPostsData: Promise<Post[]> = getUserPosts(userid);

  //   const [user, userPosts] = await Promise.all([userData, userPostsData]);
  const user = await userData;

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* @ts-expect-error Server Component */}
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
}
