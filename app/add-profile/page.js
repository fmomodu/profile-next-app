import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function AddProfile() {
    async function createProfile(formData) {
        "use server";
        
        const sql = neon(process.env.DATABASE_URL);

        const name = formData.get("name");
        const title = formData.get("title");
        const year = formData.get("year");
        const major = formData.get("major");

        await sql`
        INSERT INTO profiles (name, title, year, major)
        VALUES (${name}, ${title}, ${year}, ${major})
        `;

        revalidatePath("/");
        redirect("/");

    }

    return (
        <main>
            <h1>Add Profile</h1>

            <form action={createProfile}>
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>

                <label>
                    Title:
                    <input type="text" name="title" required />
                </label>

                <label>
                    Year:
                    <input type="text" name="year" required />
                </label>

                <label>
                    Major:
                    <input type="text" name="major" required />
                </label>

                <button type="submit">Add Profile</button>

            </form>

            <Link href="/">Back Home</Link>
        </main>
    );
}