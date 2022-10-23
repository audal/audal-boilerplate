module.exports = (...extra) => {
    const scopes = extra.map(scope => `${scope.trim()} `);

    return (element) => {
        if (element.type !== 'rule') {
            return;
        }

        if (element.root?.type === '@keyframes') {
            return;
        }

        if (element.value === ':root') {
            return;
        }

        // eslint-disable-next-line no-param-reassign
        element.props = element.props
            .map((prop) => {
                if (!prop.includes(scopes[0])) {
                    return scopes.map(scope => scope + prop);
                }
                return [prop];
            })
            .reduce((scopesArray, scope) => scopesArray.concat(scope), []);
    };
};
