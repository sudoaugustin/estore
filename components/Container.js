export default function Container({ className, children }) {
  return (
    <div className={`w-full max-w-screen-xl mx-auto px-4 lg:px-8 ${className}`}>{children}</div>
  );
}
