"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layers, PenTool, Sparkles, Workflow } from "lucide-react";
import { useState, useEffect } from "react";
import InquiryModal from "@/components/InquiryModal";
import PhilosophyModal from "@/components/PhilosophyModal";

const SLIDES = ["/lumiere_p1.jpg", "/lumiere_p2.jpg"];

function PdfRotator() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" as const }}
      className="relative w-full rounded-3xl shadow-2xl overflow-hidden border border-white/60 bg-white"
      style={{ aspectRatio: "4/3" }}
    >
      {/* 두 이미지를 겹쳐 놓고 opacity로 크로스페이드 */}
      {SLIDES.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt={`Faire Clic System preview ${i + 1}`}
          className="absolute inset-0 w-full h-full object-contain"
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" as const }}
        />
      ))}

      {/* 하단 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "bg-gold-accent w-6" : "bg-charcoal-grey/30 w-2"
              }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);

  return (
    <div className="w-full flex flex-col pt-24 pb-32 bg-warm-white">
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PhilosophyModal isOpen={isPhilosophyOpen} onClose={() => setIsPhilosophyOpen(false)} />
      {/* 1. Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 flex flex-col items-center"
        >
          {/* Logo matches the provided image aspect ratio */}
          <img src="/logo.jpg" alt="Prêt-à-Mode Logo" className="w-64 md:w-80 h-auto mb-12 mix-blend-multiply" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand-beige/50 border border-charcoal-grey/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-gold-accent" />
            <span className="text-sm font-medium tracking-wide text-charcoal-grey">Faire Clic AI Engine</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 font-pretendard leading-[1.15] text-charcoal-grey">
            마케팅 <span className="font-serif italic text-gold-accent">오트쿠튀르</span>의 <br />
            대중화를 선언하다
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-12 font-light leading-relaxed">
            나를 위해 완벽하게 준비된(Prêt-à) 트렌드(Mode). 복잡한 논리와 반복되는 노동은 시스템이 예술(Faire Clic)로 구현합니다.
            당신은 그저 선택하고 누리십시오.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-charcoal-grey text-white font-semibold rounded-full hover:bg-black transition-colors flex items-center gap-2 w-full sm:w-auto justify-center shadow-xl shadow-charcoal-grey/10">
              맞춤 시스템 도입 문의 <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => setIsPhilosophyOpen(true)} className="px-8 py-4 bg-transparent border border-charcoal-grey/20 text-charcoal-grey font-semibold rounded-full hover:bg-charcoal-grey/5 transition-colors w-full sm:w-auto justify-center">
              철학 및 기능 살펴보기
            </button>
          </div>
        </motion.div>

        {/* Abstract Background Elements simulating Fluid Sophistication */}
        <div className="absolute top-1/4 left-[10%] w-[600px] h-[600px] bg-sand-beige rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-gold-accent/10 rounded-full blur-[120px] -z-10 mix-blend-multiply opacity-40" />
      </section>

      {/* 2. Philosophy & Core Features */}
      <section className="py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-24 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-charcoal-grey">시대의 흐름을 이해하는 재단사</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed text-balance">
            가장 좋은 옷은 입는 사람의 체형을 이해하듯, 최고의 마케팅은 브랜드의 숨결을 이해합니다.
            단순 매크로가 아닙니다. 대표님의 문체와 철학을 딥러닝하여, 지금 이 순간의 트렌드를 가장 완벽한 형태의 콘텐츠로 재단합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Layers className="w-8 h-8 text-gold-accent" />,
              title: "Phase 1. 패턴 설계 (학습)",
              desc: "브랜드가 지닌 고유의 언어와 비즈니스 철학을 AI가 섬세하게 직조하여 전용 문체 모델을 구축합니다."
            },
            {
              icon: <PenTool className="w-8 h-8 text-gold-accent" />,
              title: "Phase 2. 콘텐츠 재단 (생성)",
              desc: "시장을 관통하는 핵심 키워드 하나로, 블로그부터 SNS까지 채널별로 최적화된 콘텐츠를 동시 재단합니다."
            },
            {
              icon: <Workflow className="w-8 h-8 text-gold-accent" />,
              title: "Phase 3. 입히고 누리다 (업로드)",
              desc: "저품질이나 스팸 우려 없는 검수형 도우미(Safe Publish)를 통해 만들어진 옷을 세상에 우아하게 내보입니다."
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2, duration: 0.7, ease: "easeOut" }}
              className="bg-white border border-sand-beige p-10 rounded-3xl hover:shadow-2xl hover:shadow-sand-beige/40 transition-all duration-500 group"
            >
              <div className="bg-warm-white border border-sand-beige w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-charcoal-grey">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Value Proposition (ROI) */}
      <section className="py-32 px-6 bg-sand-beige/20 border-y border-sand-beige/30 w-full mt-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
          <div className="flex-1 lg:pr-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-pretendard leading-[1.2] text-charcoal-grey">
              준비된 시스템이 만드는 <br />
              <span className="text-gold-accent font-serif italic">단단한 성과의 차이</span>
            </h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-light">
              초기 맞춤형 세팅 3개월 이후, 고정 지출은 90% 이상 절감됩니다.
              대표님의 비즈니스 로직이 담긴 모든 학습 데이터와 모델 포맷은
              외부 유출 없이 온전히 귀사의 자산으로 영구 귀속됩니다.
            </p>
            <ul className="space-y-6">
              {[
                "월 유지 지출 5만원 이하 (API 실비 예상)",
                "외부 에이전시 의존도 완벽한 0% 달성",
                "지역 및 타겟 내 압도적 하이엔드 권위 선점"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg">
                  <div className="w-2 h-2 rounded-full bg-gold-accent" />
                  <span className="text-charcoal-grey font-medium tracking-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full relative">
            <PdfRotator />
          </div>
        </div>
      </section>

      {/* 4. Footer CTA */}
      <footer className="py-32 px-6 max-w-4xl mx-auto text-center w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-charcoal-grey">당신의 비즈니스 핏을 완성하십시오</h2>
        <p className="text-gray-600 mb-14 text-lg font-light leading-relaxed">
          마케팅 시스템을 입는 것만으로도 앞서가는 곳, 프레아모드입니다. <br className="hidden sm:block" />
          간단한 인터뷰 일정을 통해 귀사만의 오트쿠튀르 설계를 시작하겠습니다.
        </p>

        <div className="inline-flex flex-col items-center p-10 rounded-3xl bg-white border border-sand-beige/50 w-full max-w-md shadow-2xl shadow-sand-beige/20 text-charcoal-grey">
          <h3 className="text-2xl font-bold mb-8 w-full text-left">VIP 도입 상담</h3>
          <div className="w-full text-left space-y-6 text-gray-600 font-light">
            <p className="flex justify-between border-b border-gray-100 pb-3">
              <span className="tracking-wide">Executive</span>
              <span className="font-semibold text-charcoal-grey">백성현 (James Baek)</span>
            </p>
          </div>
          <button
            onClick={() => {
              const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_OPEN_CHAT_URL;
              if (kakaoUrl && !kakaoUrl.startsWith("여기에")) {
                window.open(kakaoUrl, "_blank");
              }
            }}
            className="w-full py-5 mt-10 bg-charcoal-grey text-white tracking-widest font-bold rounded-full hover:bg-black transition-all duration-300 shadow-xl shadow-charcoal-grey/20 hover:shadow-2xl hover:-translate-y-1"
          >
            Schedule a Private Meeting
          </button>
        </div>

        <div className="mt-32 pt-10 border-t border-gray-200 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-light">&copy; {new Date().getFullYear()} Baekseong Illyu. All rights reserved.</span>
          <span className="font-serif italic text-lg tracking-widest text-charcoal-grey">Prêt-à-Mode</span>
        </div>
      </footer>
    </div>
  );
}
