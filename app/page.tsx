import { Suspense } from "react";
import { MbtiGame } from "@/components/mbti/MbtiGame";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <MbtiGame />
    </Suspense>
  );
}
