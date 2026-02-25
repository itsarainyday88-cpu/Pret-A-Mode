"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface PhilosophyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TABS = [
    {
        id: "faire-clic",
        label: "Faire Clic",
        labelKo: "페르클릭",
        headline: "클릭을 예술로 만들다",
        keyword: "Faire(하다/만들다) + Clic(클릭) — 단순한 노동이 아닌 창조적 행위로서의 자동화",
        story: `과거의 마케터들이 잉크와 종이로 세상을 움직였다면, 현대의 마케터는 데이터와 알고리즘으로 파도를 만듭니다. 우리는 그 복잡한 파도를 타는 법을 '단 한 번의 움직임(Faire Clic)'으로 압축했습니다.

페르클릭은 기술 뒤에 숨겨진 번거로움을 제거하고, 당신이 오직 결정과 창조에만 집중할 수 있게 돕습니다. 마케팅 자동화부터 AI 교육까지, 우리의 모든 여정은 당신의 손끝에서 시작되는 가장 간결하고 강력한 혁명입니다.`,
    },
    {
        id: "pret-a-mode",
        label: "Prêt-à-Mode",
        labelKo: "프레아모드",
        headline: "맞춤형 트렌드의 완성",
        keyword: "Prêt-à-porter(기성복)에서 착안 — 준비된(Prêt-à) + 방식/트렌드(Mode)",
        story: `가장 좋은 옷은 입는 사람의 체형을 이해하고, 가장 좋은 마케팅은 시대의 흐름을 이해합니다. 프레아모드는 AI를 통해 지금 이 순간의 트렌드를 가장 완벽한 형태의 콘텐츠로 '재단'합니다.

우리는 복잡한 제작 과정 없이도 당신의 브랜드에 딱 맞는 옷을 입혀드리는 '마케팅 오트쿠튀르(Haute Couture)'의 대중화를 꿈꿉니다. 시스템을 입는 것만으로도 앞서가는 곳, 프레아모드에서 당신의 비즈니스 스타일을 완성하십시오.`,
    },
];

export default function PhilosophyModal({ isOpen, onClose }: PhilosophyModalProps) {
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        if (isOpen) setActiveTab(0);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-50 bg-charcoal-grey/30 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.45, ease: "easeOut" as const }}
                    >
                        <div className="bg-white/96 backdrop-blur-xl w-full max-w-2xl rounded-3xl shadow-2xl shadow-charcoal-grey/10 border border-sand-beige/60 relative pointer-events-auto overflow-hidden">
                            {/* Close */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-gray-400 hover:text-charcoal-grey transition-colors z-10"
                                aria-label="닫기"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* 탭 헤더 */}
                            <div className="flex border-b border-sand-beige/60 px-10 pt-10">
                                {TABS.map((tab, i) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(i)}
                                        className="relative mr-8 pb-4 text-left group"
                                    >
                                        <span className={`text-xs tracking-[0.25em] uppercase font-semibold transition-colors duration-200 ${activeTab === i ? "text-gold-accent" : "text-gray-400 group-hover:text-charcoal-grey"
                                            }`}>
                                            {tab.labelKo}
                                        </span>
                                        <span className={`block text-base font-bold mt-0.5 transition-colors duration-200 ${activeTab === i ? "text-charcoal-grey" : "text-gray-400 group-hover:text-charcoal-grey"
                                            }`}>
                                            {tab.label}
                                        </span>
                                        {/* Active underline */}
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-accent rounded-full"
                                            initial={false}
                                            animate={{ opacity: activeTab === i ? 1 : 0 }}
                                            transition={{ duration: 0.25 }}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* 탭 콘텐츠 */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3, ease: "easeOut" as const }}
                                    className="px-10 py-8"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal-grey leading-snug mb-4">
                                        {TABS[activeTab].headline}
                                    </h2>
                                    <p className="text-sm text-gold-accent font-medium tracking-wide mb-6 leading-relaxed border-l-2 border-gold-accent pl-4">
                                        {TABS[activeTab].keyword}
                                    </p>
                                    <div className="text-gray-600 font-light leading-[1.9] text-base whitespace-pre-line">
                                        {TABS[activeTab].story}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
