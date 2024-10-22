import { ChangeEvent, useState } from 'react';
import { Input, IconButton, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';

interface IFileInput {
    onFileChange: (file: File | null) => void;
}

export default function FileInput({ onFileChange }: IFileInput) {

    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const selectedFile = files[0];
            setFileName(selectedFile.name);
            onFileChange(selectedFile);
        } else {
            setFileName(null);
            onFileChange(null);
        }
    };

    const handleClearClick = () => {
        setFileName(null);
        onFileChange(null);
    };

    return (
        <div>
            <Input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                endAdornment={
                    <IconButton onClick={handleClearClick} color="secondary">
                        <ClearIcon />
                    </IconButton>
                }
            />
            <label htmlFor="file-input">
                <Input
                    type="text"
                    value={fileName || ''}
                    // readOnly
                    id="file-input"
                    endAdornment={
                        <IconButton component="label" htmlFor="file-input">
                            <CloudUploadIcon />
                        </IconButton>
                    }
                />
            </label>
            <Typography variant="body2" color="textSecondary" style={{ marginLeft: '8px' }}>
                {fileName || 'No file selected'}
            </Typography>
        </div>
    );
}