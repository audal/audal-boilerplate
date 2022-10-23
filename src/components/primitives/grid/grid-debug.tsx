import React from 'react';

const GridDebug = (): JSX.Element => {
    const [open, setOpen] = React.useState(false);

    if (open) {
        return (
            <div css={{
                position: 'fixed',
                backgroundColor: 'white',
                width: 'min(200px, 20%)',
                minHeight: '200px',
                boxShadow: '0 0 8px #0004',
                borderRadius: '8px',
                bottom: '40px',
                right: '40px',
                padding: '10px',
            }}
            >
                <h2>Layout Debug</h2>

            </div>
        );
    }

    return (
        <button
            type="button"
            css={{
                position: 'fixed',
                backgroundColor: 'white',
                width: '40px',
                height: '40px',
                boxShadow: '0 0 8px #0004',
                borderRadius: '8px',
                bottom: '40px',
                right: '40px',
                padding: '4px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: '0.3s',
                '&:hover': {
                    backgroundColor: '#000',
                    color: '#fff',
                },
            }}
            onClick={() => {
                setOpen(true);
            }}
        >
            <h2>Layout</h2>
        </button>
    );
};

export default GridDebug;
