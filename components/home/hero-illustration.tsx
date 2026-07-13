'use client';

import { motion } from 'framer-motion';
import { Brain, MessageSquare, Code2, Image, Zap, BarChart3 } from 'lucide-react';

export function HeroIllustration() {
  const floatingIcons = [
    { icon: MessageSquare, className: 'top-[15%] left-[10%]', delay: 0, color: 'text-blue-500' },
    { icon: Code2, className: 'top-[20%] right-[12%]', delay: 0.5, color: 'text-purple-500' },
    { icon: Image, className: 'bottom-[25%] left-[8%]', delay: 1, color: 'text-pink-500' },
    { icon: Zap, className: 'bottom-[18%] right-[10%]', delay: 1.5, color: 'text-amber-500' },
    { icon: BarChart3, className: 'top-[50%] left-[5%]', delay: 0.8, color: 'text-green-500' },
    { icon: Brain, className: 'top-[45%] right-[5%]', delay: 1.2, color: 'text-cyan-500' },
  ];

  return (
    <div className="relative aspect-square w-full max-w-lg mx-auto">
      {/* Glow background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl" />

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 rounded-2xl border border-border bg-card/90 p-6 shadow-card backdrop-blur"
      >
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="ml-2 flex-1 rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">
            aidevinfo.online/dashboard
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-primary/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="h-2.5 w-24 rounded-full bg-foreground/80" />
              <div className="mt-1.5 h-2 w-16 rounded-full bg-muted" />
            </div>
            <div className="h-6 w-12 rounded-full gradient-primary" />
          </div>

          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-3"
            >
              <div className="h-8 w-8 rounded-lg bg-muted" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2 w-20 rounded-full bg-foreground/60" />
                <div className="h-1.5 w-14 rounded-full bg-muted" />
              </div>
              <div className="h-5 w-10 rounded-full bg-primary/20" />
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 flex items-center justify-between rounded-xl gradient-primary p-3 text-white"
        >
          <div>
            <p className="text-xs text-white/70">AI Tools</p>
            <p className="text-lg font-bold">30+</p>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div>
            <p className="text-xs text-white/70">Reviews</p>
            <p className="text-lg font-bold">2.5K+</p>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div>
            <p className="text-xs text-white/70">Articles</p>
            <p className="text-lg font-bold">20+</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute z-20 ${item.className}`}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card shadow-card">
            <item.icon className={`h-6 w-6 ${item.color}`} />
          </div>
        </motion.div>
      ))}

      {/* Floating chart card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -bottom-4 -right-4 z-20 rounded-xl border border-border bg-card p-3 shadow-card"
      >
        <div className="flex items-end gap-1">
          {[40, 65, 50, 80, 60, 90].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}px` }}
              transition={{ delay: 0.7 + i * 0.05, duration: 0.4 }}
              className="w-2.5 rounded-t gradient-primary"
            />
          ))}
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">AI Growth</p>
      </motion.div>
    </div>
  );
}
