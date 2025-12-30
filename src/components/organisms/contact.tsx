import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Mail,
    MapPin,
    Send,
    MessageSquare,
    Linkedin,
    Github,
    Instagram,
} from "lucide-react";

const Contact = () => {
    return (
        <section
            className="w-full py-24 bg-slate-50 relative overflow-hidden"
            id="contact"
            aria-labelledby="contact-heading"
        >
            {/* Hidden SEO Heading */}
            <h2 id="contact-heading" className="sr-only">
                Contact Kazeetama – Teuku Aryansyah Pratama | Software Developer
            </h2>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-30 -z-10 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-6xl">

                {/* SECTION HEADER */}
                <header className="flex flex-col items-center text-center mb-16 space-y-4">
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3 py-1 text-sm text-blue-600 shadow-sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        <span className="font-semibold">Get in Touch</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                        Hubungi <span className="text-blue-600">Saya</span>
                    </h3>

                    <p className="max-w-xl text-slate-500 md:text-lg">
                        Terbuka untuk diskusi proyek, kolaborasi profesional, maupun peluang
                        kerja di bidang pengembangan perangkat lunak.
                    </p>
                </header>

                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* CONTACT INFO */}
                    <aside className="space-y-8 lg:pt-8">
                        <div className="space-y-4">
                            <h4 className="text-2xl font-bold text-slate-900">
                                Informasi Kontak
                            </h4>
                            <p className="text-slate-600 leading-relaxed">
                                Saya adalah <strong>Teuku Aryansyah Pratama</strong>, dikenal
                                sebagai <strong>Kazeetama</strong>. Silakan hubungi saya untuk
                                keperluan profesional terkait pengembangan web dan sistem.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Email</p>
                                    <a
                                        href="mailto:teuku@kazetama.dev"
                                        className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                                    >
                                        kazeee.dev@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Lokasi</p>
                                    <p className="text-lg font-semibold text-slate-900">
                                        Kediri, Indonesia
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* SOCIAL LINKS */}
                        <div className="pt-8 border-t border-slate-200">
                            <p className="text-sm font-medium text-slate-500 mb-4">
                                Profil Profesional
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="https://github.com/kazetama"
                                    aria-label="GitHub Kazeetama"
                                    className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all"
                                >
                                    <Github className="w-5 h-5" />
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/teuku-aryansyah-pratama-81aa97278/"
                                    aria-label="LinkedIn Teuku Aryansyah Pratama"
                                    className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>

                                <a
                                    href="https://www.instagram.com/kazeetama"
                                    aria-label="Instagram Kazeetama"
                                    className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* CONTACT FORM */}
                    <article className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <form className="space-y-6" aria-label="Contact Form">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-700">
                                        Nama Lengkap
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="Nama Anda"
                                        className="bg-slate-50 border-slate-200 focus:bg-white h-12 rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="kazeee.dev@gmail.com"
                                        className="bg-slate-50 border-slate-200 focus:bg-white h-12 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-slate-700">
                                    Subjek
                                </label>
                                <Input
                                    id="subject"
                                    placeholder="Proyek, Kerja Sama, atau Pertanyaan"
                                    className="bg-slate-50 border-slate-200 focus:bg-white h-12 rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-700">
                                    Pesan
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="Jelaskan kebutuhan atau pesan Anda secara singkat..."
                                    className="bg-slate-50 border-slate-200 focus:bg-white min-h-[150px] rounded-xl resize-none"
                                />
                            </div>

                            <Button
                                size="lg"
                                className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-base font-medium shadow-lg hover:shadow-xl transition-all"
                                aria-label="Kirim pesan ke Teuku Aryansyah Pratama"
                            >
                                Kirim Pesan <Send className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </article>

                </div>
            </div>
        </section>
    );
};

export default Contact;
