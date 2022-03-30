import React from 'react'
import {TooltipProvider} from "@radix-ui/react-tooltip";

/*
* Group any needed providers together
* */
const Provider: React.FC = ({children}) => {

	return (
		<TooltipProvider>
			{children}
		</TooltipProvider>
	)
}

export default Provider
