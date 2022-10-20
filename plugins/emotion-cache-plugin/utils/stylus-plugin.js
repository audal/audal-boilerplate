module.exports = ( ...extra) => {
    const scopes = extra.map((scope) => `${scope.trim()} `)

    return (element) => {
        if (element.type !== 'rule') {
            return
        }

        if (element.root?.type === '@keyframes') {
            return
        }

        if (element.value === ":root") {
            return;
        }

        element.props = element.props
            .map((prop) => {
                if (!prop.includes(scopes[0])) {
                    return scopes.map((scope) => scope + prop);
                }
                return [prop]
            })
            .reduce((scopesArray, scope) => scopesArray.concat(scope), [])
    }
}
