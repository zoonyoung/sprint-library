import { HTMLAttributes } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import styles from "./index.module.scss";

type InputProps = {
  name: string;
  label?: string;
  rule?: RegisterOptions;
} & HTMLAttributes<HTMLInputElement>;

const Input = ({ name, label, rule, ...rest }: InputProps) => {
  const { register } = useFormContext();
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}> {label}</label>}
      <input {...register(name, rule)} {...rest} />
    </div>
  );
};

export default Input;
