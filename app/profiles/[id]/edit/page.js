import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import ProfileForm from "../../../../components/ProfileForm";

export default async function EditProfile({ params }) {
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
        <Link href="/">Back Home</Link>
      </main>
    );
  }

  async function updateProfile(formData) {
    "use server";

    const sql = neon(process.env.DATABASE_URL);


    const name = formData.get("name");
    const title = formData.get("title");
    const year = formData.get("year");
    const major = formData.get("major");

    await sql`
      UPDATE profiles
      SET
        name = ${name},
        title = ${title},
        year = ${year},
        major = ${major}
      WHERE id = ${Number(id)}
    `;

    revalidatePath("/");
    revalidatePath(`/profiles/${id}`);
    redirect(`/profiles/${id}`);
  }

  async function deleteProfile() {
    "use server";

    const sql = neon(process.env.DATABASE_URL);
    await sql`
    DELETE FROM profiles
    WHERE id = ${Number(id)}
    `;

    revalidatePath("/");
    redirect("/");

  }
  

  return (
    <main>
      <h1>Edit Profile</h1>

      <ProfileForm
        action={updateProfile}
        profile={profile}
        buttonText="Update Profile"
      />

      <form action={deleteProfile}>
        <button type="submit">Delete Profile</button>
    </form>


      <Link href={`/profiles/${id}`}>Cancel</Link>
    </main>


  );
}