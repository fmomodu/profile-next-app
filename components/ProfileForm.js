export default function ProfileForm({
    action, 
    profile = {},
    buttonText
}) {
    return (
        <form action={action}>
            <label>
                Name:
                <input
                type="text"
                name="name"
                defaultValue={profile.name || ""}
                required
                />
            </label>

            <label>
                Title:
                <input
                type="text"
                name="title"
                defaultValue={profile.title || ""}
                required
                />
            </label>

            <label>
                Year:
                <input
                type="text"
                name="year"
                defaultValue={profile.year || ""}
                required
                />
            </label>

            <label>
                Major:
                <input
                type="text"
                name="major"
                defaultValue={profile.major || ""}
                required
                />
            </label>

            <button type="submit">{buttonText}</button>
        </form>
    );
}