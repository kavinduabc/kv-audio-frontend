import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase URL or anon key missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env");
}

let supabase = null;
try {
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (e) {
  console.warn("Failed to initialize Supabase client:", e.message || e);
}

export default async function mediaUpload(file){
    if(!file) throw new Error("No file selected");

    // If supabase is configured, try uploading there first
    if (supabase) {
        const timestamp = new Date().getTime();
        const fileName = `${timestamp}-${file.name}`;
        try {
            const { error: uploadError } = await supabase.storage.from("images").upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

            if (uploadError) throw uploadError;

            const { data: publicData, error: urlError } = await supabase.storage.from("images").getPublicUrl(fileName);
            if (urlError) throw urlError;
            return publicData.publicUrl;
        } catch (e) {
            console.error("Supabase upload failed:", e.message || e);
            // fallthrough to backend upload
        }
    }

    // Fallback: upload to backend public upload endpoint
    const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
    if (!backendUrl) throw new Error("Backend URL not configured for fallback upload");

    const formData = new FormData();
    formData.append('imageFile', file);

    try {
        const res = await fetch(`${backendUrl}/api/addImage/upload-public`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Backend upload failed: ${res.status} ${errText}`);
        }

        const data = await res.json();
        return data.url; // { url: 'http://host/uploads/filename' }
    } catch (e) {
        console.error("Backend upload failed:", e.message || e);
        throw new Error("Error uploading file: " + (e.message || e));
    }
}