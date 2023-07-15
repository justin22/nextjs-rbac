import { defaultPermissions } from "commons/constants/auth";
import { authOptions } from "lib/auth";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const data: any = await getServerSession(authOptions);
  return (
    <div>
      <h1>
        Welcome {data.user.name}
      </h1>
      <h2>
        You are a {data.user.roleName}
      </h2>
      <p> Following are your permissions </p>
      <ul>
        {data.user.permissions.map((permission: keyof typeof defaultPermissions) => (
          <li key={permission}>{defaultPermissions[permission].description}</li>
        ))}
      </ul>
    </div>
  )
}