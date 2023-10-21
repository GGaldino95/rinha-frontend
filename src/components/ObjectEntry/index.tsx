import { ArrayEntry, PrimitiveEntry } from '..';
import { isObject } from '../../utils';

interface IObjectEntryProps {
  entry: { key: string; value: any };
  isArrayChildren?: boolean;
  type?: 'object';
}

export const ObjectEntry = ({ entry, isArrayChildren = false, ...props }: IObjectEntryProps) => {
  return (
    <>
      <section className="obj-entry" {...props}>
        <span className={isArrayChildren ? 'obj-index' : 'obj-key'}>{`${entry.key}: `}</span>
        <span className="obj-bracket">{'{'}</span>
      </section>

      <section className="sub-obj">
        {Object.entries(entry.value).map(([key, value], index) => {
          if (Array.isArray(value)) {
            return <ArrayEntry key={`array-entry-${index + 1}`} entry={{ key, value }} type="array" />
          } else if (isObject(value)) {
            return <ObjectEntry key={`object-entry-${index + 1}`} entry={{ key, value }} type="object" />
          } else {
            return <PrimitiveEntry key={`primitive-entry-${index + 1}`} entry={{ key, value }} type="primitive" />
          }
        })}
      </section>

      <span className="obj-bracket">{'}'}</span>
    </>
  );
};