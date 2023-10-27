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
        {isUploading && (
            <div className="bg-black/90 text-white fixed inset-0 flex items-center">
                <div className="w-full text-center">
                    <h2 className="text-4xl mb-4">Uploading</h2>
                    <h3 className="text-xl">Please Wait...</h3>
                </div>
            </div>
        )}
        
        
        
        
        
        
        </>

    );
}