import React from "react";
import {
    GraduationCap,
    Network,
    Code
} from "lucide-react";

const Timeline = () => {
    const timelineData = [
        {
            id: 1,
            type: "education",
            year: "2020 – 2023",
            title: "Teknik Komputer & Jaringan (TKJ)",
            institution: "SMK Pawiyatan Daha 3 Kediri",
            description:
                "Membangun fondasi teknis di bidang jaringan komputer, sistem operasi, serta pemahaman dasar infrastruktur IT dan troubleshooting teknis.",
            icon: Network,
            tags: [
                "Computer Networking",
                "System Administration",
                "Hardware & OS Fundamentals",
            ],
            isCurrent: false,
        },
        {
            id: 2,
            type: "education",
            year: "2023 – Sekarang",
            title: "S1 – Teknik Informatika",
            institution: "Universitas Dian Nuswantoro",
            description:
                "Fokus pada rekayasa perangkat lunak, algoritma dan struktur data, serta pengembangan aplikasi berbasis web dan sistem terdistribusi.",
            icon: Code,
            tags: [
                "Software Engineering",
                "Web Development",
                "Algorithms & Data Structures",
            ],
            isCurrent: true,
        },
    ];

    return (
        <section
            className="w-full py-24 bg-slate-50"
            id="experience"
            aria-labelledby="timeline-heading"
        >
            {/* Hidden SEO Heading */}
            <h2 id="timeline-heading" className="sr-only">
                Education Timeline Kazeetama – Teuku Aryansyah Pratama
            </h2>

            <div className="container mx-auto px-4 md:px-6 max-w-4xl">

                {/* SECTION HEADER */}
                <header className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-3 py-1 text-sm text-blue-600 shadow-sm mb-4">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        <span className="font-semibold">Education & Journey</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                        Jejak Pendidikan & <span className="text-blue-600">Pengembangan Diri</span>
                    </h3>

                    <p className="text-slate-500 max-w-xl">
                        Latar belakang akademik yang membentuk pendekatan analitis dan
                        problem-solving saya sebagai Software Engineer.
                    </p>
                </header>

                {/* TIMELINE */}
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

                    {timelineData.map((item) => (
                        <article
                            key={item.id}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            {/* DOT */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                {item.isCurrent ? (
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                                    </span>
                                ) : (
                                    <div className="w-3 h-3 bg-slate-300 rounded-full" />
                                )}
                            </div>

                            {/* CARD */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${item.isCurrent ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <span className={`text-sm font-bold ${item.isCurrent ? "text-blue-600" : "text-slate-500"}`}>
                                            {item.year}
                                        </span>
                                    </div>

                                    {item.isCurrent && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Current
                                        </span>
                                    )}
                                </div>

                                <h4 className="text-xl font-bold text-slate-900 mb-1">
                                    {item.title}
                                </h4>

                                <p className="text-slate-500 font-medium text-sm mb-3">
                                    {item.institution}
                                </p>

                                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                    {item.description}
                                </p>

                                <ul className="flex flex-wrap gap-2">
                                    {item.tags.map((tag, i) => (
                                        <li
                                            key={i}
                                            className="px-2 py-1 text-xs font-medium rounded-md bg-slate-50 text-slate-500 border border-slate-100"
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Timeline;
