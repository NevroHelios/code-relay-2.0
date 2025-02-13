import { authMiddleware } from "@thirdweb-dev/auth/next";

export default authMiddleware({
  // Routes that require an admin wallet to access must match ADMIN_WALLET (case insensitive)
  adminAddresses: [process.env.ADMIN_WALLET!],
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
