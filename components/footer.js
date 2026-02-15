import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#120024] border-t border-purple-800 mt-24 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid gap-10 md:grid-cols-4">

        
          <div>
            <h3 className="text-xl font-semibold text-purple-400">
              ThinkRush
            </h3>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              ThinkRush is an AI-powered gamified quiz platform that adapts
              to your learning pace, rewards performance with XP, and delivers
              intelligent insights to improve continuously.
            </p>
          </div>

          
          <div>
            <h4 className="text-sm font-semibold text-purple-300 uppercase">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="hover:text-purple-400">Home</Link></li>
              <li><Link href="/profile" className="hover:text-purple-400">Profile</Link></li>
              <li><Link href="/dashboard" className="hover:text-purple-400">Dashboard</Link></li>
            </ul>
          </div>

        
          <div>
            <h4 className="text-sm font-semibold text-purple-300 uppercase">
              Contact
            </h4>
            <p className="mt-4 text-sm text-gray-400">thinkrush@gmail.com</p>
            <p className="mt-2 text-sm text-gray-400">@thinkrush.ai</p>
          </div>

          
          <div>
            <h4 className="text-sm font-semibold text-purple-300 uppercase">
              Authors
            </h4>
            <p className="mt-4 text-sm text-gray-400">Prajna</p>
            <p className="text-sm text-gray-400">Pratheeksha</p>
            <p className="text-sm text-gray-400">Manushri</p>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-purple-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ThinkRush. All rights reserved.
        </div>

      </div>
    </footer>
  );
}