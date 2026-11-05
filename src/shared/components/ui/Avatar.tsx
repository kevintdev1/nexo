import defaultAvatar from "@assets/default-user.png";

type AvatarProps = {
	src: string | null;
	alt: string;
};

export function Avatar({ src, alt }: AvatarProps) {
	return (
		<img
			src={src ?? defaultAvatar}
			alt={alt}
			loading="lazy"
			className="size-10 shrink-0 rounded-full object-cover"
		/>
	);
}
