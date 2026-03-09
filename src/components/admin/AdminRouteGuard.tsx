"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type SessionAdmin = {
  id: string;
  username: string;
  name: string;
  designation: string;
  adminType: string;
  permissions: string[];
  mobileNumber: string;
  email: string;
};

export default function AdminRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth/session", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data?.success || !data?.admin) {
          router.replace("/");
          return;
        }

        if (isMounted) {
          setIsAuthorized(true);
        }
      } catch (error) {
        router.replace("/");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-full border-4 border-zinc-200 border-t-[#268999] animate-spin" />
          <p className="mt-4 text-sm font-bold text-zinc-500">
            Checking admin session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) return null;

  return <>{children}</>;
}