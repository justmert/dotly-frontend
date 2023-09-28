import { useState, useContext } from "react";
import { UserContext } from "@/context/UserStateContext";
import { useRouter } from "next/router";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchValue) {
      setUser({ address: searchValue, publicKey: null }); // publicKey will be calculated in the UserStateProvider
      router.push(`/overview/${searchValue}`);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[500px]">
      <form onSubmit={handleSearchSubmit} className="w-1/2">
        <div className="flex space-x-3">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter address"
            className="border p-2 rounded w-3/4"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 rounded bg-blue-500 text-white w-1/4"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
