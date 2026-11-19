import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Train, Heart, CheckCircle2, Ticket, Play, OctagonAlert } from 'lucide-react';
import { romanticAudio } from '../../utils/audioManager';

export interface RomanticTrainTicketProps {
  variant?: 'outbound' | 'return';
  onPunch?: () => void;
  onAction?: () => void;
  isMoving?: boolean;
  actionButtonText?: string;
  hideActionButton?: boolean;
}

export const RomanticTrainTicket: React.FC<RomanticTrainTicketProps> = ({
  variant = 'outbound',
  onPunch,
  onAction,
  isMoving = false,
  actionButtonText,
  hideActionButton = false,
}) => {
  const [isPunched, setIsPunched] = useState(false);
  const isReturn = variant === 'return';

  const handlePunch = () => {
    if (!isPunched) {
      setIsPunched(true);
      romanticAudio.playCelebrationSound();
      if (onPunch) onPunch();
    }
  };

  const handleActionClick = () => {
    if (isReturn) {
      romanticAudio.playTrainStop();
    } else {
      romanticAudio.playTrainWhistle();
    }
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([60, 40, 100]);
      } catch {}
    }
    if (onAction) {
      onAction();
    }
  };

  // Ticket Data based on variant
  const ticketData = isReturn
    ? {
        badge: 'RETURN JOURNEY PASS • 20 NOV 2005',
        title: 'THE RETURN EXPRESS TO FOREVER',
        pnr: 'FOREVERWITHVICKY143',
        fromStation: 'Proposal Junction',
        fromPlatform: 'Platform Forever • She Said Always',
        toStation: "Home in Bava's Arms",
        toPlatform: 'Eternity Central (EC)',
        routeTag: 'DESTINATION: FOREVER TOGETHER',
        coach: 'LOVERS COUPÉ',
        berth: 'HEART 46',
        status: 'ETERNALLY BOOKED',
        validThru: '20 NOV 2005 → INFINITY ❤️',
        quote: '"Every journey begins and ends in your arms, Bujji. Your Bava will never stop loving you."',
        defaultActionText: 'STOP TRAIN 🛑🚆',
        actionColor: 'from-amber-500 via-rose-600 to-burgundy-700',
      }
    : {
        badge: 'SPECIAL LOVERS COUPÉ • 20 NOV 2005',
        title: 'THE MIDNIGHT EXPRESS TO ETERNITY',
        pnr: 'ITSOURLOVE143',
        fromStation: 'Friendship Junction',
        fromPlatform: 'Platform 1 • First Look',
        toStation: 'Passengers to Soulmates',
        toPlatform: 'Station 01 • Two Travelers on Same Train',
        routeTag: 'BORN 20 NOV 2005 • ANGEL EXPRESS',
        coach: 'AC-1 COUPÉ',
        berth: 'BERTH 46',
        status: 'CNF (LIFETIME)',
        validThru: '20 NOV 2005 → FOREVER ❤️',
        quote: '"Berths may sway and tracks may turn, but my soul is booked to travel beside yours forever."',
        defaultActionText: 'START TRAIN 🚆💨',
        actionColor: 'from-rose-600 via-rose-500 to-amber-600',
      };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full relative mx-auto select-none"
    >
      {/* Golden/Rose Outer Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/40 via-rose-500/40 to-amber-300/40 rounded-3xl blur-sm" />

      {/* Ticket Container */}
      <div className="relative bg-gradient-to-b from-[#18050e] via-[#0f0208] to-[#080104] border-2 border-amber-300/70 rounded-3xl p-3 sm:p-4 text-left shadow-2xl overflow-hidden">
        
        {/* Ticket Header & Watermark */}
        <div className="flex items-center justify-between border-b border-amber-400/30 pb-2">
          <div className="flex items-center gap-1.5">
            <Train className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-amber-300 uppercase">
              {ticketData.badge}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <Heart className="w-2.5 h-2.5 fill-emerald-400" />
            <span>CONFIRMED</span>
          </div>
        </div>

        {/* Train Title & PNR Bar */}
        <div className="pt-2 pb-1.5 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-sm sm:text-base font-bold bg-gradient-to-r from-amber-200 via-rose-100 to-amber-100 bg-clip-text text-transparent">
              {ticketData.title}
            </h3>
            <span className="text-[9px] font-mono text-rose-300/80 tracking-wider">
              {ticketData.routeTag}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8px] font-mono text-amber-300/60 uppercase block">PNR Number</span>
            <span className="font-mono font-bold text-xs text-amber-300 tracking-widest">
              {ticketData.pnr}
            </span>
          </div>
        </div>

        {/* Route Details Box */}
        <div className="my-2 p-2.5 rounded-2xl bg-black/60 border border-rose-500/25 grid grid-cols-2 gap-2 relative">
          {/* Origin */}
          <div className="space-y-0.5">
            <span className="text-[8px] font-mono uppercase text-amber-400/80 tracking-wider block">From Station</span>
            <p className="font-serif text-xs font-bold text-rose-100 leading-tight">
              {ticketData.fromStation}
            </p>
            <p className="font-mono text-[9px] text-rose-300/60">
              {ticketData.fromPlatform}
            </p>
          </div>

          {/* Destination */}
          <div className="space-y-0.5 text-right border-l border-rose-500/20 pl-2">
            <span className="text-[8px] font-mono uppercase text-amber-400/80 tracking-wider block">Destination</span>
            <p className="font-serif text-xs font-bold text-amber-200 leading-tight">
              {ticketData.toStation}
            </p>
            <p className="font-mono text-[9px] text-amber-300/70">
              {ticketData.toPlatform}
            </p>
          </div>
        </div>

        {/* Coach, Berth & Passenger Information */}
        <div className="grid grid-cols-3 gap-1.5 py-1 px-2 rounded-xl bg-rose-950/30 border border-rose-500/20 text-center font-mono">
          <div>
            <span className="text-rose-300/60 block text-[8px] uppercase">Coach</span>
            <span className="text-amber-200 font-bold text-xs">{ticketData.coach}</span>
          </div>
          <div className="border-x border-amber-400/20 px-1">
            <span className="text-rose-300/60 block text-[8px] uppercase">Berth</span>
            <span className="text-rose-200 font-bold text-xs">{ticketData.berth}</span>
          </div>
          <div>
            <span className="text-rose-300/60 block text-[8px] uppercase">Status</span>
            <span className="text-emerald-400 font-bold text-xs">{ticketData.status}</span>
          </div>
        </div>

        {/* Passenger Info */}
        <div className="pt-2 pb-1.5 flex items-center justify-between text-xs">
          <div>
            <span className="text-[9px] font-mono text-rose-300/70 uppercase block">Passengers</span>
            <p className="font-serif font-bold text-rose-100">
              Vicky <span className="text-amber-300 font-script text-sm">(Bujji)</span> & Afzal <span className="text-rose-300 font-script text-sm">(Bava)</span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-mono text-rose-300/70 uppercase block">Validity</span>
            <span className="font-serif text-xs text-amber-200 font-semibold">{ticketData.validThru}</span>
          </div>
        </div>

        {/* Dashed Perforated Tear Line */}
        <div className="my-2 border-b border-dashed border-amber-400/35 relative" />

        {/* Romantic Train Quote & Interactive Stamp */}
        <div className="pt-1 flex items-center justify-between gap-3">
          <p className="font-cormorant italic text-xs text-rose-200/90 leading-tight">
            {ticketData.quote}
          </p>

          <button
            onClick={handlePunch}
            disabled={isPunched}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 border shadow-md active:scale-95 ${
              isPunched
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                : 'bg-gradient-to-r from-amber-500 via-rose-500 to-burgundy-600 border-amber-300 text-white cursor-pointer hover:scale-105'
            }`}
          >
            {isPunched ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>PUNCHED ❤️</span>
              </>
            ) : (
              <>
                <Ticket className="w-3 h-3 text-amber-200" />
                <span>PUNCH PASS</span>
              </>
            )}
          </button>
        </div>

        {/* PROMINENT TICKET ACTION BUTTON (START TRAIN / STOP TRAIN) */}
        {!hideActionButton && onAction && (
          <div className="mt-2.5 pt-2 border-t border-amber-400/30">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleActionClick}
              disabled={isMoving}
              className={`w-full py-3.5 px-5 rounded-full bg-gradient-to-r ${ticketData.actionColor} text-white font-serif text-sm font-bold tracking-wider shadow-2xl flex items-center justify-center gap-2.5 border-2 border-amber-300/80 cursor-pointer ${
                isMoving ? 'opacity-80 cursor-wait animate-pulse' : 'hover:border-amber-200'
              }`}
            >
              {isReturn ? (
                <>
                  <OctagonAlert className="w-4 h-4 text-amber-200 animate-pulse" />
                  <span className="drop-shadow-md">
                    {actionButtonText || ticketData.defaultActionText}
                  </span>
                  <Train className="w-4 h-4 text-amber-200" />
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-amber-200 fill-amber-200 animate-pulse" />
                  <span className="drop-shadow-md">
                    {actionButtonText || (isMoving ? 'TRAIN IN MOTION 🚆💨' : ticketData.defaultActionText)}
                  </span>
                  <Train className="w-4 h-4 text-amber-200" />
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
