export const capitalize = (str: string) =>
  str.at(0)?.toUpperCase() + str.slice(1);

export const getFormattedOptions = (arrayOfStrings: string[]) =>
  arrayOfStrings.map((str) => ({
    value: str,
    label: capitalize(str),
  }));
