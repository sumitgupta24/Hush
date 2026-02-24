function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`flex animate-pulse ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className={`${index % 2 === 0 ? "msg-bubble-received" : "msg-bubble-sent"} bg-gradient-to-r from-slate-800 to-slate-700 w-32 h-12`}></div>
        </div>
      ))}
    </div>
  );
}
export default MessagesLoadingSkeleton;