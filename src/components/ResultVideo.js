import { useEffect, useState } from "react";




export default function ResultVideo({filename, transcriptionItems}){
    const videoUrl = "" + filename;
    const [loaded, setLoaded] = useState(false);
    const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
    const [outlineColor, setOutlineColor] = useState('#000000');
    const [progress, setProgress] = useState(1);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.src = videoUrl;
        load();
    }, []);

    const load = async () => {
        const ffmpeg = ffmpegRef.current;
        const baseURL = ''
        await ffmpeg.load({

        });

        await ffmpeg.writeFile('');
        await ffmpeg.writeFile('');
        setLoaded(true);
    }

    function toFFmpegColor(rgb){
        const bgr = rgb.slice(5,7) + rgb.slice(3,5) + rgb.slice(1,3);
        return '&H' + bgr + '&';
    }

    const transcode = async () =>{
        const ffmpeg = ffmpegRef.current;
    }

}