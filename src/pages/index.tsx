/** @jsxImportSource @compiled/react */
import React from "react";
import Logo from "../images/icon.png";
import { AnimatedImageClipped } from "../components/animations/animated-image-clipped";
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DrawerOverlay, DrawerContent, DrawerTrigger } from "../components/primitives/drawer";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
} from "../components/primitives/accordion";
import Tooltip from "../components/primitives/tooltip";
import Spinner from "../components/primitives/spinner";
import {
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalTrigger,
} from "../components/primitives/modal";
import { Drawer } from "../components/primitives/drawer";
import Input from "../components/primitives/input";
import FormProvider from "../components/primitives/form-provider";
import Button from "../components/primitives/button";
import NavigationMenuDemo from "../components/primitives/mega-menu";
import { CheckBox, CheckBoxGroup } from "../components/primitives/checkbox";
import { RadioContent, Radio } from "../components/primitives/radio";
import Select, {
	SelectGroup,
	SelectLabel,
	SelectOption,
	SelectSeparator,
} from "../components/primitives/select";


const Index = (): React.ReactElement => (
	<div css={{ width: "100%" }}>
		<div>Blank Page</div>
		<Spinner />
		<NavigationMenuDemo />
		<Modal>
			<ModalTrigger>Edit profile</ModalTrigger>
			<ModalContent
				css={{
					backgroundColor: "blue",
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
			{/* <CheckBoxGroup name="check" required>
				Agree
			</CheckBoxGroup> */}
			<Radio name="kfc">
				<RadioContent value="hello">
					hello
				</RadioContent>
				<RadioContent value="luvery">
					luvery 
				</RadioContent>
				<RadioContent value="peace">
					peace
				</RadioContent>
			</Radio>
			{/* <Select
				placeholder="Hello!"
				name="heheheh"
				// required
				css={{ height: "80px", background: "red", color: "white" }}
			>
				<SelectOption value="apple">Apple</SelectOption>
				<SelectOption value="banana">Banana</SelectOption>
			</Select> */}
			<Drawer>
				<DrawerTrigger>
					<div>Open Drawer</div>
				</DrawerTrigger>
				<DrawerContent placement='bottom'>
					<ModalCloseButton css={{width: "60px", height: "60px", display: "block", marginLeft: "auto"}} />
					<div>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
						Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
						when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
						It has survived not only five centuries, but also the leap into electronic typesetting, 
						remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
						sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
						Aldus PageMaker including versions of Lorem Ipsum.
					</div>
				</DrawerContent>
			</Drawer>
			{/*<RadioGroup defaultValue="default" aria-label="View density">
				<RadioContent value="hello">Hello</RadioContent>
				<RadioContent value="hello2">Hello2</RadioContent>
		</RadioGroup>*/}
			<TestButton />
		</FormProvider>
	</div>
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
		<Button loading={load} type="submit" css={{ cursor: "not-allowed" }}>
			Submit
		</Button>
	);
};

export default Index;
