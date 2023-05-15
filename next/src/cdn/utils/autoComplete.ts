const stringStrictFormat = (word: string): string => {
  return word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/-/g, '_')
    .replace(/'/g, '_');
};

const stringStrictComparison = (stringA: string, stringB: string): boolean => {
  return stringStrictFormat(stringA) === stringStrictFormat(stringB);
};

const stringIncludesComparison = (
  search: string,
  suggestion: string
): boolean => {
  return stringStrictFormat(suggestion).includes(stringStrictFormat(search));
};

const getValueByKey = (obj: any, keyString: string) => {
  const keys = keyString.split('.');
  let value = obj;

  for (let i = 0; i < keys.length; i++) {
    value = value[keys[i]];
    if (value === undefined) {
      return undefined;
    }
  }

  return value;
};

const autoCompleteMethod = <T>(
  search: string,
  field: string,
  suggestions: T[],
  pickedSuggestions: T[],
  setSuggestions: Function
): void => {
  setSuggestions(
    suggestions.filter((suggestion) => {
      const suggestionRefValue = getValueByKey(suggestion, field);

      const searchMatchSuggestions = stringIncludesComparison(
        search,
        suggestionRefValue
      );

      const suggestionAlreadyPicked = pickedSuggestions.some(
        (pickedSuggestion: T) => {
          const pickedSuggestionRefValue = getValueByKey(
            pickedSuggestion,
            field
          );

          return stringStrictComparison(
            suggestionRefValue,
            pickedSuggestionRefValue
          );
        }
      );

      return searchMatchSuggestions && !suggestionAlreadyPicked;
    })
  );
};

export { stringStrictComparison, stringIncludesComparison, autoCompleteMethod };
