import React from 'react';
import * as localForage from 'localforage';
import Button from '../button';
// eslint-disable-next-line import/no-cycle
import RowSet from './row-set';
import Container from './container';
import Row from './row';
import { useGridContext } from './context';
import useBreakpointValue from './use-breakpoint-value';
import Col from './col';

const GridPanel = ({ show, setShow }) => {
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
                <div css={{
                    paddingBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '10px',
                }}
                >
                    <div>Layout Debug</div>
                    <button
                        onClick={() => {
                            setOpen(false);
                        }}
                        css={{
                            backgroundColor: '#eee',
                            padding: '3px 6px',
                            borderRadius: '3px',
                        }}
                    >
                        Close
                    </button>
                </div>
                <RowSet breakpoints={{ dt: { between: 4 } }}>
                    {Object.entries(show).map(([key, val]) => (
                        <div>
                            <Button
                                css={{
                                    backgroundColor: val ? 'green' : 'black',
                                    color: '#fff',
                                    padding: '4px 10px',
                                    borderRadius: '3px',
                                    transition: '0.2s',
                                }}
                                onClick={() => {
                                    setShow((e: any) => ({
                                        ...e,
                                        [key]: !val,
                                    }));
                                }}
                            >
                                {key}
                                :
                                {(val as boolean).toString()}
                            </Button>
                        </div>
                    ))}
                </RowSet>
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

const GridDebug = (): JSX.Element => {
    const { sortedBreakpoints, desktopFirst } = useGridContext();
    const cols = useBreakpointValue({
        items: (() => sortedBreakpoints.map(x => ({ query: x[1].query, value: x[1].columns })))(),
        defaultValue: 12,
        desktopFirst,
    });
    const [show, setShow] = React.useState({
        centerLine: false,
        grid: false,
    });

    React.useEffect(() => {
        (async () => {
            const found = await localForage.getItem('audal_grid_debug');
            if (found) {
                // @ts-ignore
                setShow(found);
            }
        })();
    }, []);

    React.useEffect(() => {
        localForage.setItem('audal_grid_debug', show);
    }, [show]);

    return (
        <>
            {show?.centerLine && (
                <div css={{
                    position: 'fixed',
                    left: 'calc(50% - 12px)',
                    width: '24px',
                    height: '100%',
                    backgroundColor: 'green',
                    top: '0',
                    pointerEvents: 'none',
                }}
                />
            )}
            {show?.grid && (
                <Container css={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                }}
                >
                    <Row css={{ height: '100%' }}>
                        {Array.from([...new Array(cols)]).map((_, idx) => (
                            <Col
                                breakpoints={{ dt: { span: 1 } }}
                                css={{
                                    backgroundColor: 'green',
                                    opacity: 0.3,
                                }}
                            />
                        ))}
                    </Row>
                </Container>
            )}
            <GridPanel
                show={show}
                setShow={setShow}
            />
        </>
    );
};

export default GridDebug;
