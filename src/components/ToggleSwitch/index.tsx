import styles from "./index.module.scss";

interface Props {
  isChecked: boolean;
  onClick: () => void;
}

const ToggleSwitch = ({ isChecked, onClick }: Props) => {
  const handleSwitchClick = () => {
    onClick();
  };

  return (
    <div className={styles.switch} onClick={handleSwitchClick}>
      <input checked={isChecked} type="checkbox" />
      <span className={`${styles.slider} ${styles.round}`} />
    </div>
  );
};

export default ToggleSwitch;
