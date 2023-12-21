export async function POST(req){
    const formData = await req.formData();
    const file = formData.get('file');
    const {name, type} = file;
    const data = await file.arrayBuffer();

    const s3client = new S3Client({
        region: 'us-east-1',
        credentials:{
            accessKeyId: "",
            secretAccessKey: "",

        },
    });
    
    const id = uniqid();
    const ext = name.split('.').slice(-1)[0];
    const newName = id + '.' + ext;

    const uploadCommand = new PutObjectCommand({
        Bucket: "",
        Body: data,
        ACL: 'public-read',
        ContentType: type,
        Key: newName,
        
        
        
    });

    
    await  s3client.send(uploadCommand);
    return Response.json({name, ext, newName, id});
}