import { HTMLAttributes } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import styles from "./index.module.scss";

type DropDownOption = { value: string; label: string }[];

type DropDownProps = {
  name: string;
  label?: string;
  optionList: DropDownOption;
  rule?: RegisterOptions;
} & HTMLAttributes<HTMLSelectElement>;

const DropDown = ({ name, label, optionList, rule, ...rest }: DropDownProps) => {
  const { register } = useFormContext();
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <select {...register(name, rule)} {...rest}>
        {optionList.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
