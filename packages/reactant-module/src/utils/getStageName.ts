export const getStageName = (className: string) =>
  `@@reactant/${className}/${Math.random().toString(36)}`;
