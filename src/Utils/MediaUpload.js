import { createClient } from "@supabase/supabase-js"

const anone_key ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4am5ldGN0cHNlZGVxbGJjamdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4Mjg1OTAsImV4cCI6MjA1OTQwNDU5MH0.0ZKN4LAeyF4hsu4UUKGuYg3NYri50Dv4pkbLxOUi0yg"

const supabase_url ="https://bxjnetctpsedeqlbcjgj.supabase.co"


const supabase = createClient(supabase_url,anone_key)

export default function mediaUpload(file){

    return new Promise((resolve,reject)=>{

        if(file == null){
            reject("No file selected")
        }
        
        const timestamp = new Date().getTime();
        const fileName = timestamp+file.name
    
        supabase.storage.from("images").upload(fileName,file,{
            cacheControl : '3600',
            upsert : false,
        }).then(()=>{
    
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl)
        }).catch(()=>{
            reject("Error uploading file ")
        })
    });
    
   
}