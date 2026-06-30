import Link from "next/link";

const profiles = [
  {
    id: 1,
    name: "Favour",
    title: "Student",
    year: "Senior",
    major: "Web Programming",
  },
  {
    id: 2,
    name: "Ngozi",
    title: "Professor",
    year: "Junior",
    major: "Cybersecurity",
  },
  {
    id: 3,
    name: "Zendaya",
    title: "Developer",
    year: "Senior",
    major: "Economics",
  },
];

export default async function ProfileDetails({ params }) {
  const { id } = await params;

  const profile = profiles.find(
    (profile) => profile.id === Number(id)
  );

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

      <Link href="/">Back Home</Link>
    </main>
  );
}