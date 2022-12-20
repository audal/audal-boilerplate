import React from 'react';
import { FieldValues } from 'react-hook-form';
import { StyledIconButtonColored } from '../styled-icon-button';
import Row from '../grid/row';
import RowSet from '../grid/row-set';
import FormProvider from '../form-provider';
import Spinner from '../spinner';
import { WPImage } from '../image/gatsby-image-svg-fallback';
import FormAlert from '../form-alert';

interface StyledFormProps {
    title?: string
    bodyText?: string
    submitButtonText: string
    children: React.ReactNode | React.ReactNode[]
    prepareForSubmit: (props: FieldValues) => FieldValues;
    endpoint: string;
    borderTop?: boolean;
    image?: any;
    asFormData?: boolean
}

const StyledForm = ({
    title, bodyText, submitButtonText, children, prepareForSubmit, endpoint, borderTop = true, image, asFormData = false,
}: StyledFormProps): JSX.Element => {
    const [formSuccess, setSuccess] = React.useState<string|undefined>(undefined);
    const [formError, setFormError] = React.useState<string|undefined>(undefined);
    const [loading, setIsLoading] = React.useState(false);

    const onSubmit = (values: FieldValues) => {
        if (!formSuccess) {
            setFormError(undefined);
            const parsedValues = asFormData ? (() => {
                const data = prepareForSubmit(values);
                const fd = new FormData();
                Object.entries(data).map(([k, v]) => {
                    if (Array.isArray(v) && v[0] instanceof File) {
                        v.forEach((file) => {
                            fd.append(`${k}[]`, file);
                        });
                    } else {
                        fd.append(k, v);
                    }
                });
                return fd;
            })() : prepareForSubmit(values);

            setIsLoading(true);
            fetch(endpoint, {
                method: 'POST',
                // @ts-ignore
                body: asFormData ? parsedValues : JSON.stringify(parsedValues),
                headers: asFormData ? {} : {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((r) => {
                        setSuccess(r.message);
                    });
                } else if (res.status === 400 || res.status === 401) {
                    res.json().then((r) => {
                        setFormError(r.message);
                    });
                } else {
                    setSuccess(undefined);
                    setFormError(res.statusText);
                }
                setIsLoading(false);
            }).catch((e) => {
                setIsLoading(false);
                setSuccess(undefined);
                setFormError('Unbekannter Fehler.');
                return false;
            });
        }
    };

    return (
        <FormProvider onSubmit={onSubmit}>
            <Row
                css={{
                    width: '100%',
                    borderBottomWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--color-gray-mittelgrau)',
                    paddingTop: '71px',
                    paddingBottom: '51px',
                    borderTopWidth: `${borderTop ? '1px' : '0px'}`,
                    '@media (max-width: 1200px)': {
                        gridTemplateColumns: 'repeat(4, 1fr)',
                    },
                }}
            >
                <div
                    css={{
                        gridColumn: 'span 5',
                        backgroundColor: 'var(--color-gray-almostwhite)',
                        borderRadius: '16px',
                        padding: '41px 60px 54px 60px',
                        width: '100%',
                        '@media (max-width: 1200px)': {
                            gridColumn: 'span 4',
                        },
                        '@media (max-width: 767px)': {
                            padding: '41px 22px 33px',
                        },
                    }}
                >
                    <RowSet
                        breakpoints={{ dt: { between: 20 } }}
                        css={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            alignItems: 'start',
                        }}
                    >
                        {title && (
                            <div className="h2">
                                {title}
                            </div>
                        )}
                        {bodyText && (
                            <div className="p2">
                                {bodyText}
                            </div>
                        )}
                        {children}
                        <StyledIconButtonColored
                            css={{
                                width: '100%',
                                flexShrink: 0,
                                fontWeight: '600',
                                cursor: 'pointer',
                                paddingTop: '15px',
                                height: '50px',
                                paddingBottom: '15px',
                                backgroundColor: 'var(--color-blue-mittelblau)',
                                color: 'var(--color-gray-white)',
                            }}
                            type="submit"
                            disabled={!!formSuccess}
                        >
                            {loading ? <Spinner /> : formSuccess ? '🗸' : submitButtonText}
                        </StyledIconButtonColored>
                        {formError && (
                            <FormAlert>{formError}</FormAlert>
                        )}
                        {formSuccess && (
                            <div css={{ paddingTop: '12px' }}>
                                {formSuccess}
                            </div>
                        )}
                    </RowSet>
                </div>
                {image
                    && (
                        <div
                            css={{
                                width: '100%',
                                maxHeight: '600px',
                                gridColumn: 'span 7',
                                '@media (max-width: 1200px)': {
                                    gridColumn: 'span 4',
                                    marginTop: '50px',
                                },
                            }}
                        >
                            <WPImage
                                src={image}
                                css={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '16px',
                                }}
                            />
                        </div>
                    )}
            </Row>
        </FormProvider>
    );
};

export default StyledForm;
