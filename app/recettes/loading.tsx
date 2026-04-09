import { SkeletonGrid } from "@/components/ui/SkeletonCard";

export default function Loading() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <div className="skeleton h-10 w-48 rounded-xl" />
        <div className="skeleton h-5 w-96 rounded mt-3" />
      </div>
      <div className="skeleton h-16 w-full rounded-xl" />
      <SkeletonGrid count={12} />
    </div>
  );
}
