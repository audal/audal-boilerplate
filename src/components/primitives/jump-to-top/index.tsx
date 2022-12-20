import React from 'react';
import useScrollPosition from '@react-hook/window-scroll';
import JumpToTopArrow from '../../../images/jump-to-top-arrow.svg';
import Container from '../grid/container';
import Row from '../grid/row';
import Col from '../grid/col';

const JumpToTop = (): JSX.Element => {
    const y = useScrollPosition(1);
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        if (y > window.innerHeight * 2 && !show) {
            setShow(true);
        } else if (y < window.innerHeight * 2 && show) {
            setShow(false);
        }
    }, [y, show]);

    const handleClick = () => {
        typeof window !== 'undefined'
        && window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <Container css={{
            '@media (max-width: 767px)': {
                display: 'none',
            },
        }}
        >
            <Row>
                <Col
                    breakpoints={{ dt: { start: 8, span: 3 } }}
                    css={{
                        position: 'fixed',
                        bottom: '40px',
                        right: '40px',
                        zIndex: '999',
                    }}
                >
                    <button
                        type="button"
                        css={{
                            width: '51px',
                            height: '51px',
                            maxWidth: '100%',
                            border: 'none',
                            display: 'flex',
                            cursor: 'pointer',
                            transition: '0.3s',
                            visibility: show ? 'visible' : 'hidden',
                            transform: show ? 'translateY(-20px)' : 'translateY(0px)',
                            opacity: show ? '1' : '0',
                        }}
                        onClick={handleClick}
                    >
                        <span
                            css={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                background: 'var(--color-blue-mittelblau)',
                                alignItems: 'center',
                                borderRadius: '50%',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <JumpToTopArrow
                                css={{
                                    width: '18px',
                                    color: 'var(--color-gray-white)',
                                }}
                            />
                        </span>
                    </button>
                </Col>
            </Row>
        </Container>
    );
};

export default JumpToTop;
