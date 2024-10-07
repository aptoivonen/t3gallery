import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/BI5PAteZMPpt32LRKroCTjfFblhRaLdPemSYt7N6skMIur04",
  "https://utfs.io/f/BI5PAteZMPptZvQsWaxHy7pjBIkN294DmeqS6ViAhWXRb5of",
  "https://utfs.io/f/BI5PAteZMPpt6cKnYEf4zpT5V7PwerRbcFaYnlDNhLukdIW9",
  "https://utfs.io/f/BI5PAteZMPptLSUJMnkeEYoFCA6RyqiVlBzwf0Zn4XS1tNJM",
  "https://utfs.io/f/BI5PAteZMPptUX14i4v5QgETKsZJANYRyljdM4z3Hpcx2BL5",
];

const mockImages = mockUrls.map((url, index) => ({ id: index + 1, url }));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
      Hello Gallery in progress
    </main>
  );
}
