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
import { RadioGroup, RadioContent } from "../components/primitives/radio";
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

const Index = (): React.ReactElement => (
  <div css={{width: "100%"}}>
	  <NavigationMenuDemo/>
    <div>Blank Page</div>
	  
	  <Spinner/>
	  <Modal>
		  <ModalTrigger>
			  Edit profile
		  </ModalTrigger>
		  <ModalContent css={{
		  	backgroundColor: "blue"
		  }}>
			  hello
			  <ModalCloseButton/>
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
  </div>
);

const TestButton = () => {
	const [load, setLoad] = React.useState(false)

	React.useEffect(() => {
		setTimeout(() => {
			setLoad(true)
		}, 2000)
		setTimeout(() => {
			setLoad(false)
		}, 6000)
	}, [])
	return <Button loading={load} type="submit" css={{cursor: "not-allowed"}}>Submit</Button>

}

export default Index;
