import { defaultRoles } from "commons/constants/auth"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
  },
  {
    callbacks: {
      // authorized: ({ token }) => {
      //   return token?.role === defaultRoles.SUPER_ADMIN.name
      // },
    },
  }
)

export const config = { matcher: ["/admin"] }

