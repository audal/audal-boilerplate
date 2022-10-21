import React from 'react';
// import Logo from "../images/icon.png";
// import { AnimatedImageClipped } from "../components/animations/animated-image-clipped";
// import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
    // DrawerOverlay,
    DrawerContent,
    DrawerTrigger,
    DrawerCloseButton,
} from '../components/primitives/drawer';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
} from '../components/primitives/accordion';
import Tooltip from '../components/primitives/tooltip';
import Spinner from '../components/primitives/spinner';
import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalTrigger,
} from '../components/primitives/modal';
import { Drawer } from '../components/primitives/drawer';
import Input from '../components/primitives/input';
import FormProvider from '../components/primitives/form-provider';
import Button from '../components/primitives/button';
import { Radio, RadioGroup } from '../components/primitives/radio';
import { CheckBox } from '../components/primitives/checkbox';
// import Select, {
// 	SelectGroup,
// 	SelectLabel,
// 	SelectOption,
// 	SelectSeparator,
// } from "../components/primitives/select";
import Select, {

    SelectOption,

} from '../components/primitives/select';
import RowSet from '../components/primitives/grid/row-set';
import Row from '../components/primitives/grid/row';
import Col from '../components/primitives/grid/col';
import Container from '../components/primitives/grid/container';

const Index = (): React.ReactElement => (
    <RowSet breakpoints={{ dt: { between: 20 } }} css={{ width: '100%' }}>
        <Container style={{ maxWidth: '70%' }}>
            <Row style={{ position: 'absolute', height: '100%', left: 0 }}>
                <Col breakpoints={{ dt: { start: 0, span: 6, rightGap: 'half' } }} css={{ backgroundColor: 'green' }} />
                <Col breakpoints={{ dt: { start: 6, span: 6, leftGap: 'half' } }} css={{ backgroundColor: 'blue' }} />
            </Row>
            <Row style={{ background: '#fff4', padding: '40px' }}>
                <Col breakpoints={{ dt: { span: 4 } }}>
                    1
                </Col>
                <Col breakpoints={{ dt: { span: 4 } }}>
                    2
                </Col>
                <Col breakpoints={{ dt: { span: 4 } }}>
                    3
                </Col>
            </Row>
        </Container>
        <Container style={{ maxWidth: '70%' }}>
            <Row>
                <Col breakpoints={{ dt: { start: 0, span: 4 } }}>
                    <div css={{ position: 'sticky', top: '200px' }}>
                        Hello
                    </div>
                </Col>
                <Col breakpoints={{ dt: { start: 4, span: 8 } }}>
                    <div style={{ minHeight: '80vh' }}>Blank Page</div>
                    <Spinner />
                    <p className="text-2xl font-medium">Tailwind works</p>
                    <Modal>
                        <ModalTrigger>Edit profile</ModalTrigger>
                        <ModalContent
                            css={{
                                backgroundColor: 'blue',
                            }}
                        >
                            hello
                            <ModalCloseButton />
                        </ModalContent>
                    </Modal>
                    <Accordion>
                        <AccordionItem>
                            <AccordionButton>
                                hi
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                                <Tooltip title="he">hellow</Tooltip>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    {/* <Input name="hi" /> */}
                    <FormProvider
                        onSubmit={(e) => {
                            console.log(e);
                        }}
                    >
                        {/* <Input name="email" type="email" placeholder="email" required /> */}
                        <Input name="phone" type="tel" placeholder="tel" />
                        <Input name="number" type="number" placeholder="number" />
                        <Input name="hi" minLength={20} className="hello" placeholder="hi" />
                        <Input placeholder="hi" name="password" type="password" />
                        <CheckBox name="check" checked={false} required>Agree</CheckBox>
                        {/* <RadioGroup name="kfc">
				<Radio value="hello">hello</Radio>
				<Radio value="luvery">luvery</Radio>
				<Radio value="peace">peace</Radio>
			</RadioGroup> */}
                        <Select
                            placeholder="Hello!"
                            name="heheheh"
                        >
                            <SelectOption value="apple">Apple</SelectOption>
                            <SelectOption value="banana">Banana</SelectOption>
                        </Select>
                        <Drawer>
                            <DrawerTrigger>
                                <div>Open Drawer</div>
                            </DrawerTrigger>
                            <DrawerContent placement="left" size="xl">
                                <DrawerCloseButton />
                                <div>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                    ever since the 1500s, when an unknown printer took a galley of type
                                    and scrambled it to make a type specimen book. It has survived not
                                    only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s
                                    with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software like Aldus
                                    PageMaker including versions of Lorem Ipsum.
                                </div>
                            </DrawerContent>
                        </Drawer>
                        {/* <RadioGroup defaultValue="default" aria-label="View density">
				<RadioContent value="hello">Hello</RadioContent>
				<RadioContent value="hello2">Hello2</RadioContent>
		</RadioGroup> */}

                        <TestButton />
                    </FormProvider>
                </Col>
            </Row>
        </Container>
    </RowSet>
);

const TestButton = () => {
    const [load, setLoad] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        }, 2000);
        setTimeout(() => {
            setLoad(false);
        }, 6000);
    }, []);
    return (
        <Button loading={load} type="submit">
            Submit
        </Button>
    );
};

// const TestCheckBox = () => {
// 	const [checked, setChecked] = React.useState(false);

// 	return (
// 		<CheckBoxGroup
// 			name="check"
// 			checked={checked}
// 			onChange={() => {
// 				setChecked(!checked);
// 			}}
// 			required
// 		>
// 			Agree
// 		</CheckBoxGroup>
// 	);
// };

export default Index;
