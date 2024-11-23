import { useState, useEffect } from "react";
import { getAccessToken, getUserIdFromToken } from "@/lib/auth";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      setIsAuthenticated(true);
      setUserId(getUserIdFromToken(accessToken));
    } else {
      setIsAuthenticated(false);
      setUserId(null);
    }
  }, []);

  return { isAuthenticated, userId };
}
