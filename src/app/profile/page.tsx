import { Team } from "@prisma/client";
import { defaultPermissions } from "commons/constants/auth";
import { authOptions } from "lib/auth";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const data: any = await getServerSession(authOptions);
  console.log(JSON.stringify(data, null, 2));
  return (
    <div>
      <h1>
        Welcome {data.user.name}
      </h1>
      <h2>
        You are a {data.user.role.name}
      </h2>
      <hr />
      <div>
        <p> Below are the teams you are part of</p>
        <ul>
          {data.user.teams.map((team: Team) => (
            <li key={team.id}>{team.name} {team.id === data.user.currentTeamId && '(Current Team)'} </li>
          ))}
        </ul>
      </div>
      <hr />
      <p> Following are your permissions </p>
      <ul>
        {data.user.permissions.map((permission: keyof typeof defaultPermissions) => (
          <li key={permission}>{defaultPermissions[permission].description}</li>
        ))}
      </ul>
    </div>
  )
}