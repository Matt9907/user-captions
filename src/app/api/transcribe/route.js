function getClient(){
    return new TranscribeClient({
        region:'us-east-1',
        credentials:{
            accessKeyId: "",
            secretAccessKey: "",
        },
    });
}

function createTranscriptionCommand(filename){
    return new StartTranscriptionJobCommand({
        TranscriptionJobName: filename,
        OutputBucketName: "",
        OutputKey: filename + ".transcription",
        IdentifyLanguage: true,

        Media:{
            MediaFileUri: 's3://' +  "" + '/'+filename,
        },


    });
}

async function createTranscriptionJob(filename){
    const transcribeClient = getClient();
    const transcriptionCommand = createTranscriptionCommand(filename);
    return transcribeClient.send(transcriptionCommand);
}

async function getJob(filename){
    const transcribeClient = getClient();
    let jobStatusResult = null;
    try{
        const transcriptionJobStatusCommand = new GetTranscriptionJobCommand({
            TranscriptionJobName: filename,
        });
        jobStatusResult = await transcribeClient.send(
            transcriptionJobStatusCommand
        );
    }catch  (e) {}
    return jobStatusResult;
}

async function streamToString(stream){
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data',chunk => chunks.push(Buffer.from(chunk)));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        stream.on('error', reject);
    });
}

async function getTranscriptionFile(filename){
    const transcriptionFile = filename + '.transcription';
    const s3client = new S3Client({
        region: 'us-east-1',
        credentials:{
            accessKeyId:"",
            secretAccessKey: '',
        },

    });
    const getObjectCommand = new GetObjectCommand({
        Bucket: "",
        Key: "",
    });
    let transcriptionFileResponse = null;
    try{
        transcriptionFileResponse = await s3client.send(getObjectCommand);
    } catch (e) {}
    if(transcriptionFileResponse){
        return JSON.parse(
            await streamToString(transcriptionFileResponse.Body)
        );


    }
    return null;
    
}
export async function GET(req){
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const filename = searchParams.get('filename');

    const transcription = await getTranscriptionFile(filename);
    if(transcription){
        return Response.JSON({
            status:"",
            transcription,
        });
    }
}