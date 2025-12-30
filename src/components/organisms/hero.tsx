import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import profileImg from "@/assets/profile.png";

const Hero = () => {
    return (
        <section
            className="w-full bg-slate-50/50 relative overflow-hidden"
            aria-label="Hero Section - Kazeetama Portfolio"
        >
            {/* SEO Hidden Heading (for GitHub & Google Crawlers) */}
            <h1 className="sr-only">
                Kazeetama – Teuku Aryansyah Pratama | Web Developer & Software Engineer
            </h1>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 pt-32 pb-16 md:pt-44 md:pb-32 max-w-6xl">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    {/* LEFT CONTENT */}
                    <header className="flex flex-col justify-center space-y-8 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-white/80 shadow-sm backdrop-blur-sm">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                                </span>
                                <span className="text-sm font-medium text-slate-600">
                                    Web Developer • Software Engineer • Technical Consultant
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* MAIN SEO HEADING */}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl/tight font-extrabold tracking-tight text-slate-900">
                                Teuku Aryansyah <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Pratama
                                </span>
                            </h2>

                            {/* Alias Keyword */}
                            <p className="text-sm font-semibold text-slate-500 tracking-wide uppercase">
                                Known as <strong>Kazeetama</strong>
                            </p>

                            {/* SEO DESCRIPTION */}
                            <p className="max-w-[620px] mx-auto lg:mx-0 text-lg text-slate-600 leading-relaxed">
                                Saya adalah <strong>Teuku Aryansyah Pratama (Kazeetama)</strong>,
                                seorang Software Developer dan Research-Oriented Engineer yang
                                berfokus pada pengembangan sistem web modern, scalable, dan
                                sesuai standar industri.
                            </p>
                        </div>

                        <nav
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            aria-label="Primary Actions"
                        >
                            <Button size="lg" className="h-12 px-8 text-base bg-slate-900">
                                Mulai Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 px-8 text-base"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                GitHub – Kazeetama
                            </Button>
                        </nav>

                        <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                            Portfolio resmi • Open-source contributor • GitHub Profile
                        </p>
                    </header>

                    {/* RIGHT IMAGE */}
                    <figure className="relative flex justify-center lg:justify-end">
                        <div className="relative bg-white p-3 rounded-[2rem] shadow-2xl">
                            <img
                                src={profileImg}
                                alt="Teuku Aryansyah Pratama (Kazeetama) – Web Developer Portfolio Photo"
                                loading="lazy"
                                className="rounded-[1.5rem] w-full max-w-[360px] object-cover aspect-[3/4]"
                            />
                            <figcaption className="sr-only">
                                Foto profil resmi Teuku Aryansyah Pratama, dikenal sebagai
                                Kazeetama
                            </figcaption>

                            <div className="absolute -left-6 bottom-8 md:bottom-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 flex items-center gap-3 animate-bounce-slow">
                                <div className="bg-green-100 p-2.5 rounded-full">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                                <div className="pr-4">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                        Current Focus
                                    </p>
                                    <p className="text-sm font-bold text-slate-900">
                                        Software & Web Development
                                    </p>
                                </div>
                            </div>
                        </div>
                    </figure>
                </div>
            </div>
        </section>
    );
};

export default Hero;
