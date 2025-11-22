'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

export default function Navbar() {
    const [hasBackground, setHasBackground] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isAuthenticated = true;

    const linkStyles = "rounded-none px-3 py-1 text-md font-normal hover:text-gray-700";
    const activeLinkStyles = "text-slate-900 border-b-2 border-gray-800";

    const logoutUser = () => {
        toast.success("Logout successful!", { autoClose: 2000 });
    };

    useEffect(() => {
        const handleScroll = () => {
            setHasBackground(window.scrollY > 450);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getLinkClasses = (href) =>
        `${linkStyles} ${pathname === href ? activeLinkStyles : "text-black/60"} ${hasBackground ? "text-black/80" : "text-gray-800"
        }`;

    return (
        <nav>
            <div
                className={`fixed top-0 left-0 z-40 w-full px-2 sm:px-6 lg:px-8 ${hasBackground ? "bg-gray-100 text-black" : ""
                    }`}
            >
                <div className="mx-auto flex items-center justify-between shadow-2xl">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <h2 className="px-10 tracking-wider font-semibold text-lg">
                            <Link href="/" className="font-serif text-gray-800">
                                Shopio
                            </Link>
                        </h2>

                        <div className="hidden md:flex space-x-4 items-center">
                            <Link href="/" className={getLinkClasses("/")}>Home</Link>
                            <Link href="/products" className={getLinkClasses("/products")}>Shop</Link>
                            <Link href="/about" className={getLinkClasses("/about")}>About</Link>
                            <Link href="/blog" className={getLinkClasses("/blog")}>Blog</Link>
                            <Link href="/contact" className={getLinkClasses("/contact")}>Contact</Link>
                        </div>
                    </div>

                    {isAuthenticated ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex rounded-full focus:outline-none"
                            >
                                <Link href="/me">
                                    <img
                                        src="/profile.png"
                                        className="h-8 w-8 rounded-full object-cover"
                                        alt="User"
                                    />
                                </Link>
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-md py-1 z-50">
                                    <Link href="/user-profile" className="block px-4 py-2 text-sm text-gray-700">
                                        Your Profile
                                    </Link>
                                    <button className="block px-4 py-2 text-sm text-gray-700 text-left w-full" onClick={logoutUser}>
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className={getLinkClasses("/login")}>Login</Link>
                    )}

                    <div className="flex items-center">
                        <Link href="/search" className={getLinkClasses("/search")}>
                            🔍
                        </Link>
                        <Link href="/favourites" className={getLinkClasses("/favourites")}>
                            ❤️
                        </Link>
                        <Link href="/cart" className={getLinkClasses("/cart")}>
                            🛒
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
