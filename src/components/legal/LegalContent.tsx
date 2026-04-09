'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LegalSection {
  title?: string;
  content: string | React.ReactNode;
}

interface LegalContentProps {
  title: string;
  lastUpdated?: string;
  sections: LegalSection[];
}

export function LegalContent({ title, lastUpdated, sections }: LegalContentProps) {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      {/* Header */}
      <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-100 rounded-b-[4rem] px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-neutral-800 mb-6 tracking-tighter">
              {title}
            </h1>
            {lastUpdated && (
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                Última actualización: {lastUpdated}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-slate prose-lg max-w-none">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="mb-12"
              >
                {section.title && (
                  <h2 className="text-2xl font-black text-neutral-800 mb-6 tracking-tight flex items-center gap-4">
                    <span className="flex-none w-8 h-8 rounded-full bg-[#0127AC]/10 text-[#0127AC] flex items-center justify-center text-xs font-black">
                      {index + 1}
                    </span>
                    {section.title}
                  </h2>
                )}
                <div className="text-neutral-600 font-medium leading-relaxed space-y-4">
                  {typeof section.content === 'string' ? (
                    <p>{section.content}</p>
                  ) : (
                    section.content
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


