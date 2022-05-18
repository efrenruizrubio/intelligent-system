import styles from "./Table.module.scss";
import { useEffect, useState } from "react";
/* import { Button } from "components";
import { useState, useEffect } from "react"; */

export const Table = ({ data, headDisease }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (Object.values(data.diseases).length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data]);
  /* console.log(Object.values(data.diseases).length > 0 ? "true" : "false"); */

  return (
    <>
      {isLoading ? null : (
        <table className={styles.container}>
          <thead className={styles.container__tableHead}>
            <tr>
              {headDisease.map && ((item) => <TableHeadItem item={item} />)}
            </tr>
          </thead>
          {/* <tbody className={styles.container__tableBody}>
            {data.diseases.map((value) => (
              <TableRow value={value} head={head} />
            ))}
          </tbody> */}
        </table>
      )}
    </>
  );
};

const TableHeadItem = ({ head }) => {
  return <th>{head.head}</th>;
};

const TableRow = ({ value, head }) => {
  <tr>
    {
      /* {head.map((columnItem, index) => {
      return <p>{value[`${columnItem.value}`]}</p>;
    })} */
      console.log(value[head.value])
    }
  </tr>;
};
