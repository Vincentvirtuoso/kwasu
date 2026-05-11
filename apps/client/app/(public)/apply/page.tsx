import { Suspense } from "react";
import { ApplyPageClient } from "./ApplyClient";
import { Spinner } from "@kwasu-portal/components";

export default function ApplyPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ApplyPageClient />
    </Suspense>
  );
}
