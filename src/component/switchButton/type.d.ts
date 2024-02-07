export default interface SwitchButtonProps {
  containerClassName?: string;
  itemsClass?: string;
  list: { title: string; onClick: () => void }[]; // Use an array here
  active: number;
}
