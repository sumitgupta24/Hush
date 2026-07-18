function BorderAnimation({ children }) {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.9),rgba(2,6,23,0.88))] shadow-[0_30px_90px_-35px_rgba(14,165,233,0.55)] transition-all duration-300 hover:shadow-[0_35px_110px_-30px_rgba(14,165,233,0.6)]">
      {children}
    </div>
  );
}

export default BorderAnimation;