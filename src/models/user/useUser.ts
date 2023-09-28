import { useContext } from "react";
import { UserContext } from "@/context/UserStateContext";

export function useUser() {
    const context = useContext(UserContext);

    if (context === undefined) {
      throw new Error('useUser must be used within a ProtocolProvider');
    }
    
    return context;
}