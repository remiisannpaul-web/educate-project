import Link from "next/link";
import { auth, signOut } from "../../auth";
import { redirect } from "next/navigation";


export default async function Navbar() {
const session = await auth()



async function Logout() {
   "use server"
   await signOut({ redirect: true, callbackUrl: "/login" })
   window.location.reload();
   redirect('/login');
  
}

  return (
    <nav className="flex flex-row fixed w-19/20 m-12 justify-between items-center rounded-2xl">
      <h1 className="text-white font-bold text-3xl tracking-wider">EDUCATE</h1>
      <div className="bg-blue-600 rounded-2xl shadow-lg">
        <ul className="flex flex-row gap-1 p-2">
          <Link
            className="px-3 py-3 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            type="button"
            href="/"
          >
            Home
          </Link>
          <Link
            className="px-3 py-3 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            type="button"
            href="/programs"
          >
            Programs
          </Link>
          {session?.user ? (
  <form action={Logout}>
  <button
    className="px-3 py-3 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
    type="submit"
    href="/logout"
  >
    Sign Out
  </button>
  </form>
 
) : (
  <Link
    className="px-3 py-3 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
    type="button"
    href="/login"
  >
    Students Login
  </Link>
)}
         
         {session?.user?.email === "admin@gmail.com" && (
            <Link
            className="px-3 py-3 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            type="button"
            href="/admin"
          >
            Admin
          </Link>
         )}
        </ul>
      </div>
    </nav>
  );
}
