/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Clock, 
  Utensils, 
  Bed, 
  Camera, 
  ChevronRight, 
  Calendar,
  Info,
  Moon,
  Sun,
  Navigation
} from 'lucide-react';

interface ItineraryItem {
  time: string;
  title: string;
  location: string;
  description: string[];
  image?: string;
  type: 'spot' | 'food' | 'hotel' | 'activity';
  mapUrl?: string;
}

const ITINERARY_DAY_1: ItineraryItem[] = [
  {
    time: "09:00",
    title: "台北歡樂啟程",
    location: "台北出發",
    description: ["準時集合，開啟兩天一夜的文創之旅。"],
    type: 'activity'
  },
  {
    time: "10:30",
    title: "橫山書法藝術館",
    location: "桃園市大園區",
    image: "https://bobowin.blog/wp-content/uploads/2022/10/2022102223252_92.jpg",
    mapUrl: "https://www.google.com/maps?cid=2391335439603441517",
    description: [
      "自然硯台：建築以硯台與墨池為靈感，清水模結構與陽光下的水岸相映成趣。",
      "全齡友善：廣闊平坦的無障礙園區，極適合長輩緩步慢走。",
      "幾何光影：簡約的線條與大面玻璃，是捕捉現代藝術感的絕佳場域。"
    ],
    type: 'spot'
  },
  {
    time: "12:30",
    title: "癮食聖堂 Poppy Church",
    location: "忠貞新村",
    image: "https://albertblog.tw/wp-content/uploads/2021/03/popchu_2116.jpg",
    mapUrl: "https://www.google.com/maps?cid=3805795627269057874",
    description: [
      "舊教堂的食光記憶：由具歷史意義的老教堂改建而成的質感空間。",
      "驚豔味蕾：推薦焗烤千層米干、雲南破酥包。",
      "跨界融合：將傳統雲南風味注入西式創意。"
    ],
    type: 'food'
  },
  {
    time: "14:30",
    title: "中原文創園區",
    location: "中壢區",
    image: "https://image-cdn.learnin.tw/bnextmedia/image/album/2023-09/img-1693904944-94507.jpg?w=600&output=webp",
    mapUrl: "https://www.google.com/maps?cid=8286671055631175994",
    description: [
      "歲月痕跡：園區保留了昔日軍事倉庫的獨特風貌與開闊感。",
      "青春活力：匯聚各類獨立展覽與手作市集，充滿文藝氣息。",
      "街頭藝廊：隨處可見的現代彩繪與綠地。"
    ],
    type: 'spot'
  },
  {
    time: "16:30",
    title: "福容徠旅 中壢 (Fullon Poshtel)",
    location: "中壢市中心",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/658026264.jpg?k=a947fc1d109b4c0da788c28f00058acc8ad138a57390e8d5176f594c301ca796&o=",
    mapUrl: "https://www.google.com/maps?cid=10748337235041074135",
    description: [
      "城市綠洲：以環保永續為理念，溫潤明亮的木質調設計。",
      "家庭專屬：寬敞舒適的家庭房型，讓三代同堂徹底放鬆。",
      "便利機能：坐落於市中心，步行即達商圈與老街溪步道。"
    ],
    type: 'hotel'
  },
  {
    time: "18:30",
    title: "禪園人文花園餐廳",
    location: "鄰近飯店",
    image: "https://wendychangblog.com/wp-content/uploads/2025/08/20251001-3ts1x.jpg",
    mapUrl: "https://www.google.com/maps?cid=17095210066861762881",
    description: [
      "百年紅磚的歲月靜好：隱身市區的百年老建築，內部挑高木造結構。",
      "溫潤佳餚：提供精緻的客家與江浙中式合菜，口味溫和地道。"
    ],
    type: 'food'
  },
  {
    time: "20:00",
    title: "夜遊老街溪水岸綠廊",
    location: "老街溪畔",
    image: "https://travel.tycg.gov.tw/Image/110294/?r=1751266381682",
    mapUrl: "https://www.google.com/maps?cid=11684190502039131310",
    description: [
      "晚餐後順著老街溪畔漫步，平緩完善的步道點綴著浪漫的夜間光雕。",
      "迎著晚風，聽著潺潺流水，是全家人消食聊天的最美時光。"
    ],
    type: 'activity'
  }
];

const ITINERARY_DAY_2: ItineraryItem[] = [
  {
    time: "09:30",
    title: "中平路故事館 & 壢小故事森林",
    location: "中壢區",
    image: "https://cdn.walkerland.com.tw/images/upload/poi/p93822/m101136/949a33cb62d43440f1d8e7c49e8d5176f594c301ca796&o=",
    mapUrl: "https://www.google.com/maps?cid=13018544495231455692",
    description: [
      "中平路故事館：建於 1930 年代的日式雙拼建築，充滿懷舊記憶。",
      "壢小故事森林：昔日的日治時期校長宿舍群，在陽光下擁有充滿綠意的戶外庭園。"
    ],
    type: 'spot'
  },
  {
    time: "12:00",
    title: "食光手札 | 午餐嚴選",
    location: "桃園區",
    description: [
      "首選：島國洋食 (精緻日系洋食)",
      "備案一：Thai Wonderful 蒔泰 (質感南洋風)",
      "備案二：灶腳小館 (傳統中菜老店)"
    ],
    type: 'food'
  },
  {
    time: "14:30",
    title: "大有梯田生態公園",
    location: "桃園區",
    image: "https://travel.tycg.gov.tw/content/images/attractions/65201/1024x768_attractions-image-68dgv12rh0yua30mseeuka.jpg",
    mapUrl: "https://www.google.com/maps?cid=10868831929732677015",
    description: [
      "農村地景：全台首座結合水稻梯田風貌的生態公園。",
      "活力放電：專屬的森林遊戲區與極具挑戰的體能關卡。",
      "悠閒漫步：長輩可漫步於綠色梯田與景觀橋。"
    ],
    type: 'spot'
  },
  {
    time: "16:30",
    title: "平安賦歸",
    location: "返回台北",
    description: ["帶著滿滿的回憶與照片，結束愉快的桃園文創之旅。"],
    type: 'activity'
  }
];

export default function App() {
  const [activeDay, setActiveDay] = useState(1);

  const currentItinerary = activeDay === 1 ? ITINERARY_DAY_1 : ITINERARY_DAY_2;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <header className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://bobowin.blog/wp-content/uploads/2022/10/2022102223252_92.jpg" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-40 scale-110 blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-warm/20 to-brand-warm"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-brand-orange font-medium tracking-[0.2em] text-sm uppercase mb-2 block">
            2026.02.21 - 02.22
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-brand-ink mb-4 leading-tight">
            桃園中壢文創之旅
          </h1>
          <div className="w-12 h-[1px] bg-brand-orange mx-auto mb-4"></div>
          <p className="serif italic text-lg text-brand-ink/70">
            漫步藝文 | 歡樂滿載的家庭時光
          </p>
        </motion.div>
      </header>

      {/* Day Selector */}
      <div className="sticky top-0 z-30 bg-brand-warm/80 backdrop-blur-lg border-b border-brand-ink/5 py-4">
        <div className="flex justify-center gap-4 px-6 max-w-md mx-auto">
          {[1, 2].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                activeDay === day 
                  ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' 
                  : 'bg-white text-brand-ink/60 border border-brand-ink/5'
              }`}
            >
              DAY {day === 1 ? '01' : '02'}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <main className="max-w-2xl mx-auto px-6 pt-8">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-brand-ink/10 z-0"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {currentItinerary.map((item, index) => (
                <div key={index} className="relative pl-10">
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    item.type === 'food' ? 'bg-brand-orange/10 text-brand-orange' :
                    item.type === 'hotel' ? 'bg-brand-accent/10 text-brand-accent' :
                    'bg-brand-ink/5 text-brand-ink/60'
                  }`}>
                    {item.type === 'food' ? <Utensils size={14} /> :
                     item.type === 'hotel' ? <Bed size={14} /> :
                     item.type === 'spot' ? <MapPin size={14} /> :
                     <Clock size={14} />}
                  </div>

                  {/* Time & Title */}
                  <div className="mb-4">
                    <span className="text-xs font-mono font-medium text-brand-ink/40 tracking-wider">
                      {item.time}
                    </span>
                    <h3 className="text-xl font-bold text-brand-ink mt-1 flex items-center gap-2">
                      {item.title}
                      {item.type === 'food' && <span className="text-[10px] bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full font-sans font-normal">嚴選美食</span>}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-brand-ink/50 mt-1">
                      <Navigation size={10} />
                      {item.location}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="glass-card rounded-2xl overflow-hidden">
                    {item.image && (
                      <div className="aspect-[16/9] w-full overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="p-5 space-y-3">
                      {item.description.map((desc, i) => (
                        <p key={i} className="text-sm text-brand-ink/70 leading-relaxed flex gap-2">
                          <span className="text-brand-orange mt-1">•</span>
                          {desc}
                        </p>
                      ))}
                      
                      {item.mapUrl && (
                        <div className="pt-4">
                          <a 
                            href={item.mapUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-brand-orange/90 transition-all active:scale-95"
                          >
                            <Navigation size={14} />
                            導航請按這
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 px-6 py-12 text-center border-t border-brand-ink/5">
        <div className="serif italic text-2xl text-brand-ink/80 mb-4">
          期待歡樂啟程
        </div>
        <p className="text-sm text-brand-ink/50 max-w-xs mx-auto">
          祝全家桃園文創之旅平安順心，收穫滿滿的歡笑與美好回憶。
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <div className="w-8 h-8 rounded-full bg-brand-ink/5 flex items-center justify-center text-brand-ink/30">
            <Calendar size={16} />
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-ink/5 flex items-center justify-center text-brand-ink/30">
            <Info size={16} />
          </div>
        </div>
      </footer>

      {/* Bottom Navigation (Mobile Only) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
        <div className="bg-brand-ink text-white rounded-full py-3 px-8 flex items-center justify-between shadow-2xl shadow-brand-ink/40">
          <div className="flex flex-col">
            <span className="text-[10px] opacity-50 uppercase tracking-widest">Current View</span>
            <span className="text-xs font-medium">Day {activeDay === 1 ? '01: 藝文漫步' : '02: 懷舊生態'}</span>
          </div>
          <button 
            onClick={() => setActiveDay(activeDay === 1 ? 2 : 1)}
            className="flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-white/20 py-2 px-4 rounded-full transition-colors"
          >
            Switch Day <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
