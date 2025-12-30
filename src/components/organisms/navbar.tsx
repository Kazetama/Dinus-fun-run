import React from "react";
import { Menu, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Portfolio", href: "#" },
    { name: "About", href: "#" },
];

const Navbar = () => {
    return (
        <nav className="fixed top-6 inset-x-0 z-50">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Main Glassmorphism Container */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl px-6 py-3 flex items-center justify-between">

                    {/* Logo Section */}
                    <div className="flex items-center gap-2 font-black text-xl tracking-tighter text-slate-900 group cursor-pointer">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <Zap className="text-white w-5 h-5" fill="currentColor" />
                        </div>
                        <span>Kazeetama</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-15"> {/* Gap diperlebar agar garis bawah punya ruang */}
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors group"
                            >
                                {link.name}

                                {/* Garis Bawah Animasi */}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <Button className="rounded-xl px-6 bg-slate-900 hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                            Contact Us
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                                    <Menu className="h-6 w-6 text-slate-700" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="right" className="w-[85%] sm:w-[380px] px-6 border-l-0 rounded-l-[2rem]">
                                <SheetHeader className="text-left pt-6 pb-8 border-b border-slate-50">
                                    <SheetTitle className="text-2xl font-black tracking-tight">
                                        MENU<span className="text-blue-600">.</span>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-2 mt-6">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="group flex items-center justify-between p-4 rounded-2xl text-lg font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                                        >
                                            {link.name}
                                            <div className="bg-white p-2 rounded-xl shadow-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                                <ChevronRight className="h-5 w-5 text-blue-600" />
                                            </div>
                                        </a>
                                    ))}

                                    <div className="mt-auto pb-8 pt-7 shrink-0">
                                        <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100 text-base font-bold transition-all active:scale-[0.98]">
                                            Contact Us
                                        </Button>
                                        <p className="text-center text-xs text-slate-400 mt-6">
                                            © 2026 Kaze Software. All rights reserved.
                                        </p>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;