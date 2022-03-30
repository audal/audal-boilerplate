/** @jsxImportSource @compiled/react */
import React from "react";
import Logo from "../images/icon.png";
import {AnimatedImageClipped} from "../components/animations/animated-image-clipped";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel
} from "../components/primitives/accordion";
import Tooltip from "../components/primitives/tooltip";
import Spinner from "../components/primitives/spinner";
import {Modal, ModalCloseButton, ModalContent, ModalTrigger} from "../components/primitives/modal";
import {NavigationMenuDemo} from "../components/primitives/mega-menu/index"

const Index = (): React.ReactElement => (
  <div css={{width: "100%"}}>
    <div>Blank Page</div>
	  <NavigationMenuDemo/>
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

export default Index;
