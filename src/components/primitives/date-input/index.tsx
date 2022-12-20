import React from 'react';
import DatePicker from 'react-date-picker';

const DateInput = ({
    prefix, dateToDisplay, onChange, ...props
}: {
    prefix: string, dateToDisplay: number, onChange: (date: number) => void
} & HtmlPropsNoRef<HTMLDivElement>) => {
    const [value, setValue] = React.useState(() => new Date(dateToDisplay * 1000));

    return (
        <div
            css={{
                padding: '0 20px',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.0784314)',
                borderRadius: '500px',
                border: '1px solid #707070',
                backgroundColor: 'var(--color-gray-white)',
                '.react-date-picker': {
                    width: '100%',
                },
                '.react-date-picker__wrapper': {
                    border: '1px solid transparent',
                    height: '56px',
                },
                '@media (max-width: 767px)': {
                    paddingTop: '8px',
                    paddingBottom: '8px',

                    '.react-date-picker__wrapper': {

                        height: 'auto',
                    },
                },
            }}
            {...props}
        >
            <DatePicker
                format={`${prefix} d.M.y`}
                onChange={(e: Date) => {
                    const newDate = e.getTime();

                    setValue(e);
                    onChange(Math.floor(newDate / 1000));
                }}
                value={value}
                clearIcon={null}
                calendarIcon={null}
                css={{
                    paddingRight: '36px',
                }}
            />
        </div>
    );
};

export default DateInput;
