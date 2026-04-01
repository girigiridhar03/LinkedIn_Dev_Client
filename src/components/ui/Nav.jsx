import {
  Bell,
  ChevronDown,
  CodeXml,
  Home,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Input } from "./input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { useDispatch } from "react-redux";
import { authLogout } from "@/store/auth/auth.service";
import { logout } from "@/store/user/user.reducer";

const Nav = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white px-4 py-2 shadow-xl border-b fixed top-0 left-0 right-0">
      <div className="max-w-280 mx-auto flex items-center justify-between gap-6 xl:gap-15">
        {/* Logo And Input */}
        <div className="flex items-center gap-5 w-[90%]">
          <div className="flex items-center gap-2.5">
            <span className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-lg">
              <CodeXml />
            </span>
            <span className="text-xl font-semibold text-primary">
              DevConnect
            </span>
          </div>
          <div className="flex items-center gap-0.5 bg-[#e7eaed] w-full px-2 rounded-xl ">
            <Search className="h-4 opacity-50" />
            <Input
              className="h-9 px-0 border-0 bg-transparent focus-visible:ring-0 focus:ring-0 focus:outline-none shadow-none"
              placeholder="Search developer, skills..."
            />
          </div>
        </div>

        {/* Logos and Navigations */}
        <div className="w-full h-full flex items-center justify-between xl:justify-start xl:gap-9">
          <NavItem
            icon={<Home size={16} />}
            label="Feeds"
            url={""}
            active={pathname === "/feed"}
          />
          <NavItem
            icon={<Users size={16} />}
            label="Network"
            active={pathname === "/connections"}
          />
          <NavItem
            icon={<MessageSquare size={16} />}
            label="Messages"
            active={pathname === "/chat"}
          />
          <NavItem
            icon={<Search size={16} />}
            label="Search"
            active={pathname === "/search"}
          />
          <NavItem icon={<Bell size={16} />} label="Notification" />
          <DropdownMenu>
            <DropdownMenuTrigger
              className="gap-1.5 hover:bg-transparent"
              render={
                <Button variant="ghost" size="icon" className="rounded-full" />
              }
            >
              <Avatar size="md">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ChevronDown />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={"border-2 border-muted w-62.5 rounded-2xl"}
              align="end"
            >
              <div className="p-3">
                <div className="font-semibold">Giridhar</div>
                <p className="text-[0.8rem] opacity-60">
                  Full-Stack Developer | React & N...
                </p>
              </div>
              <DropdownMenuSeparator />
              <div className="px-3 py-1">
                <DropdownMenuItem className="gap-2 text-[0.9rem]">
                  <User />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-[0.9rem]">
                  <Settings />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />
              <div className="p-3">
                <DropdownMenuItem
                  className="gap-2 text-[0.9rem] text-red-500"
                  onClick={async () => {
                    try {
                      await dispatch(authLogout()).unwrap();
                      dispatch(logout());
                      navigate("/login", { replace: true });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Nav;

const NavItem = ({ icon, label, url, active }) => {
  return (
    <Link to={url}>
      <div
        className={`flex flex-col items-center text-xs cursor-pointer h-full py-1 px-2 w-16 justify-center gap-0.5 hover:text-black hover:bg-[#e7eaed] ${
          active ? "text-primary" : "text-muted-foreground"
        } ${active ? "bg-primary/15" : ""} rounded-lg`}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
};
