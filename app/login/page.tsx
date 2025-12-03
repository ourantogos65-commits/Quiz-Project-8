// "use client"
// import {

//   SignedOut,
//   SignInButton,
//   SignUpButton,
//   useUser,
// } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";

// import { useEffect } from "react";

// const LoginPage = () => {
//     const {user,isLoaded}=useUser()
//     const router=useRoute()
//     console.log(user)
//     useEffect(()=>{
// if(!user && isLoaded){
//     router.push("/")
// }
//     },[user,isLoaded])
//   return (
//     <div>
//       <SignedOut>
//         <SignInButton />
//         <SignUpButton>
//           <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
//             Sign Up
//           </button>
//         </SignUpButton>
//       </SignedOut>
//       {/* <SignedIn>
//         <UserButton />
//       </SignedIn> */}
//     </div>
//   );
// };

// export default LoginPage;
"use client";
import { useEffect } from "react";
import { useUser, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const LoginPage=()=> {
  const { user, isLoaded } = useUser();
  const router = useRouter();


  useEffect(() => {
    if (isLoaded && user) {
      router.push("/");
    }
  }, [isLoaded, user]);

  // Loading state
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <SignedOut>
        <SignInButton>Sign In</SignInButton>
        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full px-4 py-2">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
}
export default LoginPage