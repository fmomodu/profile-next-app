import Link from "next/link";
import { neon } from "@neondatabase/serverless";



export default async function Home({ searchParams }) {
  const params = await searchParams;

  const sql = neon(process.env.DATABASE_URL);
  const profiles = await sql`SELECT * FROM profiles ORDER BY id`;
  

  const title = params.title || "";
  const search = params.search || "";

  const filteredProfiles = profiles.filter((profile) => {
    const matchesTitle =
      title === "" || profile.title.toLowerCase() === title.toLowerCase();

    const matchesSearch =
      search === "" ||
      profile.name.toLowerCase().includes(search.toLowerCase());

    return matchesTitle && matchesSearch;
  });

  return (
    <main>
      <h1>Favour&apos;s Profile App</h1>
      <p>Lab 15: Next.js Pages and Routes</p>

      <p>
        <Link href="/add-profile"> Add Profile</Link>
      </p>


      <form action="/">
        <label>
          Filter by title:
          <select name="title" defaultValue={title}>
            <option value="">All</option>
            <option value="Student">Student</option>
            <option value="Professor">Professor</option>
            <option value="Developer">Developer</option>
          </select>
        </label>

        <label>
          Search by name:
          <input
            name="search"
            defaultValue={search}
            placeholder="Search by name"
          />
        </label>

        <button type="submit">Apply</button>
      </form>

      <p>Showing {filteredProfiles.length} profiles</p>

      {filteredProfiles.map((profile) => (
        <div className="profile-card" key={profile.id}>
          <h2>{profile.name}</h2>
          <p>Title: {profile.title}</p>
          <p>Year: {profile.year}</p>
          <p>Major: {profile.major}</p>
          <Link href={`/profiles/${profile.id}`}>View Profile</Link>
        </div>
      ))}
    </main>
  );
}