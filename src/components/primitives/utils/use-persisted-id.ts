import React from 'react';
import { nanoid } from 'nanoid';

/**
 * Generates a unique ID
 * */
const usePersistedId = (): string => {
    /**
	 * TODO: Change this to React.useId() once React 18 is implemented.
	 * As current this will have rehydration errors, but they should be fairly safe to ignore
	 * */

    const [id] = React.useState(`audal_${nanoid(7)}`);
    return id;
};

export default usePersistedId;
