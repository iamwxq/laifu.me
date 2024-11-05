/* eslint-disable react/no-array-index-key */
import type { ListItem } from "~/types";

interface Props {
  items: Array<ListItem>;
  order?: boolean;
  check?: boolean;
}

function List({ items, order = false, check = true }: Props) {
  return (
    <>
      {order && (
        <ol>
          {items?.map((item, i) => (
            <li key={i}>
              <span>{i}</span>
              {check && <span></span>}
              <span>{item.content}</span>
            </li>
          ))}
        </ol>
      )}

      {!order && (
        <ul>
          {items?.map((item, i) => (
            <li key={i}>
              {check && <span></span>}
              <span>{item.content}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default List;
