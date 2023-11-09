import { useState } from "react";




export default function ResultVideo({filename, transcriptionItems}){
    const videoUrl = "" + filename;
    const [loaded, setLoaded] = useState(false);
    const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
    const [outlineColor, setOutlineColor] = useState('#000000');
    const [progress, setProgress] = useState(1);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);

}