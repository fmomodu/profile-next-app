import { signIn } from "../../../auth.js";
import { AuthError } from "next-auth";

export default function SignInPage() {
  async function handleSignIn(formData) {
    "use server";

    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return;
      }

      throw error;
    }
  }

  return (
    <main style={{ maxWidth: "420px", margin: "100px auto" }}>
      <h1>Sign In</h1>

      <form action={handleSignIn}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button type="submit">Sign In</button>
      </form>
    </main>
  );
}