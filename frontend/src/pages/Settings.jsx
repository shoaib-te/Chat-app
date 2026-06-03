import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/Theme.context';

function Settings() {
    const { theme, setTheme } = useContext(ThemeContext); // Access theme context for toggling;
  // Available themes matching the design image grid
  const themes = [
    { name: 'light', colors: ['#4b6bfb', '#7b92b2', '#e5e6e6', '#1f2937'] },
    { name: 'dark', colors: ['#661ae6', '#d926aa', '#1f2937', '#ffffff'] },
    { name: 'cupcake', colors: ['#65c3c8', '#ef9fbc', '#faf7f5', '#291334'] },
    { name: 'bumblebee', colors: ['#e0a82e', '#f9d72f', '#181818', '#181818'] },
    { name: 'emerald', colors: ['#66cc8a', '#377cfb', '#f9fafb', '#333c4d'] },
    { name: 'corporate', colors: ['#4b6bfb', '#7b92b2', '#ffffff', '#1f2937'] },
    { name: 'synthwave', colors: ['#e779c1', '#58c7fa', '#2d1b4e', '#fcd34d'] },
    { name: 'retro', colors: ['#ef9995', '#a4cbb7', '#ece3ca', '#2e282a'] },
    { name: 'cyberpunk', colors: ['#ff007f', '#00ff00', '#ffee00', '#000000'] },
    { name: 'valentine', colors: ['#e96d7b', '#a991f7', '#fae7cb', '#ffee00'] },
    { name: 'halloween', colors: ['#f28c18', '#6d3a9c', '#212121', '#ffffff'] },
    { name: 'garden', colors: ['#5c7f67', '#ecf4e7', '#f4fbf1', '#2f3437'] },
    { name: 'forest', colors: ['#1eb854', '#171212', '#171212', '#ffffff'] },
    { name: 'aqua', colors: ['#09ecf3', '#966fb3', '#205072', '#ffffff'] },
    { name: 'lofi', colors: ['#0d0d0d', '#ffffff', '#ffffff', '#000000'] },
    { name: 'pastel', colors: ['#d1c1d7', '#f6cbd1', '#ffffff', '#b9ffb3'] },
    { name: 'fantasy', colors: ['#6e0b75', '#007300', '#ffffff', '#1f2937'] },
    { name: 'wireframe', colors: ['#000000', '#ffffff', '#ffffff', '#000000'] },
    { name: 'black', colors: ['#000000', '#1a1a1a', '#000000', '#ffffff'] },
    { name: 'luxury', colors: ['#ffffff', '#151515', '#09090b', '#fde047'] },
    { name: 'dracula', colors: ['#ff79c6', '#8be9fd', '#282a36', '#f8f8f2'] },
    { name: 'cmyk', colors: ['#45aeee', '#e8488a', '#ffffff', '#1a1a1a'] },
    { name: 'autumn', colors: ['#8c0327', '#d85218', '#f1f1f1', '#212121'] },
    { name: 'business', colors: ['#1c4e80', '#7c90a2', '#20252e', '#ffffff'] },
    { name: 'acid', colors: ['#ff00ff', '#00ff00', '#ffffff', '#000000'] },
    { name: 'lemonade', colors: ['#519903', '#e9e92e', '#f4f4f4', '#222222'] },
    { name: 'night', colors: ['#38bdf8', '#818cf8', '#0f172a', '#f8fafc'] },
    { name: 'coffee', colors: ['#dc944c', '#263238', '#20161f', '#ffffff'] },
    { name: 'winter', colors: ['#047aff', '#463aa1', '#ffffff', '#1f2937'] },
    { name: 'dim', colors: ['#93c5fd', '#38bdf8', '#2a303c', '#e5e7eb'] },
    { name: 'nord', colors: ['#88c0d0', '#5e81ac', '#eceff4', '#2e3440'] },
    { name: 'sunset', colors: ['#ff7e5f', '#feb47b', '#2b2d42', '#ffffff'] },
  ];

  // Set the default active theme
  ;

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-base-content bg-base-100 min-h-screen">
      {/* Theme Section Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold">Theme</h2>
        <p className="text-sm text-gray-500">Choose a theme for your chat interface</p>
      </div>

      {/* Responsive Theme Color Swatches Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-10">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all border ${
            theme === t.name 
                ? 'border-primary bg-gray-100/80 shadow-md scale-105' 
                : 'border-transparent hover:bg-gray-50'
            }`}
          >
            {/* Color Blocks Combination Badge */}
            <div className="grid grid-cols-4 w-full h-10 rounded-lg overflow-hidden shadow-inner border border-black/5">
              <span style={{ backgroundColor: t.colors[0] }} className="h-full w-full"></span>
              <span style={{ backgroundColor: t.colors[1] }} className="h-full w-full"></span>
              <span style={{ backgroundColor: t.colors[2] }} className="h-full w-full"></span>
              <span style={{ backgroundColor: t.colors[3] }} className="h-full w-full"></span>
            </div>
            {/* Theme Text Title */}
            <span className="text-xs font-semibold mt-1.5 capitalize">{t.name}</span>
          </button>
        ))}
      </div>

      {/* Live Interface Preview Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Preview</h2>
        
        {/* Outer Presentation Canvas wrapper container */}
        <div className="bg-gray-200 rounded-2xl p-10 flex justify-center items-center shadow-inner min-h-[400px]">
          {/* Mock App Interface Box linked to selected global daisyUI data-theme trait config */}
          <div data-theme={theme} className="bg-base-100 text-base-content w-full max-w-xl rounded-xl p-6 shadow-xl border border-black/5 transition-all duration-300">
            
            {/* Chat Target Profile Header Status Bar Row */}
            <div className="flex items-center gap-3 border-b border-base-200 pb-4 mb-4">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-10">
                  <span className="text-sm font-semibold">J</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold leading-none">John Doe</h4>
                <span className="text-xs text-gray-400 font-medium">Online</span>
              </div>
            </div>

            {/* Simulated Chat Bubble Thread List Screen */}
            <div className="space-y-4 mb-6">
              {/* Message Left Start Column */}
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-neutral max-w-[85%] text-sm rounded-2xl">
                  Hey! How's it going?
                  <div className="text-[10px] opacity-40 mt-1 text-right">12:00 PM</div>
                </div>
              </div>

              {/* Message Right End Column */}
              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary max-w-[85%] text-sm rounded-2xl">
                  I'm doing great! Just working on some new features.
                  <div className="text-[10px] opacity-70 mt-1 text-right">12:01 PM</div>
                </div>
              </div>
            </div>

            {/* Mock Bottom Form Action Field Box Row */}
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="This is a preview" 
                disabled
                className="input input-bordered flex-1 text-sm bg-base-100 border-gray-300 rounded-lg h-10 px-3 cursor-not-allowed"
              />
              <button disabled className="btn btn-primary min-h-0 h-10 w-10 p-0 flex items-center justify-center rounded-lg cursor-not-allowed">
                <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 transform rotate-45 -translate-x-0.5 translate-y-0.5">
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
