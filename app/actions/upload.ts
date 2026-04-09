"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { MAX_IMAGE_SIZE_MB, ACCEPTED_IMAGE_TYPES } from "@/lib/constants";

export async function uploadImage(formData: FormData) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Non autorisé");
  }

  const file = formData.get("file") as File | null;

  if (!file) {
    throw new Error("Aucun fichier");
  }

  // Validate type
  if (
    !ACCEPTED_IMAGE_TYPES.includes(
      file.type as (typeof ACCEPTED_IMAGE_TYPES)[number],
    )
  ) {
    throw new Error("Format accepté : JPEG, PNG, WebP");
  }

  // Validate size
  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    throw new Error(`Taille max : ${MAX_IMAGE_SIZE_MB}MB`);
  }

  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${user.id}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("recettes-images")
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("recettes-images").getPublicUrl(fileName);

  return { url: publicUrl };
}
