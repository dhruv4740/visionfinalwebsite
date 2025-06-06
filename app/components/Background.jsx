export default function Background() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/images/background.jpg')"
        }}
      ></div>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );
}