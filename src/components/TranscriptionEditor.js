import TranscriptionItem from "./TranscriptionItem";

export default function TranscriptionEditor({
    awsTranscriptonItems,
    setAwsTranscriptionItems,
}) {
    function updateTranscriptionItem(index, prop, ev){
        const newAwsItems = [...awsTranscriptonItems];
        const newItem = {...newAwsItems[index]};
        newItem[prop] = ev.target.value;
        newAwsItems[index] = newItem;
        setAwsTranscriptionItems(newAwsItems);
    }

    return(
        <>
        
        </>
    )
}