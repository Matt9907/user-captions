import { useEffect, useState } from "react";
import SparklesIcon from "./SparklesIcon";




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

        await ffmpeg.exec([
            '-i', filename,
            '-preset','ultrafast',
            '-vf', 
            'output.,mp4'
        ]);

        return(
            <>

            <div className="mb-4">
                <button 
                onClick={transcode}
                className="bg-green-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 cursor-pointer">
                    <SparklesIcon />
                    <span>Apply Caption</span>
                </button>
            </div>
            <div>
                primary color:
                <input type="color"
                       value={primaryColor}
                       onChange={ev => setPrimaryColor(ev.target.value)}/>
                       <br />

                outline color:
                <input type="color"
                       value={outlineColor}
                       onChange={ev => setOutlineColor(ev.target.value)} />
            </div>

            <div className="rounded-xl overflow-hidden relative">
                {progress && progress < 1 &&(
                    <div className="absolute inset-0 bg-black/80 flex items-center">
                        <div className="w-full text-center" >
                            <div className="bg-bg-gradient-from/50 mx-8 rounded-lg overflow-hidden relative">
                                <div className="bg-bg-gradient-from h-8"
                                style={{width:progress * 100+ '%'}}>
                                    <h3 className="text-white text-xl absolute inset-0 py-1">
                                        {parseInt(progress * 100)}%
                                    </h3>

                                </div>
                            </div>

                        </div>
                        </div>
                )}
                <video 
                    data-video={0}
                    ref={videoRef}
                    controls>

                    </video>

                
            </div>




            </>
        );
        
    }

}