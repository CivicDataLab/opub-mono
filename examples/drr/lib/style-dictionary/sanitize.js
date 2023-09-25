// Style Dictionary sanitization function.
// It removes the $value and $description keys from the JSON output
// and replaces them with value and comment respectively.

module.exports = (config) => {
  try {
    const configCopy = JSON.parse(JSON.stringify(config));
    return JSON.parse(
      JSON.stringify(Object.values(configCopy)[0])
        .replaceAll('"$type"', '"category"')
        .replaceAll('"$value"', '"value"')
        .replaceAll('"$description"', '"comment"')
    );
  } catch (e) {
    return config;
  }
};
