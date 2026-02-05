import React from 'react';
import { Layers, Zap, Shield, Network, ArrowRight, Activity, Cpu } from 'lucide-react';
import LottieAvatar from './LottieAvatar';

interface LandingPageProps {
  onLaunchApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp }) => {
  return (
    <div className="h-screen bg-[#050505] text-gray-200 font-mono overflow-y-auto overflow-x-hidden">
      {/* Animated Background - neon green glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-green/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-neon-green/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Header - matches WalletBar */}
        <header className="h-12 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center px-6 justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <h1 className="text-neon-green font-bold font-mono tracking-wider flex items-center gap-2">
              <Layers size={18} /> GALAXY AGENTS <span className="text-white/40 text-xs font-normal">v2.0</span>
            </h1>
          </div>
          <button
            onClick={onLaunchApp}
            className="px-4 py-1.5 bg-neon-green/10 hover:bg-neon-green/20 rounded border border-neon-green/50 transition-all duration-300 flex items-center gap-2 text-neon-green text-sm font-mono font-bold uppercase tracking-wider"
          >
            เปิดแอป <ArrowRight size={14} />
          </button>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 my-20 px-6 max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-block px-3 py-1.5 bg-neon-green/10 rounded border border-neon-green/30 backdrop-blur-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-neon-green">
                ⚡ เครือข่ายป้องกันการโกงดิจิทัล
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold leading-tight font-mono">
              <span className="text-neon-green">GALAXY</span>
              <br />
              <span className="text-white/90">AGENTS</span>
              <br />
              <span className="text-white/60">Network</span>
            </h2>

            <p className="text-base text-gray-400 max-w-2xl leading-relaxed font-mono">
              ใช้ AI Agent อัจฉริยะ <span className="text-neon-green font-bold">ตรวจจับและป้องกันการโกงดิจิทัล</span> แบบเรียลไทม์
              ปกป้องประชาชนและธุรกิจไทยจากกลโกง ด้วยการจดจำรูปแบบ ข่าวกรองภัยคุกคาม และระบบเตือนภัยฉุกเฉิน
              สร้างสำหรับ Samsung × KBTG Hackathon
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onLaunchApp}
                className="px-6 py-3 bg-neon-green text-black rounded font-bold text-sm font-mono uppercase tracking-wider hover:shadow-[0_0_20px_rgba(67,255,77,0.5)] transition-all duration-300 flex items-center gap-2"
              >
                <Zap size={16} /> เปิดแอป
              </button>
              <a
                href="https://github.com/johnnyduo/GalaxyAgents"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded font-bold text-sm font-mono uppercase tracking-wider backdrop-blur-sm border border-white/10 hover:border-neon-green/50 transition-all duration-300"
              >
                ดูบน GitHub
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-6 font-mono">
              <div>
                <div className="text-2xl font-bold text-neon-green">7</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Agent</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neon-green">∞</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">ภารกิจ</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neon-green">24/7</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">ทำงาน</div>
              </div>
            </div>
          </div>

          {/* Right - Lion Lottie */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-green/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative bg-black/40 rounded-xl p-8 backdrop-blur-sm border border-neon-green/20">
                <LottieAvatar 
                  animationPath="/lottie/Lion - Breath.json" 
                  width={350} 
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20 px-6 max-w-7xl mx-auto">
          <FeatureCard
            icon={<Network className="text-neon-green" size={24} />}
            title="ระบบ Multi-Agent"
            description="7 Agent เชี่ยวชาญ ตรวจจับรูปแบบกลโกง"
          />
          <FeatureCard
            icon={<Shield className="text-neon-green" size={24} />}
            title="ข่าวกรองภัยคุกคาม"
            description="ตรวจจับรูปแบบกลโกงแบบเรียลไทม์"
          />
          <FeatureCard
            icon={<Zap className="text-neon-green" size={24} />}
            title="แจ้งเตือนฉุกเฉิน"
            description="แจ้งเตือนหลายช่องทางทันที"
          />
          <FeatureCard
            icon={<Cpu className="text-neon-green" size={24} />}
            title="ขับเคลื่อนด้วย AI"
            description="ตัดสินใจด้วย Gemini AI"
          />
        </div>

        {/* Agent Showcase */}
        <div className="text-center mb-8 px-6 max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-2 font-mono text-neon-green uppercase tracking-wider">ทีมป้องกัน</h3>
          <p className="text-gray-500 text-sm font-mono uppercase tracking-wider">7 AI Agent ป้องกันการโกง</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6 mb-20 max-w-7xl mx-auto">
          <AgentPreview
            name="ลุงสิงห์ (Big Boss)"
            role="ผู้บัญชาการ"
            avatar="/lottie/Lion - Breath.json"
            ability="ราชสีห์ผู้บัญชาการสูงสุด สั่งการทุกปฏิบัติการ ลุงเข้มแต่ใจดี ลูกน้องรักทุกคน"
          />
          <AgentPreview
            name="พี่เหยี่ยว (Hawk Eye)"
            role="นักสืบ"
            avatar="/lottie/running pigeon.json"
            ability="นกพิราบสายลับตาเหยี่ยว สืบหากลโกงใหม่ทั่วเน็ต ดมกลิ่นมิจได้ก่อนลงมือ"
          />
          <AgentPreview
            name="ป้าฮูก (Memory Bank)"
            role="คลังความจำ"
            avatar="/lottie/Duo Attack.json"
            ability="นกฮูกจอมจำ สมองกลของทีม ป้าจำทุกเคสกลโกง ใครถามอะไรป้าตอบได้หมด"
          />
          <AgentPreview
            name="น้องฟ้า (Guardian Angel)"
            role="เทวดาผู้คุ้มครอง"
            avatar="/lottie/Happy Unicorn Dog.json"
            ability="ยูนิคอร์นใจดี คอยดูแลประชาชน ตรวจ SMS ปลอมและสายโทรต้องสงสัย น่ารักมาก"
          />
          <AgentPreview
            name="ครูหมี (Scam Trainer)"
            role="ครูฝึกสอน"
            avatar="/lottie/Cute bear dancing.json"
            ability="หมีน้อยสุดครีเอทีฟ สร้างสื่อจำลองกลโกง วิดีโอเตือนภัย สอนสนุก เข้าใจง่าย"
          />
          <AgentPreview
            name="จ.ส.ต.จิ้งจอก (Money Guard)"
            role="ผู้พิทักษ์การเงิน"
            avatar="/lottie/happy fox.json"
            ability="เจ้าหน้าที่การเงินจมูกไว ดมกลิ่นใบแจ้งหนี้ปลอมและอีเมลหลอกลวงได้แม่นยำ"
          />
          <AgentPreview
            name="ผบ.มังกร (Lightning Alert)"
            role="สายฟ้าแจ้งเตือน"
            avatar="/lottie/Dragon.json"
            ability="มังกรสายฟ้า เร็วที่สุดในทีม! ส่งเตือนภัยฉุกเฉินถึงประชาชนภายในเสี้ยววินาที"
          />
        </div>

        {/* Footer CTA */}
        <div className="my-16 text-center px-6 pb-20 max-w-7xl mx-auto">
          <div className="inline-block p-8 bg-black/40 rounded-xl backdrop-blur-sm border border-neon-green/20">
            <h3 className="text-2xl font-bold mb-3 font-mono text-neon-green uppercase tracking-wider">พร้อมเริ่มต้นหรือยัง?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto font-mono text-sm">
              สัมผัสระบบป้องกันการโกงขับเคลื่อนด้วย AI สำหรับประเทศไทย
            </p>
            <button
              onClick={onLaunchApp}
              className="px-8 py-3 bg-neon-green text-black rounded font-bold text-sm font-mono uppercase tracking-wider hover:shadow-[0_0_20px_rgba(67,255,77,0.5)] transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Zap size={16} /> เปิดแอปเลย
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 hover:border-neon-green/50 transition-all duration-300">
      <div className="mb-3">{icon}</div>
      <h4 className="text-sm font-bold mb-1 font-mono uppercase tracking-wider text-white/90">{title}</h4>
      <p className="text-xs text-gray-500 font-mono">{description}</p>
    </div>
  );
};

const AgentPreview: React.FC<{ 
  name: string; 
  role: string; 
  avatar: string;
  ability: string;
}> = ({ name, role, avatar, ability }) => {
  return (
    <div className="p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 hover:border-neon-green/50 transition-all duration-300 group cursor-pointer">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative flex-shrink-0">
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10">
            <LottieAvatar 
              animationPath={avatar}
              width={64}
              height={64}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm font-mono text-white/90 mb-0.5">{name}</div>
          <div className="text-[10px] text-neon-green font-mono uppercase tracking-wider">{role}</div>
        </div>
      </div>
      <p className="text-xs text-gray-400 font-mono leading-relaxed">{ability}</p>
    </div>
  );
};

export default LandingPage;
