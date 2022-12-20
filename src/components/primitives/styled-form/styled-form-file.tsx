import React, {useState} from 'react';
import {useFormProvider} from '../form-provider';
import FileUploadSvg from '../../../images/file-arrow-up-light.svg';
import CancelSvg from '../../../images/cancel.svg';

const StyledFormFileInput = ({ name }: { name: string }): JSX.Element => {
    const [files, setFiles] = useState<unknown[]>([]);
    const formContext = useFormProvider();

    const handleFileUpload = (e) => {
        setFiles(prev => [...prev, ...Object.values(e?.target?.files)]);
        formContext?.setValue(name, [...files, ...Object.values(e?.target?.files)]);
    };

    const deleteFile = (fileName: string) => {
        const updatedFiles = files.filter(file => file?.name !== fileName);
        setFiles(prev => [...updatedFiles]);
        formContext?.setValue(name, [...updatedFiles]);
    };
    return (
        <div css={{ position: 'relative', color: '#174874' }}>
            <div css={{ display: 'flex', position: 'relative' }}>
                <FileUploadSvg />
                <p className="p2" css={{ marginLeft: '12px', color: '#174874', textDecoration: 'underline' }}>
                    Anhang hochladen (JPG,PDF,PNG)
                </p>
                <input
                    type="file"
                    name="attachment"
                    css={{ position: 'absolute', width: '100%', height: '100%', opacity: '0' }}
                    multiple
                    accept="image/jpeg, image/png, application/pdf"
                    onChange={handleFileUpload}
                />
            </div>
            <div css={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap' }}>
                {
                    files && files.map(item => (
                        <div css={{ display: 'flex', alignItems: 'center', width: 'auto', marginRight: '10px' }}>
                            <p className="p2" css={{ marginRight: '10px' }}>{item?.name}</p>
                            {' '}
                            <button type='button' onClick={(e) => { deleteFile(item?.name); }}>
                                <CancelSvg />
                            </button>
                            {' '}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default StyledFormFileInput;
