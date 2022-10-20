const throwOnMissing = (e: any, fieldName: string, componentName: string) => {
	if (e === undefined || e === null) {
		throw new Error(
			`Audal Components: ${fieldName} is not defined in ${componentName}. This is required.`
		);
	}
};

export default throwOnMissing;
