import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function RecherchePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const queryString = new URLSearchParams(
    params as Record<string, string>,
  ).toString();
  redirect(`/recettes${queryString ? `?${queryString}` : ""}`);
}
