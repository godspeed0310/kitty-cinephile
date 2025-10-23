import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDirectusAssetUrl, getInitials } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva("", {
  variants: {
    size: {
      default: "size-10",
      lg: "size-[3.125rem]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type Props = Readonly<{
  imageId: string | null;
  name: string;
}> &
  VariantProps<typeof avatarVariants>;

const UserAvatar = ({ imageId, name, size = "default" }: Props) => {
  return (
    <Avatar className={avatarVariants({ size })}>
      {imageId && <AvatarImage src={getDirectusAssetUrl(imageId)} alt={name} />}
      <AvatarFallback className="font-bold font-noto-serif-display">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
