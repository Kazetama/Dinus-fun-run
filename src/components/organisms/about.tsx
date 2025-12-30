import React from "react";
import { Button } from "@/components/ui/button";
import {
    Download,
    Code2,
    Briefcase,
    Globe
} from "lucide-react";

const About = () => {
    const skills = [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Laravel",
        "Express.js",
        "Node.js",
        "MySQL",
        "System Design",
        "UI/UX",
        "IoT",
        "Networking",
    ];

    return (
        <section
            className="w-full py-20 bg-white relative"
            id="about"
            aria-labelledby="about-heading"
        >
            {/* Hidden SEO Heading */}
            <h2 className="sr-only" id="about-heading">
                About Kazeetama – Teuku Aryansyah Pratama | Software Developer Portfolio
            </h2>

            <div className="container mx-auto px-4 md:px-6 max-w-6xl">

                {/* SECTION HEADER */}
                <header className="flex flex-col items-center text-center mb-16 space-y-4">
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50/50 px-3 py-1 text-sm text-blue-600">
                        <span className="font-semibold">About Me</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                        Lebih Dari Sekadar <span className="text-blue-600">Kode</span>
                    </h3>

                    <p className="max-w-2xl text-slate-500 md:text-lg">
                        Profil profesional <strong>Teuku Aryansyah Pratama (Kazeetama)</strong>,
                        Software Developer dan Engineer yang mengutamakan kualitas sistem,
                        skalabilitas, dan pengalaman pengguna.
                    </p>
                </header>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* MAIN BIO */}
                    <article className="md:col-span-7 lg:col-span-8 bg-slate-50 rounded-[2rem] p-8 border border-slate-100 relative overflow-hidden group hover:border-blue-100 transition-colors">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10">
                            <Code2 size={120} />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <h4 className="text-2xl font-bold text-slate-800">
                                Perjalanan Profesional
                            </h4>

                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>
                                    Saya adalah <strong>Teuku Aryansyah Pratama</strong>, dikenal
                                    secara profesional sebagai <strong>Kazeetama</strong>.
                                    Ketertarikan saya pada teknologi dimulai dari rasa ingin tahu
                                    tentang bagaimana sistem bekerja secara end-to-end.
                                </p>

                                <p>
                                    Saat ini saya berfokus pada pengembangan sistem web modern,
                                    mulai dari arsitektur backend, integrasi API, hingga
                                    antarmuka yang ramah pengguna. Saya percaya bahwa solusi
                                    digital yang baik harus efisien secara teknis dan intuitif
                                    secara pengalaman pengguna.
                                </p>
                            </div>

                            <Button
                                className="rounded-full mt-4 bg-slate-900 hover:bg-slate-800 gap-2"
                                aria-label="Download CV Teuku Aryansyah Pratama"
                            >
                                <Download className="w-4 h-4" />
                                Download CV
                            </Button>
                        </div>
                    </article>

                    {/* EXPERIENCE & PROJECTS */}
                    <aside className="md:col-span-5 lg:col-span-4 grid grid-rows-2 gap-6">

                        {/* EXPERIENCE */}
                        <div className="bg-slate-900 rounded-[2rem] p-8 flex flex-col justify-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20"></div>

                            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                3+
                            </span>
                            <p className="text-slate-300 font-medium text-lg">
                                Tahun Pengalaman
                            </p>
                            <p className="text-sm text-slate-500">
                                Fullstack & System Development
                            </p>
                        </div>

                        {/* PROJECTS */}
                        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <span className="text-4xl font-bold text-slate-900">
                                    20+
                                </span>
                            </div>
                            <p className="text-slate-600 font-medium">
                                Proyek Diselesaikan
                            </p>
                            <p className="text-sm text-slate-400">
                                Website, Dashboard, hingga SaaS Platform
                            </p>
                        </div>
                    </aside>

                    {/* SKILLS */}
                    <section
                        className="md:col-span-12 bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm"
                        aria-label="Tech Stack Kazeetama"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                            <div className="space-y-2 md:w-1/3">
                                <h5 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-blue-600" />
                                    Tech Stack & Tools
                                </h5>
                                <p className="text-slate-500 text-sm">
                                    Teknologi utama yang digunakan oleh Kazeetama dalam
                                    pengembangan sistem.
                                </p>
                            </div>

                            <ul className="flex flex-wrap gap-2 md:w-2/3 justify-start md:justify-end">
                                {skills.map((item, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 rounded-full text-sm font-medium bg-slate-50 text-slate-600 border border-slate-100 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </section>

                </div>
            </div>
        </section>
    );
};

export default About;
