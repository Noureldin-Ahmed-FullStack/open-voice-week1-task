
import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

interface ImageCompressorProps {
    onUpload: (compressedFile: Blob) => void; // Function to handle successful upload
    onError: (error: Error) => void; // Function to handle upload errors (optional)
}

const ImageCompressor: React.FC<ImageCompressorProps> = ({ onUpload, onError }) => {
    const [selectedFile, setSelectedFile] = useState<Blob | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = event.target.files?.[0];

        if (!imageFile) {
            console.error('No image selected');
            return;
        }

        setSelectedFile(imageFile);

        try {
            const options = {
                maxSizeMB: 1, // Adjust for desired maximum size (in MB)
                maxWidthOrHeight: 1920, // Adjust for desired maximum width or height (in pixels)
                useWebWorker: true, // Utilize Web Workers for better performance
            };

            const compressedFile = await imageCompression(imageFile, options);
            console.log('Compressed file size:', compressedFile.size / 1024 / 1024, 'MB');

            onUpload(compressedFile); // Call the provided onUpload function

            const url = URL.createObjectURL(compressedFile);
            setImageUrl(url);
        } catch (error: any) {
            console.error('Compression error:', error);
            if (onError) {
                onError(error); // Call the provided onError function if defined
            }
        }
    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <input type="file" accept="image/*" className='form-control my-3' onChange={handleImageChange} />
            {imageUrl && (
                <div className='d-flex flex-column w-50'>
                    <img src={imageUrl} alt="Compressed Image" />
                    <a href={imageUrl} className='my-3 btn btn-outline-success' download="compressed-image.jpg">
                        Download Compressed Image
                    </a>
                </div>
            )}
        </div>
    );
};

export default ImageCompressor;