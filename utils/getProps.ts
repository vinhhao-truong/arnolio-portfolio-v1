const getClasses = (className: string | null | undefined): string => {
  return className ? className : "";
};

const getStyles = (
  style: React.CSSProperties | null | undefined
): React.CSSProperties => {
  return style ? style : {};
};

export { getClasses, getStyles };
