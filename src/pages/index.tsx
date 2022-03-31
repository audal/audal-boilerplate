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
import { DrawerComponent } from "../components/primitives/drawer";

const Index = (): React.ReactElement => (
  <div css={{width: "100%"}}>
	<DrawerComponent>
		<div>
			Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
			Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
			when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
			It has survived not only five centuries, but also the leap into electronic typesetting, 
			remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
			sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
			Aldus PageMaker including versions of Lorem Ipsum.
		</div>
	</DrawerComponent>
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

export default Index;
