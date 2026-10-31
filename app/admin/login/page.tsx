'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Lock } from 'lucide-react';
import { adminLogin } from '@/app/actions/admin';
import { LogoMark } from '@/components/site/Logo';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password too short'),
});

type FormValues = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const res = await adminLogin(values);
    setLoading(false);
    if (res.ok) {
      toast.success('Welcome back, editor.');
      router.push('/admin');
      router.refresh();
    } else {
      toast.error(res.error || 'Login failed');
    }
  };

  return (
    <main className="flex min-h-svh items-center justify-center bg-ink px-5">
      <div className="glass w-full max-w-sm rounded-3xl p-8" data-testid="admin-login-card">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <LogoMark className="h-12 w-12" />
          <h1 className="font-syne text-xl font-extrabold uppercase">Edit Bay Access</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Admins only beyond this point</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="admin-login-form" noValidate>
          <div>
            <label htmlFor="al-email" className="fd-label">Email</label>
            <input id="al-email" type="email" data-testid="admin-email-input" className="fd-input" placeholder="editor@factdefiner.in" {...register('email')} />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="al-password" className="fd-label">Password</label>
            <input id="al-password" type="password" data-testid="admin-password-input" className="fd-input" placeholder="••••••••••" {...register('password')} />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit-btn"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-lime py-3.5 font-syne text-sm font-bold uppercase tracking-wider text-ink transition-shadow hover:shadow-[0_0_35px_rgba(198,255,61,0.35)] disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            {loading ? 'Checking credentials…' : 'Enter the edit bay'}
          </button>
        </form>
      </div>
    </main>
  );
}
