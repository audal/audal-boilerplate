import React from 'react'
import {TooltipProvider} from "@radix-ui/react-tooltip";

const Provider: React.FC = ({children}) => {

	return (
		<TooltipProvider>
			{children}
		</TooltipProvider>
	)
}

export default Provider
