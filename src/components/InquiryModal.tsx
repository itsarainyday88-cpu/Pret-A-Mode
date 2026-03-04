"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOPICS = [
  "SNS 콘텐츠 생산",
  "블로그 SEO",
  "채널별 자동화",
  "기타",
];

const TIMELINES = [
  "이번 달 내",
  "다음 달 내",
  "여유롭게 검토 중",
];

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [contact, setContact] = useState("");
  const [brand, setBrand] = useState("");
  const [topic, setTopic] = useState("");
  const [timeline, setTimeline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setCompanyName("");
      setContact("");
      setBrand("");
      setTopic("");
      setTimeline("");
      setSubmitError(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl || scriptUrl.startsWith("여기에")) {
      setStep(4);
      return;
    }
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          companyName,
          contact,
          brand,
          topic,
          timeline,
          submittedAt: new Date().toISOString(),
        }),
      });
      setStep(4);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const slide = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };
  const transition = { duration: 0.32, ease: "easeOut" as const };

  // 단계 인디케이터는 실제 질문 단계(1~3)만 표시
  const TOTAL_STEPS = 3;
  const indicatorStep = step - 1; // 0-indexed (step1=0, step2=1, step3=2)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-charcoal-grey/30 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="bg-white/95 backdrop-blur-xl w-full max-w-lg rounded-3xl shadow-2xl shadow-charcoal-grey/15 border border-sand-beige/60 p-6 md:p-10 relative pointer-events-auto overflow-hidden">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-charcoal-grey transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 단계 인디케이터 (질문 단계에서만 표시) */}
              {step >= 1 && step <= 3 && (
                <div className="flex gap-2 mb-8">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= indicatorStep ? "bg-gold-accent" : "bg-sand-beige"
                        }`}
                    />
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* Step 0: 인트로 */}
                {step === 0 && (
                  <motion.div key="s0" variants={slide} initial="enter" animate="center" exit="exit" transition={transition} className="flex flex-col items-start">
                    <span className="text-xs tracking-[0.3em] text-gold-accent uppercase font-semibold mb-6">Prêt-à-Mode</span>
                    <h2 className="text-3xl font-bold text-charcoal-grey leading-snug mb-4">
                      우리가 먼저<br />여쭤보겠습니다.
                    </h2>
                    <p className="text-gray-500 font-light leading-relaxed mb-10">
                      단 3가지 질문으로 귀사에 맞는 시스템의 윤곽을 함께 잡아드립니다.
                    </p>
                    <button
                      onClick={() => setStep(1)}
                      className="w-full py-4 bg-charcoal-grey text-white font-semibold rounded-full hover:bg-black transition-colors shadow-lg shadow-charcoal-grey/10"
                    >
                      시작하기
                    </button>
                  </motion.div>
                )}

                {/* Step 1: 상호명 + 연락처 */}
                {step === 1 && (
                  <motion.div key="s1" variants={slide} initial="enter" animate="center" exit="exit" transition={transition} className="flex flex-col">
                    <p className="text-xs tracking-widest text-gold-accent uppercase mb-2 font-semibold">Q1 / 3</p>
                    <h3 className="text-2xl font-bold text-charcoal-grey mb-6 leading-snug">
                      상호명과 연락처를<br />알려주세요.
                    </h3>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="예: 강남 피부과 클리닉, 주얼리 브랜드 OO"
                      className="w-full border-b border-gray-200 focus:border-gold-accent outline-none py-3 text-charcoal-grey placeholder-gray-300 font-light bg-transparent transition-colors text-base mb-6"
                    />
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="연락처 (전화번호 또는 이메일)"
                      className="w-full border-b border-gray-200 focus:border-gold-accent outline-none py-3 text-charcoal-grey placeholder-gray-300 font-light bg-transparent transition-colors text-base mb-10"
                    />
                    <button
                      disabled={!companyName.trim() || !contact.trim()}
                      onClick={() => setStep(2)}
                      className="w-full py-4 bg-charcoal-grey text-white font-semibold rounded-full hover:bg-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-charcoal-grey/10"
                    >
                      다음
                    </button>
                  </motion.div>
                )}

                {/* Step 2: 브랜드/업종 */}
                {step === 2 && (
                  <motion.div key="s2" variants={slide} initial="enter" animate="center" exit="exit" transition={transition} className="flex flex-col">
                    <p className="text-xs tracking-widest text-gold-accent uppercase mb-2 font-semibold">Q2 / 3</p>
                    <h3 className="text-2xl font-bold text-charcoal-grey mb-6 leading-snug">
                      현재 운영 중인<br />브랜드 또는 업종을 알려주세요.
                    </h3>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="예: 프리미엄 뷰티, 로컬 카페, 인테리어..."
                      className="w-full border-b border-gray-200 focus:border-gold-accent outline-none py-3 text-charcoal-grey placeholder-gray-300 font-light bg-transparent transition-colors text-base mb-10"
                    />
                    <button
                      disabled={!brand.trim()}
                      onClick={() => setStep(3)}
                      className="w-full py-4 bg-charcoal-grey text-white font-semibold rounded-full hover:bg-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-charcoal-grey/10"
                    >
                      다음
                    </button>
                  </motion.div>
                )}

                {/* Step 3: 과제 + 일정 */}
                {step === 3 && (
                  <motion.div key="s3" variants={slide} initial="enter" animate="center" exit="exit" transition={transition} className="flex flex-col">
                    <p className="text-xs tracking-widest text-gold-accent uppercase mb-2 font-semibold">Q3 / 3</p>
                    <h3 className="text-2xl font-bold text-charcoal-grey mb-5 leading-snug">
                      핵심 과제와<br />검토 일정을 선택해 주세요.
                    </h3>

                    <p className="text-sm text-gray-400 mb-3 font-medium">마케팅 과제</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {TOPICS.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTopic(t)}
                          className={`py-3 px-4 rounded-2xl text-sm font-medium border transition-all duration-200 ${topic === t
                            ? "bg-charcoal-grey text-white border-charcoal-grey"
                            : "bg-transparent text-charcoal-grey border-sand-beige hover:border-charcoal-grey/30"
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <p className="text-sm text-gray-400 mb-3 font-medium">검토 일정</p>
                    <div className="flex flex-col gap-2 mb-6">
                      {TIMELINES.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTimeline(t)}
                          className={`py-3 px-4 rounded-2xl text-sm font-medium border text-left transition-all duration-200 ${timeline === t
                            ? "bg-gold-accent/10 text-charcoal-grey border-gold-accent"
                            : "bg-transparent text-charcoal-grey border-sand-beige hover:border-charcoal-grey/30"
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-400 mb-3 text-center">
                        전송에 실패했습니다. 잠시 후 다시 시도해 주세요.
                      </p>
                    )}
                    <button
                      disabled={!topic || !timeline || isSubmitting}
                      onClick={handleSubmit}
                      className="w-full py-4 bg-charcoal-grey text-white font-semibold rounded-full hover:bg-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-charcoal-grey/10"
                    >
                      {isSubmitting ? "전송 중..." : "문의 전송하기"}
                    </button>
                  </motion.div>
                )}

                {/* Step 4: 완료 */}
                {step === 4 && (
                  <motion.div
                    key="s4"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold-accent/10 border border-gold-accent/30 flex items-center justify-center mb-8">
                      <span className="text-2xl">✦</span>
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal-grey mb-4">
                      문의가 접수되었습니다.
                    </h3>
                    <p className="text-gray-500 font-light leading-relaxed mb-10">
                      빠른 시일 내에 직접 연락드리겠습니다.<br />
                      <span className="font-serif italic text-charcoal-grey">— James Baek</span>
                    </p>
                    <button
                      onClick={onClose}
                      className="w-full py-4 bg-charcoal-grey text-white font-semibold rounded-full hover:bg-black transition-colors"
                    >
                      닫기
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
