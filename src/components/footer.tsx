import React from 'react';

const Footer: React.FC = () => (
    <footer>
        <div css={{
            display: 'flex',
            backgroundColor: 'black',
            width: '100%',
        }}
        >
            <div
                css={{
                    alignItems: 'center',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'white',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                }}
            >
                ©
                {new Date().getFullYear()}
                <strong css={{ paddingLeft: '4px', paddingRight: '4px' }}>
                    Audal Labs
                </strong>
            </div>
        </div>
    </footer>
);

export default Footer;
