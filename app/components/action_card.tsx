import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentType } from "react";
import { IconBaseProps } from "react-icons";

interface ActionCardProps {
  Icon?: ComponentType<IconBaseProps>;
  text: string;
  redirect: string;
}
const ActionCard = ({ Icon, text, redirect }: ActionCardProps) => {
  return (
    <Link
      href={redirect}
      className="hover:cursor-pointer bg-blue-500 px-4 py-8 rounded-md  text-white flex flex-col items-center"
    >
      {Icon ? <Icon size={50} /> : null}
      <p>{text}</p>
    </Link>
  );
};

export default ActionCard;
