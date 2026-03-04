"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const FAQS = [
    {
        q: "도입 비용은 어떻게 되나요?",
        a: "초기 맞춤 세팅은 프로젝트 규모에 따라 협의하며, 이후 월 유지 비용은 API 실비(약 5만원 이하) 수준입니다. 외부 에이전시 계약 대비 최대 90% 절감 효과가 나타납니다.",
    },
    {
        q: "세팅에 얼마나 걸리나요?",
        a: "브랜드 학습 및 시스템 구축 기간은 통상 3개월입니다. 1개월 패턴 설계, 2개월 자동화 구축 이후 자체 운영 단계로 전환됩니다.",
    },
    {
        q: "AI가 우리 브랜드 톤을 실제로 이해할 수 있나요?",
        a: "네. 단순 템플릿이 아니라 대표님의 실제 문체, 철학, 비즈니스 키워드를 딥러닝하여 전용 모델을 구축합니다. 결과물은 직접 작성한 것과 구별이 어렵습니다.",
    },
    {
        q: "데이터 보안은 어떻게 관리되나요?",
        a: "모든 학습 데이터와 모델 파일은 외부 공유 없이 귀사 자산으로 귀속됩니다. 저희는 접근 권한을 보유하지 않으며, 완납 후 전체 소스를 이관합니다.",
    },
    {
        q: "마케팅을 전혀 몰라도 운영할 수 있나요?",
        a: "세팅 완료 후 운영은 '버튼 하나' 수준입니다. 콘텐츠 생성, 스케줄링, 채널 배포까지 자동화되어 주 1~2시간 내외의 관리만으로 충분합니다.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-28 px-6 max-w-3xl mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" as const }}
                className="text-center mb-16"
            >
                <span className="text-xs tracking-[0.3em] text-gold-accent uppercase font-semibold">FAQ</span>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-grey mt-4">
                    자주 묻는 질문
                </h2>
            </motion.div>

            <div className="space-y-3">
                {FAQS.map((faq, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" as const }}
                        className="bg-white/70 border border-sand-beige/60 rounded-2xl overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between px-6 py-5 text-left group"
                        >
                            <span className="font-semibold text-charcoal-grey text-base pr-4">{faq.q}</span>
                            <motion.span
                                animate={{ rotate: openIndex === i ? 45 : 0 }}
                                transition={{ duration: 0.25 }}
                                className="text-gold-accent text-2xl leading-none flex-shrink-0 font-light"
                            >
                                +
                            </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                            {openIndex === i && (
                                <motion.div
                                    key="answer"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: "easeInOut" as const }}
                                >
                                    <p className="px-6 pb-6 text-gray-600 font-light leading-relaxed border-t border-sand-beige/40 pt-4">
                                        {faq.a}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
