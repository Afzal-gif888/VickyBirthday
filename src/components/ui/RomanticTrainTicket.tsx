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
    if (onAction) {
      onAction();
    }
  };

  // Ticket Data based on variant
  const ticketData = isReturn
    ? {
        badge: 'RETURN JOURNEY PASS • IRCTC #143',
        title: 'THE RETURN EXPRESS TO FOREVER',
        pnr: 'FOREVERWITHVICKY143',
        fromStation: 'Proposal Junction',
        fromPlatform: 'Platform Forever • She Said Always',
        toStation: "Home in Afzal's Arms",
        toPlatform: 'Eternity Central (EC)',
        routeTag: 'DESTINATION: FOREVER TOGETHER',
        coach: 'LOVERS COUPÉ',
        berth: 'HEART 46',
        status: 'ETERNALLY BOOKED',
        validThru: 'Beyond Infinity ❤️',
        quote: '"Every journey begins and ends in your arms, Bujji. Our train never stops loving you."',
        defaultActionText: 'STOP TRAIN 🛑🚆',
        actionColor: 'from-amber-500 via-rose-600 to-burgundy-700',
      }
    : {
        badge: 'SPECIAL LOVERS COUPÉ • IRCTC #143',
        title: 'THE MIDNIGHT EXPRESS TO ETERNITY',
        pnr: 'ITSOURLOVE143',
        fromStation: 'Friendship Junction',
        fromPlatform: 'Platform 1 • First Look',
        toStation: 'Passengers to Soulmates',
        toPlatform: 'Station 01 • Two Travelers on Same Train',
        routeTag: 'NON-STOP • ETERNAL ROUTE',
        coach: 'AC-1 COUPÉ',
        berth: 'BERTH 46',
        status: 'CNF (LIFETIME)',
        validThru: 'Every Lifetime ❤️',
        quote: '"Berths may sway and tracks may turn, but my soul is booked to travel beside yours forever."',
        defaultActionText: 'START TRAIN 🚆💨',
        actionColor: 'from-rose-600 via-rose-500 to-amber-600',
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full max-w-[390px] mx-auto select-none my-3"
    >
      {/* Outer Romantic Starlight Aura */}
      <div
        className={`absolute -inset-1 rounded-3xl blur-md transition-all duration-700 ${
          isReturn
            ? 'bg-gradient-to-r from-amber-500/35 via-rose-600/30 to-purple-700/35'
            : 'bg-gradient-to-r from-rose-500/30 via-amber-500/30 to-burgundy-600/30'
        }`}
      />

      {/* Ticket Container with Perforated Ticket Notches */}
      <div className="relative bg-gradient-to-br from-[#1a0510] via-[#10030a] to-[#070104] border-2 border-amber-400/60 rounded-3xl p-3.5 sm:p-4 shadow-2xl text-left overflow-hidden">
        {/* Ticket Perforated Cutouts on Left and Right */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#07030d] border-r-2 border-amber-400/60 shadow-inner" />
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#07030d] border-l-2 border-amber-400/60 shadow-inner" />

        {/* Vintage Train Ticket Watermark Background */}
        <div className="absolute right-2 bottom-2 text-rose-500/5 pointer-events-none">
          <Train className="w-36 h-36 -rotate-12" />
        </div>

        {/* Ticket Top Header */}
        <div className="flex items-center justify-between border-b border-amber-400/30 pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-400/15 border border-amber-400/40 text-amber-300">
              <Train className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-amber-300/90 tracking-widest uppercase block">
                {ticketData.badge}
              </span>
              <h4 className="font-serif text-xs font-bold text-champagne-100 tracking-wider">
                {ticketData.title}
              </h4>
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono text-[9px] text-rose-300/70 block">PNR NO.</span>
            <span className="font-mono text-xs font-bold text-amber-300">{ticketData.pnr}</span>
          </div>
        </div>

        {/* Station Journey Route */}
        <div className="py-2 my-0.5 flex items-center justify-between relative">
          <div className="text-left max-w-[38%]">
            <span className="font-mono text-[9px] text-rose-300/70 uppercase block">From Station</span>
            <p className="font-serif text-sm font-bold text-rose-100 leading-snug">{ticketData.fromStation}</p>
            <span className="text-[10px] text-champagne-300/80 font-mono block truncate">
              {ticketData.fromPlatform}
            </span>
          </div>

          {/* Route Arrow with Moving Heart Train */}
          <div className="flex-1 flex flex-col items-center px-2">
            <div className="flex items-center gap-1 w-full justify-center">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-amber-400/30 via-rose-400 to-amber-400/30" />
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500 animate-pulse flex-shrink-0" />
              <span className="h-[1px] flex-1 bg-gradient-to-r from-amber-400/30 via-rose-400 to-amber-400/30" />
            </div>
            <span className="text-[8px] font-mono text-amber-300/90 tracking-wider mt-0.5 text-center">
              {ticketData.routeTag}
            </span>
          </div>

          <div className="text-right max-w-[38%]">
            <span className="font-mono text-[9px] text-rose-300/70 uppercase block">To Destination</span>
            <p className="font-serif text-sm font-bold text-rose-100 leading-snug">{ticketData.toStation}</p>
            <span className="text-[10px] text-champagne-300/80 font-mono block truncate">
              {ticketData.toPlatform}
            </span>
          </div>
        </div>

        {/* Ticket Details Grid (Coach, Berth, Status) */}
        <div className="grid grid-cols-3 gap-1.5 py-1.5 px-2.5 rounded-xl bg-black/50 border border-amber-400/20 text-center text-[10px] font-mono shadow-inner">
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
            <span className="text-[9px] font-mono text-rose-300/70 uppercase block">Passenger</span>
            <p className="font-serif font-bold text-rose-100">
              Vicky <span className="text-amber-300 font-script text-sm">(My Bujji)</span> & Afzal
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
