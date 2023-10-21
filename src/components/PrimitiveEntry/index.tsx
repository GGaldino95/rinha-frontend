interface IPrimitiveEntryProps {
  entry: { key: string; value: any };
  isArrayChildren?: boolean;
  type?: 'primitive';
}

export const PrimitiveEntry = ({ entry, isArrayChildren = false, ...props }: IPrimitiveEntryProps) => (
  <section className="obj-entry" {...props}>
    <span className={isArrayChildren ? 'obj-index' : 'obj-key'}>{`${entry.key}: `}</span>
    <span className="obj-value">{typeof entry.value === 'string' ? `"${entry.value}"` : entry.value}</span>
  </section>
);