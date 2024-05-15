export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
};
export const flattenAny = (input: any) => {
  if (Array.isArray(input)) {
    return input.reduce(function (a: any[], b: any) {
      return a.concat(Array.isArray(b) ? flattenAny(b) : b);
    }, []);
  } else if (typeof input === 'object') {
    return Object.values(input).reduce(function (a: any[], b: any) {
      return a.concat(Array.isArray(b) ? flattenAny(b) : b);
    }, []);
  } else {
    return [input];
  }
};
