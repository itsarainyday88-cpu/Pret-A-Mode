"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

interface NavbarProps {
    onInquiryClick: () => void;
}

export default function Navbar({ onInquiryClick }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
                    ? "bg-white/85 backdrop-blur-xl border-b border-sand-beige/50 shadow-sm"
                    : "bg-transparent"
                }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* 로고 */}
                <a href="#" className="flex items-center gap-3">
                    <img
                        src="/logo.jpg"
                        alt="Prêt-à-Mode"
                        className="h-8 w-auto mix-blend-multiply"
                    />
                    <span
                        className={`hidden sm:block text-sm font-semibold tracking-widest uppercase transition-colors duration-300 ${scrolled ? "text-charcoal-grey" : "text-charcoal-grey/80"
                            }`}
                    >
                        Prêt-à-Mode
                    </span>
                </a>

                {/* 우측 버튼 */}
                <button
                    onClick={onInquiryClick}
                    className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${scrolled
                            ? "bg-charcoal-grey text-white hover:bg-black shadow-md"
                            : "bg-charcoal-grey/10 text-charcoal-grey border border-charcoal-grey/20 hover:bg-charcoal-grey/20"
                        }`}
                >
                    문의하기
                </button>
            </div>
        </motion.header>
    );
}
