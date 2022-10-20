import React from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';

/*
 * Group any needed providers together
 * */
const Provider: React.FC = ({ children }) => <TooltipProvider>{children}</TooltipProvider>;

export default Provider;
