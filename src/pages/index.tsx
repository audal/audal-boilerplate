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
import { RadioGroup, CheckBox } from "../components/primitives/checkbox";
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

const Index = (): React.ReactElement => (
	<div css={{ width: "100%" }}>
		<div>Blank Page</div>
		<Spinner />
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
		<Input name="hi" />
		<FormProvider
			onSubmit={(e) => {
				console.log(e);
			}}
		>
			<Input name="email" type="email" required />
			<Input name="phone" type="tel" />
			<Input name="number" type="number" />
			<Input name="hi" minLength={20} />
			<Input name="password" type="password" />
			<RadioGroup defaultValue="default" aria-label="View density">
				<CheckBox id="r1" value="hello">
					Hello
				</CheckBox>
				<CheckBox id="r2" value="hello2">
					Hello2
				</CheckBox>
			</RadioGroup>
			<button type="submit">Submit</button>
		</FormProvider>
	</div>
);

export default Index;
