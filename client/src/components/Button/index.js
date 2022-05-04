import styles from "./Button.module.scss";

export const Button = ({ type, value, disabled, className, ...props }) => {
  return (
    <button
      type={type ? type : "submit"}
      disabled={disabled}
      className={`${styles.button} ${className} `}
      {...props}
    >
      {value}
    </button>
  );
};
