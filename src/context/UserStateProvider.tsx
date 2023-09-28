import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { IUser } from "@/types/general";
import { UserContext } from "@/context/UserStateContext";
import { Keyring } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";

export function UserStateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>({ address: null, publicKey: null });
  const router = useRouter();

  const keyring = new Keyring();

  const calculatePublicKey = (address: string | null): string | null => {
    if (!address) return null;

    try {
      const publicKey = keyring.decodeAddress(address);
      return u8aToHex(publicKey); // convert Uint8Array to hex representation
    } catch (error) {
      console.error("Failed to decode address:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    const { address } = router.query;

    if (!address && router.route !== "/") {
      router.push("/");
      return; // Exit early
    }

    if (typeof address === "string") {
      setUser({
        address,
        publicKey: calculatePublicKey(address),
      });
    }
  }, [router.query]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
