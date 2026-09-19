import { useState } from 'react';
import { Send } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validate = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you! You are subscribed to DigitX Pro updates.');
      setEmail('');
    }, 900);
  };

  return (
    <section className="bg-[#1a1a1a] py-[4.5rem]">
      <div className="container mx-auto px-[1.5rem]">
        <div className="mx-auto max-w-[620px] text-center">
          <h2 className="mb-[1rem] text-[2.6rem] font-bold text-white">Stay in the loop</h2>
          <p className="mb-[2rem] text-[1.45rem] text-white/70">
            Get DigitX Pro offers, new launches and gadget tips in your inbox.
          </p>

          {status === 'success' ? (
            <div className="rounded-[16px] bg-primary p-[2rem] text-white">
              <p className="text-[1.5rem] font-semibold">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[0.8rem] sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                aria-label="Email address"
                className={`flex-1 rounded-full border border-white/20 bg-white px-[1.6rem] py-[1.1rem] text-[1.4rem] text-[#1a1a1a] outline-none transition-colors focus:border-primary ${
                  status === 'error' ? 'border-red-500' : ''
                }`}
              />
              <button type="submit" disabled={status === 'loading'} className="btn-primary" aria-label="Subscribe">
                {status === 'loading' ? (
                  'Sending…'
                ) : (
                  <>
                    <Send size={18} />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>
          )}

          {status === 'error' && message && (
            <p className="mt-[0.6rem] text-[1.2rem] text-[#ffb4b4]">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
