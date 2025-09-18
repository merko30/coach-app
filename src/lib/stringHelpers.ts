export const capitalize = (
  str: string,
  capitalizeOnlyFirstWordForMultipleWords = true
) => {
  if (str.split("_").length > 1) {
    const words = str.split("_");
    if (capitalizeOnlyFirstWordForMultipleWords) {
      return words.at(0)?.toUpperCase() + words.slice(1).join(" ");
    }
    // Capitalize the first letter of each word in the string [e.g., "hello world" -> "Hello World"]
    return str
      .split(" ")
      .map((word) => word.at(0)?.toUpperCase() + word.slice(1))
      .join(" ");
  }
  return str.at(0)?.toUpperCase() + str.slice(1);
};

export const getFormattedOptions = (arrayOfStrings: string[]) =>
  arrayOfStrings.map((str) => ({
    value: str,
    label: capitalize(str),
  }));
