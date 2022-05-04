import styles from "./Table.module.scss";
import { Button } from "components";
import { useState, useEffect } from "react";

export const Table = ({ data, columns }) => {
  return (
    <table className={styles.container}>
      <thead className={styles.container__tableHead}>
        <tr>
          {columns.map((column, i) => (
            <th key={i}>{column.head}</th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.container__tableBody}>
        <tr>
          {columns.map((value, i) => {
            return <td key={i}>{value.head}</td>;
          })}
        </tr>
      </tbody>
    </table>
  );
};
