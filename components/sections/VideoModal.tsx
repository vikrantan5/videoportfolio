'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Youtube, Wrench, User } from 'lucide-react';
import type { Project } from '@/types/database';

export function VideoModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          data-testid="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="glass w-full max-w-4xl overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${project.youtube_id}?autoplay=1&rel=0`}
                className="h-full w-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title={project.title}
              />
            </div>
            <div className="flex items-start justify-between gap-4 p-6">
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-lime">{project.category}</p>
                <h3 className="font-syne text-xl font-bold sm:text-2xl">{project.title}</h3>
                {project.description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">{project.description}</p>}
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
                  {project.client_name && (
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-lime" /> {project.client_name}
                    </span>
                  )}
                  {project.tools && project.tools.length > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Wrench className="h-3.5 w-3.5 text-lime" /> {project.tools.join(' · ')}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close video"
                data-testid="video-modal-close-btn"
                className="rounded-full border border-white/10 p-2.5 text-zinc-400 transition-colors hover:border-lime/50 hover:text-lime"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
