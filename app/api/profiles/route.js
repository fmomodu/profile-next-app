let profiles = [
  { id: 1, name: "Tom Holland", major: "CS", year: 2, gpa: 2.6 },
  { id: 2, name: "Ngozi Momodu", major: "CGT", year: 3, gpa: 4.0 },
];

function isValidProfile(profile) {
  return (
    typeof profile.name === "string" &&
    typeof profile.major === "string" &&
    Number(profile.year) >= 1 &&
    Number(profile.year) <= 4 &&
    Number(profile.gpa) >= 0 &&
    Number(profile.gpa) <= 4
  );
}


export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const major = searchParams.get("major");
  const year = searchParams.get("year");
  const name = searchParams.get("name");

  let filteredProfiles = profiles;

  if (major) {
    filteredProfiles = filteredProfiles.filter(
      (profile) => profile.major.toLowerCase() === major.toLowerCase()
    );
  }

  if (year) {
    filteredProfiles = filteredProfiles.filter(
      (profile) => profile.year === Number(year)
    );
  }

  if (name) {
    filteredProfiles = filteredProfiles.filter((profile) =>
      profile.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return Response.json(filteredProfiles, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();

  if (!isValidProfile(body)) {
    return Response.json(
      { error: "Missing or invalid fields" },
      { status: 400 }
    );
  }

  const newProfile = {
    id: Date.now(),
    name: body.name,
    major: body.major,
    year: Number(body.year),
    gpa: Number(body.gpa),
  };

  profiles.push(newProfile);

  return Response.json(newProfile, { status: 201 });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  const index = profiles.findIndex((profile) => profile.id === id);

  if (index === -1) {
    return Response.json(
      { error: "Profile not found" },
      { status: 404 }
    );
  }

  profiles.splice(index, 1);

  return Response.json(
    { message: "Profile deleted" },
    { status: 200 }
  );
}

export async function PATCH(request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  const body = await request.json();

  const index = profiles.findIndex((profile) => profile.id === id);

  if (index === -1) {
    return Response.json(
      { error: "Profile not found" },
      { status: 404 }
    );
  }

  const updatedProfile = {
    ...profiles[index],
    ...body,
  };

  if (!isValidProfile(updatedProfile)) {
    return Response.json(
      { error: "Missing or invalid fields" },
      { status: 400 }
    );
  }

  profiles[index] = updatedProfile;

  return Response.json(updatedProfile, { status: 200 });
}