import React from 'react';
import Row from '../grid/row';
import Col from '../grid/col';
import Container from '../grid/container';
import DateInput from '../date-input';
import StyledButton from '../styled-button';
import FilterInput from '../filter-input';

const SearchBar = ({
    filterName, filterPlaceholder, filterValue, filterOnchange, dateInputPrefixOne, 
    dateInputPrefixTwo, setFromDate, setToDate, fromDate, toDate,
}): JSX.Element => (
    <Container>
        <Row
            css={{
                '@media (max-width: 1200px)': {
                    gridGap: '16px',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                },
            }}
        >
            <Col
                breakpoints={{ dt: { span: 6 }, tb: { span: 4 } }}
            >
                <FilterInput name={filterName} placeholder={filterPlaceholder} value={filterValue} onChange={filterOnchange} />
            </Col>
            <Col
                breakpoints={{ dt: { span: 2 }, tb: { span: 2 } }}
            >
                <DateInput
                    prefix={dateInputPrefixOne}
                    onChange={setFromDate}
                    dateToDisplay={fromDate}
                />
            </Col>
            <Col
                breakpoints={{ dt: { span: 2 }, tb: { span: 2 } }}
            >
                <DateInput
                    prefix={dateInputPrefixTwo}
                    onChange={setToDate}
                    dateToDisplay={toDate}
                />
            </Col>
            <Col
                breakpoints={{ dt: { span: 2 }, tb: { span: 4 } }}
            >
                <StyledButton
                    to="#"
                    onClick={() => {

                    }}
                    css={{
                        minWidth: '176px',
                        flexShrink: 0,
                        fontWeight: 600,
                        "@media (max-width: 767px)":{
                            paddingTop: '8px',
                            paddingBottom: '8px',
                        }
                    }}
                    className="p2"
                    theme="primary"
                >
                    Suchen
                </StyledButton>
            </Col>
        </Row>
    </Container>
);

export default SearchBar;
