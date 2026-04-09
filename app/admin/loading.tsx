import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-accent" />
      <p className="text-muted-foreground animate-pulse">
        Chargement de la console...
      </p>
    </div>
  );
}
