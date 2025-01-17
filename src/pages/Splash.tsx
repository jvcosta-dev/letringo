function Splash() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-primary">
      <img
        src="/icons/splash.png"
        alt="letringo logo"
        width={252}
        height={252}
        className={`w-64 h-64 animate-bounce`}
      />
    </div>
  );
}

export default Splash;
