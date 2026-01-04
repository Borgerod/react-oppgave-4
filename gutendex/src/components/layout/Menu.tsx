"use client";
import { cn } from "@/utils/cn";
import Divider from "@geist-ui/react/esm/divider";
import { Home } from "lucide-react";
// import YearRangeMenu from "./yearRangeMenu";
// import CopyrightToggle from "./copyrightToggle";
// import MenuInput from "./menuInput";
// import { Fragment } from "react";
// import Form from "next/form";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { BiArchive, BiHomeAlt2, BiLibrary } from "react-icons/bi";
import {
	BsHouse,
	BsBookshelf,
	BsChat,
	BsInfoCircle,
	BsQuestionCircle,
	BsFillQuestionCircleFill,
	BsFillMenuButtonFill,
	BsFillTelephoneFill,
	BsTelephone,
	BsClipboardData,
	BsArchive,
	BsShopWindow,
	BsBook,
	BsPerson,
	BsClipboard,
} from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaCookieBite, FaDatabase, FaHome, FaInfoCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { HiDatabase, HiHome, HiLibrary, HiPhone } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi2";
import { IoMdHelpCircle } from "react-icons/io";
import {
	IoHelpCircle,
	IoHome,
	IoHomeSharp,
	IoLibrary,
	IoLibraryOutline,
} from "react-icons/io5";
import { LuLibraryBig } from "react-icons/lu";
import { MdHome, MdOutlineCookie } from "react-icons/md";
import { PiBooks, PiBooksLight, PiBooksThin, PiCookie } from "react-icons/pi";
import { RiBookShelfLine } from "react-icons/ri";
import { TbBooks, TbClipboardList } from "react-icons/tb";

type MenuProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	// setOpen,
};

{
	/* <div
                    aria-label="menu"
                    id="menu"
                    className={cn(
                        "absolute",
                        "h-200 w-100 bg-container-solid rounded-3xl shadow border border-edge",
                        "text-xl text-center content-center",
                        "shadow-xl",
                        "z-50 top-25 right-0"
                    )}>
                    Stop snooping!
                </div> */
}
export default function Menu({ open, setOpen }: MenuProps) {
	return (
		<div
			className={cn(
				"absolute",
				"top-30",
				"right-0",
				"bg-container-solid",
				"rounded-3xl",
				"p-5",
				"shadow-2xl",
				"z-30",
				"gap-5",
				// "gap-5 hover:text-secondary",
				"grid",
				"w-full",

				"max-w-xs",
				"min-w-fit",
				"h-fit",
				// "h-full",
				"overflow-y-auto",
				"",
				"",

				// TEST

				// "w-50 h-100", // temp

				"",
				""
			)}>
			<div id="nav-menu" className="">
				{/* <Home /> */}
				{/* <div className="h-fit w-full grid grid-cols-3 flex-col gap-5 hover:text-secondary grid grid-cols-[1fr_auto] gap-5 hover:text-secondaryitems-center w-fit gap-x-5 "> */}
				<h3 className="text-2xl font-medium">Gutendex</h3>
				{/* <hr className="border-t w-full border-divider" aria-hidden="true" /> */}
				<Divider
					className={cn(
						"border-t",
						"border-divider",

						"",
						""
					)}
				/>
				<div className="h-fit  flex flex-col w-full  items-start  gap-5 pl-5 ">
					<Link
						href={"/home"}
						className="grid grid-cols-[1fr_auto] gap-5 hover:text-secondary">
						<BsHouse className="size-10" />
						<span className="text-2xl leading-10">Home</span>
					</Link>
					<Link
						href={"/store"}
						className="grid grid-cols-[1fr_auto] gap-5 hover:text-secondary ">
						<BsBook className="size-10" />
						{/* <PiBooksLight className="size-12 relative right-1" /> */}
						{/* <IoLibraryOutline className="size-10 " /> */}
						<span className="text-2xl leading-10">Library</span>
					</Link>
					<Link
						href={"/contact"}
						className="grid grid-cols-[1fr_auto] gap-5 hover:text-secondary">
						<BsTelephone className="size-10" />
						<span className="text-2xl leading-10">Contact</span>
					</Link>
					<Link
						href={"/questions"}
						className="grid grid-cols-[1fr_auto] gap-5 hover:text-secondary">
						<BsChat className="size-10" />
						{/* <BsQuestionCircle className="size-10" /> */}
						<span className="text-2xl leading-10">Questions</span>
					</Link>
				</div>
			</div>
			<div id="user-menu" className="">
				<h3 className="text-2xl font-medium">User</h3>
				<Divider
					className={cn(
						"border-t",
						"border-divider",

						"",
						""
					)}
				/>
				<div className="h-fit  flex flex-col w-full  items-start  gap-5 pl-5">
					{/* <div className="h-fit w-full grid grid-cols-3 flex-col gap-5 hover:text-secondary grid grid-cols-[1fr_auto] gap-5 hover:text-secondaryitems-center w-fit gap-x-5 "> */}
					<Link
						href={"/profile"}
						className="grid grid-cols-[1fr_auto] gap-5 hover:text-secondary">
						<HiOutlineUser className="size-10" />
						<span className="text-2xl leading-10">Profile</span>
					</Link>
					{/* <BsClipboard className="size-10" /> */}
					<Link
						href={"/cookies"}
						className="grid grid-cols-[1fr_auto] gap-5 hover:text-secondary">
						<PiCookie className="size-10" />
						<span className="text-2xl leading-10">Cookies</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
