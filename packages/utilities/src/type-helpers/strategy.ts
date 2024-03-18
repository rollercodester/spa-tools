/**
 * Constructs a special Record type that enables intellisense on the respective record's keys in the IDE, similar to behavior of a class or static interface.
 */
export function asStrategy<P>() {
  return <T extends Record<string, P>>(arg: T): T => {
    return arg;
  };
}
