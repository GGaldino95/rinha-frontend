import { ObjectEntry, PrimitiveEntry } from '..';
import { isObject } from '../../utils';

interface IArrayEntryProps {
  entry: { key: string; value: any };
  type?: 'array';
}

export const ArrayEntry = ({ entry, ...props }: IArrayEntryProps) => {
  return (
    <>
      <section className="obj-entry" {...props}>
        <span className="obj-key">{`${entry.key}: `}</span>
        <span className="obj-bracket">{'['}</span>
      </section>

      <section className="sub-obj">
        {Object.entries(entry.value).map(([key, value], index) => {
          if (Array.isArray(value)) {
            return <ArrayEntry key={`array-entry-${index + 1}`} entry={{ key: String(index), value }} type="array" />
          } else if (isObject(value)) {
            return <ObjectEntry key={`object-entry-${index + 1}`} entry={{ key, value }} isArrayChildren type="object" />
          } else {
            return <PrimitiveEntry key={`primitive-entry-${index + 1}`} entry={{ key, value }} isArrayChildren type="primitive" />
          }
        })}
      </section>

      <span className="obj-bracket">{']'}</span>
    </>
  );
};