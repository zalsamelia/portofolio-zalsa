'use client';

import { Mail, Linkedin, Github, Heart } from 'lucide-react';
import { portfolioData } from '@/lib/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { hero, contact } = portfolioData;

  // Helper to find link by type
  const getLink = (type: string) => contact.links.find(link => link.type === type)?.url || '#';

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-playfair font-bold text-deep-plum mb-2">
              Zalsa.
            </h3>
            <p className="text-gray-600">
              Data Analyst & Business Intelligence Specialist
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-deep-plum mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-deep-plum transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-deep-plum mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href={getLink('EMAIL')}
                className="
                  w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center
                  text-deep-plum transition-all duration-300
                  hover:bg-soft-sage hover:scale-110
                "
              >
                <Mail size={20} />
              </a>
              <a
                href={getLink('LINKEDIN')}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center
                  text-deep-plum transition-all duration-300
                  hover:bg-soft-sage hover:scale-110
                "
              >
                <Linkedin size={20} />
              </a>
              <a
                href={getLink('GITHUB')}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center
                  text-deep-plum transition-all duration-300
                  hover:bg-soft-sage hover:scale-110
                "
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-100">
          <p className="text-center text-gray-600 flex items-center justify-center gap-2">
            Made with <Heart size={16} className="text-muted-rose fill-muted-rose" /> © {currentYear} {hero.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
