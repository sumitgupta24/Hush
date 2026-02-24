function BorderAnimation({ children }) {
  return (
    <div className="w-full h-full rounded-2xl border border-slate-700/50 [background:linear-gradient(135deg,rgba(15,23,42,0.5),rgba(30,41,59,0.5))_padding-box,linear-gradient(135deg,rgba(14,165,233,0.3),rgba(139,92,246,0.3))_border-box] flex overflow-hidden shadow-2xl hover:shadow-primary-500/10 transition-shadow duration-300">
      {children}
    </div>
  );
}
export default BorderAnimation;