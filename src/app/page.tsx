import { LoginButton, LogoutButton, ProfileButton, RegisterButton } from "commons/components/auth/auth-buttons";
export default async function Home() {

  return (
    <main>
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
    </main>
  )
}
