import Link from "next/link";

export default function About() {
    return (
        <main>
            <h1>About</h1>
            <p>
                This profile app was upadted to use Next.js pages and routes for Lab 15.
            </p>

            <Link href="/">Back Home</Link>
        </main>
    )
}