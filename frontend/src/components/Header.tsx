import { useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Avatar from "react-avatar";

interface HeaderProps {
    title: string;
    onMenuClick: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
                >
                    <FiMenu size={22} />
                </button>

                <div>
                    <h1 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h1>

                    <p className="text-xs text-gray-400">
                        Manage your attendance efficiently
                    </p>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger render={ <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-gray-50">
                        <Avatar
                            name={user.email || "User"}
                            size="36"
                            round
                            textSizeRatio={3}
                            fgColor="white"
                        />

                        <div className="hidden text-left sm:block">
                            <p className="text-sm font-medium text-gray-900">
                                {user.role || "Guest"}
                            </p>

                            <p className="max-w-40 truncate text-xs text-gray-500">
                                {user.email || "-"}
                            </p>
                        </div>
                    </button>}>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="cursor-pointer py-2 text-red-600 focus:text-red-600"
                        >
                            <FiLogOut size={16} />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}