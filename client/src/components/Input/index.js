import styles from "./input.module.scss";

const Input = ({
  value,
  type,
  setValue,
  placeholder,
  className = "",
  ...props
}) => {
  if (type === "list") {
    return (
      <>
        <input
          list="userType"
          placeholder={placeholder}
          className={`${styles.input} ${className}`}
          onChange={setValue}
        />
        <datalist id="userType">
          <option value="Administrador"></option>
          <option value="Doctor"></option>
        </datalist>
      </>
    );
  } else {
    return (
      <input
        type={type}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        className={`${styles.input} ${className}`}
        {...props}
      />
    );
  }
};

export default Input;
