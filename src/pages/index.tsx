/** @jsxImportSource @compiled/react */
import React from "react";
import Logo from "../images/icon.png";
import { AnimatedImageClipped } from "../components/animations/animated-image-clipped";
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
import Input from "../components/primitives/input";
import FormProvider from "../components/primitives/form-provider";
import Button from "../components/primitives/button";
import NavigationMenuDemo from "../components/primitives/mega-menu";
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
		<Select placeholder="Hello!" name="boo">
			<SelectOption value="apple">Apple</SelectOption>
			<SelectOption value="banana">Banana</SelectOption>
		</Select>
		<Input name="hi" />
		<FormProvider
			onSubmit={(e) => {
				console.log(e);
			}}
		>
			<Input name="email" type="email" required />
			<Input name="phone" type="tel" />
			<Input name="number" type="number" />
			<Input name="hi" minLength={20} className="hello" />
			<Input placeholder="hi" name="password" type="password" />
			<Select placeholder="Hello!" name="heheheh">
				<SelectOption value="apple">Apple</SelectOption>
				<SelectOption value="banana">Banana</SelectOption>
			</Select>
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
