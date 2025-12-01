import { UserButton } from "@clerk/nextjs";
import { RxAvatar } from "react-icons/rx";

export default function Navbar() {
  return (
    <nav className="h-14 w-full  border-b flex items-center justify-between px-6 bg-white fixed top-0 left-0 z-50">
      <h1 className="text-lg font-semibold">Quiz App</h1>

      <div className="flex items-center gap-4">
        <UserButton />
      </div>
    </nav>
  );
}
