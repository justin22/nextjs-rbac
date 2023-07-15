import { LoginButton, ProfileButton } from "commons/components/auth/auth-buttons";
export default async function Home() {

  return (
    <main>
      <h1>
        Welcome
      </h1>
      <div>
        <LoginButton />
        <ProfileButton />
      </div>
    </main>
  )
}
