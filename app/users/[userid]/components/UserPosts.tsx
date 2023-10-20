type Props = {
  promise: Promise<Post[]>;
};

async function UserPosts({ promise }: Props) {
  const posts = await promise;

  const content = posts.map((post) => {
    return (
      <article key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <br />
      </article>
    );
  });
  return content;
}

export default UserPosts;
