import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import UserPosts from "./components/UserPosts";
import getAllUsers from "@/lib/getAllUsers";
import { Suspense } from "react";
import { Metadata } from "next";

type Params = {
  params: {
    userid: string;
  };
};

export async function generateMetadata({
  params: { userid },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userid);
  const user: User = await userData;

  return {
    title: user.name,
    description: `this is a page of${user.name}`,
  };
}

export default async function UserPage({ params: { userid } }: Params) {
  const userData: Promise<User> = getUser(userid);
  const userPostsData: Promise<Post[]> = getUserPosts(userid);

  //   const [user, userPosts] = await Promise.all([userData, userPostsData]);
  const user: User = await userData;

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* @ts-expect-error server component */}
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  const userData: Promise<User[]> = getAllUsers();
  const users: User[] = await userData;

  return users.map((user) => {
    return {
      userid: user.id.toString(),
    };
  });
}
