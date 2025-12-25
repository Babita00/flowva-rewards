import { tabBadgeClass, tabTriggerClass } from "../../shared/ReuseableCss";
import { TabsTrigger } from "../../ui/tabs";

const RewardTabTrigger=({
  value,
  label,
  count,
}: {
  value: string;
  label: string;
  count: number;
}) =>{
  return (
    <TabsTrigger value={value} className={tabTriggerClass}>
      {label}
      <span className={tabBadgeClass}>{count}</span>
    </TabsTrigger>
  );
}

export default RewardTabTrigger;    