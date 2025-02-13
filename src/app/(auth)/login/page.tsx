'use client'

import { useState } from 'react'
import { ThirdwebProvider, ConnectButton } from "thirdweb/react"
import { createThirdwebClient } from "thirdweb"
import { createAuth } from "thirdweb/auth"
import { privateKeyToAccount } from "viem/accounts"


// Use environment variable properly
const THIRDWEB_CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ''



const client = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID, // get yours by creating a project on https://thirdweb.com/create-api-key
});

const thirdwebAuth = createAuth({
  domain: "localhost:3000",
  client,
  adminAccount: privateKeyToAccount({ client, privateKey }),
});

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    // The ThirdwebProvider should be at the root of your application, but the ConnectButton can be anywhere
    <ThirdwebProvider>
      <ConnectButton
        client={client}
        auth={{
          getLoginPayload: async (params) => {
            // here you should call your backend, using generatePayload to return
            // a SIWE compliant login payload to the client
            return thirdwebAuth.generatePayload(params);
          },
          doLogin: async (params) => {
            // here you should call your backend to verify the signed payload passed in params
            // this will verify that the signature matches the intended wallet
            const verifiedPayload =
              await thirdwebAuth.verifyPayload(params);
            setLoggedIn(verifiedPayload.valid);
          },
          isLoggedIn: async () => {
            // here you should ask you backend if the user is logged in
            // can use cookies, storage, or your method of choice
            return loggedIn;
          },
          doLogout: async () => {
            // here you should call your backend to logout the user if needed
            // and delete any local auth tokens
            setLoggedIn(false);
          },
        }}
      />
    </ThirdwebProvider>
  );
}
