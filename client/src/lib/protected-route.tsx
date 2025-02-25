import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  
  const { data: session, isLoading } = useQuery({
    queryKey: ['/api/admin/session'],
    retry: false
  });

  useEffect(() => {
    if (!isLoading && !session) {
      setLocation('/admin/login');
    }
  }, [session, isLoading, setLocation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
