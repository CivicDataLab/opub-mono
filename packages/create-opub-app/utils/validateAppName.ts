import validateProjectName from 'validate-npm-package-name';

//Validate a string against allowed package.json names
export const validateAppName = (rawInput: string) => {
  const nameValidation = validateProjectName(rawInput);

  if (nameValidation.validForNewPackages) {
    return;
  } else {
    const error =
      (nameValidation.errors && nameValidation.errors[0]) ||
      (nameValidation.warnings && nameValidation.warnings[0]);
    return error
      ? `Invalid name. ${error}`
      : `App name must consist of only lowercase alphanumeric characters, '-', and '_'`;
  }
};
