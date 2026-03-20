'use client';

import { useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { portfolioData } from '@/lib/data';

// Ikon Kaggle kustom (SVG)
const KaggleIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336z" />
  </svg>
);

const ContactSection = () => {
  const { contact } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail': return <Mail size={24} />;
      case 'linkedin': return <Linkedin size={24} />;
      case 'github': return <Github size={24} />;
      case 'kaggle': return <KaggleIcon size={24} />;
      default: return <Mail size={24} />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Mengambil ID dari environment variable
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

      if (!formId || formId === 'Place_Your_Formspree_ID_Here') {
        alert('Formspree ID belum disetting di .env.local');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
        return;
      }

      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-plum mb-4">
            {contact.heading}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {contact.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Kolom Kiri - Link Kontak */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contact.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target={link.type !== 'EMAIL' ? '_blank' : undefined}
                  rel={link.type !== 'EMAIL' ? 'noopener noreferrer' : undefined}
                  className="
                    flex items-center gap-6 p-6 bg-white rounded-2xl
                    transition-all duration-300
                    hover:shadow-lg hover:scale-105
                    group
                  "
                >
                  {/* Lingkaran Ikon */}
                  <div className="
                    w-16 h-16 bg-gray-100 rounded-full
                    flex items-center justify-center
                    transition-all duration-300
                    group-hover:bg-soft-sage group-hover:scale-110
                  ">
                    <div className="text-deep-plum">
                      {getIcon(link.icon)}
                    </div>
                  </div>

                  {/* Teks */}
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      {link.type}
                    </div>
                    <div className="text-deep-plum font-medium">
                      {link.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Kolom Kanan - Form Kontak */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-playfair font-bold text-deep-plum mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Field Nama */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="
                    w-full px-4 py-3 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-soft-sage focus:border-transparent
                    transition-all duration-300
                  "
                />
              </div>

              {/* Field Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="
                    w-full px-4 py-3 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-soft-sage focus:border-transparent
                    transition-all duration-300
                  "
                />
              </div>

              {/* Field Pesan */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="
                    w-full px-4 py-3 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-soft-sage focus:border-transparent
                    transition-all duration-300
                    resize-none
                  "
                ></textarea>
              </div>

              {/* Tombol Kirim */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`
                  w-full py-4 rounded-lg font-medium
                  flex items-center justify-center gap-2
                  transition-all duration-300
                  ${status === 'success'
                    ? 'bg-green-500 text-white'
                    : status === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-soft-sage text-deep-plum hover:bg-soft-sage/80 hover:scale-105'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {status === 'sending' && 'Sending...'}
                {status === 'success' && '✓ Message Sent!'}
                {status === 'error' && '✗ Failed to Send'}
                {status === 'idle' && (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Pesan Status */}
            {status === 'success' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  Thank you for your message! I&apos;ll get back to you soon.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                  Something went wrong. Please try again or email me directly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
