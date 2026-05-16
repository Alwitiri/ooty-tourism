export default function Card({ children, className = '', onClick }) {
  return (
    <div className={`card ${className}`} onClick={onClick} role={onClick ? 'button' : undefined}>
      {children}
    </div>
  );
}
