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
        const srt = transcriptionItemsToSrt(transcriptionItems);
        await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
        await ffmpeg.writeFile('subs.srt',srt);
        videoRef.current.src = videoUrl;
        await new Promise((resolve,reject) =>{
            videoRef.current.onloadedmetadata = resolve;

        });

        const duration = videoRef.current.duration;
        ffmpeg.on('log', ({message}) =>{
            const regexResult = /time=([0-9:.] +) /.exec(message);
            if(regexResult && regexResult?.[1]){
                const howMuchIsDone = regexResult?.[1];
                const [hours,minutes,seconds] = howMuchIsDone.split(':');
                const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
                const videoProgress = doneTotalSeconds/duration;
                setProgress(videoProgress);
            }
        });
        
    }

}