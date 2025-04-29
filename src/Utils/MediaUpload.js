import { createClient } from "@supabase/supabase-js"

const anone_key ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbm91Z2Znc2ZsYWplcGloenpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MzM0NDUsImV4cCI6MjA2MTQwOTQ0NX0.HFikQ2QACpaqv9p6pUg5JfnIOwU3VvZK7whgxx3k5rI"


//const supabase_url ="https://bxjnetctpsedeqlbcjgj.supabase.co"

const supabase_url ="https://bqnougfgsflajepihzzg.supabase.co"


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