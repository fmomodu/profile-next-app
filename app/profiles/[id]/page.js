import Link from "next/link";
import { neon } from "@neondatabase/serverless";


export default async function ProfileDetails({ params }) {
  const { id } = await params;

  const sql = neon(process.env.DATABASE_URL);


  const profiles = await sql`
  SELECT * FROM profiles
  WHERE id = ${Number(id)}
  `;

  const profile = profiles[0];

  if (!profile) {
    return (
      <main>
        <h1>Profile Not Found</h1>
        <p>That profile does not exist.</p>
        <Link href="/">Back Home</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>{profile.name}</h1>
      <p>Title: {profile.title}</p>
      <p>Year: {profile.year}</p>
      <p>Major: {profile.major}</p>

      <Link href={`/profiles/${profile.id}/edit`}>
      Edit Profile
      </Link>

      <br />
      <Link href="/">Back Home</Link>
    </main>
  );
}