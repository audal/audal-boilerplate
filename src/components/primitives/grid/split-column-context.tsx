import React from 'react';

type ISplitColumn = false|number;

const SplitColumnContext = React.createContext<ISplitColumn>(false);

const SplitColumnProvider = ({ children, cols }: { children: React.ReactNode, cols: number }) => (
    <SplitColumnContext.Provider value={cols}>
        {children}
    </SplitColumnContext.Provider>
);

export default SplitColumnProvider;

export const useSplitColumn = (): ISplitColumn => React.useContext<ISplitColumn>(SplitColumnContext);
