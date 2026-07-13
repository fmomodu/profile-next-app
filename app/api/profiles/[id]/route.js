import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { id } = await params;
  const profileId = Number(id);

  if (Number.isNaN(profileId)) {
    return Response.json(
      { error: "Invalid profile ID" },
      { status: 400 }
    );
  }

  const sql = neon(process.env.DATABASE_URL);

  const profiles = await sql`
    SELECT * FROM profiles
    WHERE id = ${profileId}
  `;

  const profile = profiles[0];

  if (!profile) {
    return Response.json(
      { error: "Profile not found" },
      { status: 404 }
    );
  }

  return Response.json({ data: profile }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const profileId = Number(id);

  if (Number.isNaN(profileId)) {
    return Response.json(
      { error: "Invalid profile ID" },
      { status: 400 }
    );
  }

  const body = await request.json();

  const { name, title, year, major } = body;

  if (!name || !title || !year || !major) {
    return Response.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const sql = neon(process.env.DATABASE_URL);

  const updatedProfiles = await sql`
    UPDATE profiles
    SET
      name = ${name},
      title = ${title},
      year = ${year},
      major = ${major}
    WHERE id = ${profileId}
    RETURNING *
  `;

  const updatedProfile = updatedProfiles[0];

  if (!updatedProfile) {
    return Response.json(
      { error: "Profile not found" },
      { status: 404 }
    );
  }

  return Response.json(
    { data: updatedProfile },
    { status: 200 }
  );
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const profileId = Number(id);

  if (Number.isNaN(profileId)) {
    return Response.json(
      { error: "Invalid profile ID" },
      { status: 400 }
    );
  }

  const sql = neon(process.env.DATABASE_URL);

  const deletedProfiles = await sql`
    DELETE FROM profiles
    WHERE id = ${profileId}
    RETURNING *
  `;

  if (deletedProfiles.length === 0) {
    return Response.json(
      { error: "Profile not found" },
      { status: 404 }
    );
  }

  return Response.json(
    { message: "Profile deleted successfully" },
    { status: 200 }
  );
}