import React from 'react'
import ImageCompressor from './ImageCompressor';

export default function CompressorWrapper() {
    const handleUpload = (_compressedFile: Blob) => {
        // Implement your logic to upload the compressed file to your server
        console.log('File uploaded successfully!');
    };

    const handleError = (error: Error) => {
        // Handle upload errors (optional)
        console.error('Error:', error);
    };
    return (
        <div className='container'>
            <h1 className='text-light'>Image Compressor!</h1>
            <ImageCompressor onUpload={handleUpload} onError={handleError} />
        </div>
    )
}
