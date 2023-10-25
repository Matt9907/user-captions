import { useRouter } from "next/router";
import { useState } from "react";





export default function UploadFunction(){
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    async function upload (ev){
        ev.preventDefault();
        const files = ev.target.files;
        if(files.length > 0){
            const file = files[0];
            setIsUploading(true);
            const res = await axios.postForm('/api/uplaod',{
                file,
            });
            setIsUploading(false);
            const newName = res.data.newName;
            router.push('/'+newName);
        }
    }

    
    
    
    
    
    
    
    return(
        <>
        
        
        
        
        
        </>

    );
}