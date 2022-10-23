import React from 'react';
// import Logo from "../images/icon.png";
// import { AnimatedImageClipped } from "../components/animations/animated-image-clipped";
// import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
    // DrawerOverlay,
    DrawerContent,
    DrawerTrigger,
    DrawerCloseButton,
    Drawer,
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
import Input from '../components/primitives/input';
import FormProvider from '../components/primitives/form-provider';

import Select, {

    SelectOption,

} from '../components/primitives/select';
import RowSet from '../components/primitives/grid/row-set';
import Row from '../components/primitives/grid/row';
import Col from '../components/primitives/grid/col';
import Container from '../components/primitives/grid/container';
import ScrollEffect from '../components/animations/components/scroll-effect';
import ScrollArea from '../components/animations/context/scroll-area';

const Index = (): React.ReactElement => (
    <RowSet breakpoints={{ dt: { between: 20 } }}>
        <Container>
            <Row style={{ position: 'absolute', height: '100%', left: 0 }}>
                <Col breakpoints={{ dt: { span: 6, rightGap: 'half' } }} css={{ backgroundColor: 'green' }} />
                <Col breakpoints={{ dt: { span: 6, leftGap: 'half' } }} css={{ backgroundColor: 'blue' }} />
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
        <ScrollArea>
            <Container>
                <Row>
                    <Col breakpoints={{ dt: { span: 4 } }}>
                        <div css={{ position: 'sticky', top: '200px' }}>
                            <ScrollEffect properties={{ y: [0, -100] }} inViewProperties={{ opacity: [0, 1] }}>
                                Hello
                            </ScrollEffect>
                        </div>
                    </Col>
                    <Col breakpoints={{ dt: { span: 8 } }}>
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
                                        industry. Lorem Ipsum has been the industrys standard dummy text
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
                        </FormProvider>
                    </Col>
                </Row>
            </Container>
        </ScrollArea>
    </RowSet>
);

export default Index;
