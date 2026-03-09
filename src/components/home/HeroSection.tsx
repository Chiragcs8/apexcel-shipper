"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import { FaArrowRight, FaXmark } from "react-icons/fa6";
import { MessageSquareText, Eye, EyeOff, PhoneCall } from "lucide-react";

type UserTab = "shipper" | "trucker";
type OtpChannel = "EMAIL" | "SMS" | "WHATSAPP";

export default function HeroSection() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<UserTab>("shipper");
  const [mobile, setMobile] = useState("");
  
  // Auth States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Split OTP State
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Modals & Loaders
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  // Security & Locks
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // OTP Channels
  const [currentChannel, setCurrentChannel] = useState<OtpChannel>("EMAIL");
  const [usedChannels, setUsedChannels] = useState<OtpChannel[]>(["EMAIL"]); 
  
  const [otpMessage, setOtpMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(60);

  const cleanedMobile = useMemo(() => mobile.replace(/\D/g, "").slice(0, 10), [mobile]);
  const canContinue = cleanedMobile.length === 10;
  const combinedOtp = otpValues.join("");

  // 1. Auto-close Modal after 3 minutes (180,000 ms) & Prevent bg scroll
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showAdminLoginModal || showOtpModal) {
      document.body.style.overflow = 'hidden';
      // Auto close after 3 mins
      timeoutId = setTimeout(() => {
        closeAllModals();
      }, 3 * 60 * 1000); 
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showAdminLoginModal, showOtpModal]);

  const resetMessages = () => {
    setErrorMessage("");
    setOtpMessage("");
  };

  const startCountdown = (seconds = 60) => {
    setCountdown(seconds);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // OTP Input Handlers
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const newOtp = [...otpValues];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtpValues(newOtp);
      const focusIndex = Math.min(pastedData.length, 5);
      otpRefs.current[focusIndex]?.focus();
    }
  };

  // User hits "Enter" in the mobile input
  const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMobileContinue();
    }
  };

  // Flows
  const handleMobileContinue = async () => {
    resetMessages();
    if (!canContinue) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (isLocked) return;
    setShowAdminLoginModal(true);
  };

  const handleAdminValidate = async () => {
    if (isLocked) return;
    resetMessages();

    if (!cleanedMobile || !username.trim() || !password.trim()) {
      setErrorMessage("Mobile number, username and password are required.");
      return;
    }

    try {
      setIsValidating(true);
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: cleanedMobile,
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        if (newAttempts >= 3) {
          setIsLocked(true);
          setErrorMessage("Account locked due to 3 failed attempts. Please contact tech@apexcelmove.com");
        } else {
          setErrorMessage(data?.message || `Invalid credentials. ${3 - newAttempts} attempts left.`);
        }
        return;
      }

      setLoginAttempts(0); // Reset on success
      setShowAdminLoginModal(false);
      setShowOtpModal(true);
      
      setCurrentChannel("EMAIL");
      setUsedChannels(["EMAIL"]);
      await sendOtp("EMAIL");
      
    } catch (error) {
      setErrorMessage("Unable to validate credentials right now.");
    } finally {
      setIsValidating(false);
    }
  };

  const sendOtp = async (channel: OtpChannel) => {
    if (isLocked) return;
    resetMessages();
    try {
      setIsOtpLoading(true);
      const res = await fetch("/api/admin/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", mobile: cleanedMobile, channel }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        setErrorMessage(data?.message || "Unable to send OTP.");
        return;
      }

      setCurrentChannel(channel);
      if (!usedChannels.includes(channel)) {
          setUsedChannels(prev => [...prev, channel]);
      }
      
      setOtpMessage(`OTP successfully sent via ${channel}.`);
      startCountdown(data?.retryAfter || 60);
    } catch (error) {
      setErrorMessage("Unable to send OTP.");
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (isLocked) return;
    resetMessages();

    if (combinedOtp.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setIsOtpLoading(true);
      const res = await fetch("/api/admin/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", mobile: cleanedMobile, otp: combinedOtp }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        const newAttempts = otpAttempts + 1;
        setOtpAttempts(newAttempts);
        if (newAttempts >= 3) {
          setIsLocked(true);
          setErrorMessage("Account locked due to 3 invalid OTP attempts. Please contact tech@apexcelmove.com");
        } else {
          setErrorMessage(data?.message || `Invalid OTP. ${3 - newAttempts} attempts left.`);
          setOtpValues(["", "", "", "", "", ""]);
          otpRefs.current[0]?.focus();
        }
        return;
      }

      setOtpAttempts(0);
      closeAllModals();
      router.push(data?.redirectTo || "/admin");
      router.refresh();
    } catch (error) {
      setErrorMessage("Unable to verify OTP.");
    } finally {
      setIsOtpLoading(false);
    }
  };

  const closeAllModals = () => {
    setShowAdminLoginModal(false);
    setShowOtpModal(false);
    setUsername("");
    setPassword("");
    setOtpValues(["", "", "", "", "", ""]);
    setCurrentChannel("EMAIL");
    setUsedChannels([]);
    resetMessages();
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full pt-24 pb-30 lg:pt-28 lg:pb-30 overflow-hidden bg-orange-50/30">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-[#268999]/10 rounded-full blur-[80px] -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left z-10 lg:pl-2">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-zinc-900 leading-[1.1] tracking-tight">
                <span className="text-[#268999]">Move</span> Freight <br className="hidden lg:block" />
                Faster & <span className="text-[#268999]">Smarter</span> <br />
                with <span className="text-orange-500">Apexcel</span> Move
              </h1>

              <p className="text-lg md:text-2xl text-zinc-600 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Built for Businesses, SMEs & Transporters Across India.
                The most reliable way to book trucks and find loads.
              </p>

              <div className="hidden lg:flex items-center gap-5 mt-2">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative w-12 h-12 rounded-full border-[3px] border-white overflow-hidden bg-gray-200 shadow-sm">
                      <Image src={`/user${i}.jpeg`} alt={`User ${i}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <p className="text-base font-bold text-zinc-900 leading-none">
                    Trusted by <span className="text-orange-600">10,000+</span>
                  </p>
                  <span className="text-sm font-medium text-zinc-500">Transporters</span>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur-3xl opacity-15 transform translate-y-6 scale-90 -z-10" />

              <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/60 p-6 md:p-8 relative overflow-hidden backdrop-blur-sm">
                
                {/* Tabs */}
                <div className="flex p-1.5 bg-zinc-100 rounded-2xl mb-8 relative h-20">
                  <div
                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${
                      activeTab === "shipper" ? "left-1.5" : "left-[calc(50%+3px)]"
                    }`}
                  />
                  <button
                    onClick={() => setActiveTab("shipper")}
                    className={`flex-1 flex flex-col items-center justify-center rounded-xl transition-all duration-300 relative z-10 gap-0.5 ${
                      activeTab === "shipper" ? "text-orange-600" : "text-zinc-400 hover:text-zinc-600"
                    }`}
                  >
                    <span className="text-lg font-extrabold leading-none">I&apos;m Shipper</span>
                    <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-wider opacity-70">Book Truck</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("trucker")}
                    className={`flex-1 flex flex-col items-center justify-center rounded-xl transition-all duration-300 relative z-10 gap-0.5 ${
                      activeTab === "trucker" ? "text-[#268999]" : "text-zinc-400 hover:text-zinc-600"
                    }`}
                  >
                    <span className="text-lg font-extrabold leading-none">I&apos;m Trucker</span>
                    <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-wider opacity-70">Find Load</span>
                  </button>
                </div>

                {/* Input Area */}
                <div className="space-y-5">
                  <label className="block text-sm font-extrabold text-zinc-800 pl-1">
                    Enter Mobile Number
                  </label>

                  <div className="flex items-center w-full h-14 bg-white border-2 border-zinc-100 rounded-2xl overflow-hidden focus-within:border-[#268999] focus-within:ring-4 focus-within:ring-[#268999]/10 transition-all shadow-sm group">
                    <div className="h-full px-5 flex items-center justify-center bg-zinc-50/50 border-r border-zinc-100 text-zinc-600 font-bold group-focus-within:bg-white transition-colors">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      onKeyDown={handleMobileKeyDown}
                      placeholder="98765 43210"
                      className="flex-1 h-full px-4 text-lg font-bold text-zinc-900 placeholder:text-zinc-300 outline-none w-full tracking-wide"
                    />
                    <button
                      type="button"
                      onClick={handleMobileContinue}
                      disabled={isChecking}
                      className="h-10 w-10 mr-2 rounded-xl bg-[#268999]/10 text-[#268999] hover:bg-[#268999] hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-50"
                    >
                      <FaArrowRight className="text-lg" />
                    </button>
                  </div>

                  <p className="text-xs text-zinc-400 text-center font-medium">
                    We&apos;ll send an OTP for verification. No spam.
                  </p>

                  {errorMessage && !showAdminLoginModal && !showOtpModal ? (
                    <p className="text-sm text-red-500 font-semibold text-center">{errorMessage}</p>
                  ) : null}
                </div>

                <div className="relative flex py-8 items-center">
                  <div className="flex-grow border-t border-gray-100"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-[11px] uppercase tracking-widest font-bold">Download our app</span>
                  <div className="flex-grow border-t border-gray-100"></div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <a href="#" className="flex-1 relative h-12 hover:scale-105 transition-transform duration-300">
                    <Image src="/playstore.png" alt="Google Play" fill className="object-contain" sizes="(max-width: 768px) 150px, 200px" />
                  </a>
                  <a href="#" className="flex-1 relative h-12 hover:scale-105 transition-transform duration-300">
                    <Image src="/appstore.png" alt="App Store" fill className="object-contain" sizes="(max-width: 768px) 150px, 200px" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================== */}
      {/* ADMIN LOGIN MODAL */}
      {/* ========================================== */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 z-[9999] bg-[#1a5d68]/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Proper Red Close Button aligned to top-right */}
            <button
              type="button"
              onClick={closeAllModals}
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors z-[10000] cursor-pointer"
            >
              <FaXmark size={18} />
            </button>

            {isLocked ? (
              // LOCKED STATE UI
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaXmark size={32} />
                </div>
                <h3 className="text-2xl font-extrabold text-red-600 mb-2">Access Locked</h3>
                <p className="text-zinc-600 font-medium">
                  IP Blocked due to multiple failed attempts.
                  Please contact <br/><span className="font-bold text-[#1a5d68]">tech@apexcelmove.com</span>
                </p>
              </div>
            ) : (
              // NORMAL LOGIN UI
              <>
                <div className="mb-8 pr-6">
                  <div className="w-12 h-1 bg-orange-400 rounded-full mb-4"></div>
                  <h3 className="text-2xl font-extrabold text-[#1a5d68]">
                    Admin Validation
                  </h3>
                  <p className="text-sm text-zinc-500 mt-2 font-medium">
                    Verify credentials for <span className="text-orange-500 font-bold">+91 {cleanedMobile}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full h-14 px-5 rounded-2xl bg-zinc-50 border border-zinc-200 outline-none focus:bg-white focus:border-[#268999] focus:ring-4 focus:ring-[#268999]/10 font-bold text-[#1a5d68] transition-all"
                  />
                  
                  {/* Password with Eye Toggle */}
                  <div className="relative w-full">
                    <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  className="w-full h-14 px-5 pr-12 rounded-2xl bg-zinc-50 border border-zinc-200 outline-none focus:bg-white focus:border-[#268999] focus:ring-4 focus:ring-[#268999]/10 font-bold text-[#1a5d68] transition-all"
/>
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#268999] transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl text-sm font-semibold border border-red-100">
                        {errorMessage}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleAdminValidate}
                    disabled={isValidating}
                    className="w-full h-14 mt-2 rounded-2xl bg-[#268999] text-white font-extrabold text-lg hover:bg-[#1a5d68] transition-all disabled:opacity-50 shadow-lg shadow-[#268999]/20"
                  >
                    {isValidating ? "Validating..." : "Proceed to OTP"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* OTP VERIFICATION MODAL */}
      {/* ========================================== */}
      {showOtpModal && (
        <div className="fixed inset-0 z-[9999] bg-[#1a5d68]/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Proper Red Close Button aligned to top-right */}
            <button
              type="button"
              onClick={closeAllModals}
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors z-[10000] cursor-pointer"
            >
              <FaXmark size={18} />
            </button>

            {isLocked ? (
              // LOCKED STATE UI
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaXmark size={32} />
                </div>
                <h3 className="text-2xl font-extrabold text-red-600 mb-2">Access Locked</h3>
                <p className="text-zinc-600 font-medium">
                  IP Blocked due to multiple invalid attempts.
                  Please contact <br/><span className="font-bold text-[#1a5d68]">tech@apexcelmove.com</span>
                </p>
              </div>
            ) : (
              // NORMAL OTP UI
              <>
                <div className="mb-8 pr-6 text-center">
                  <h3 className="text-2xl font-extrabold text-[#1a5d68]">
                    OTP Verification
                  </h3>
                  <p className="text-sm text-zinc-500 mt-2 font-medium">
                    Sent to <span className="font-bold text-orange-500">{currentChannel}</span> for +91 {cleanedMobile}
                  </p>
                </div>

                <div className="space-y-6">
                  
                  {/* 6 Separate OTP Boxes */}
                  <div className="flex justify-center gap-2">
                    {otpValues.map((value, index) => (
                      <input
                        key={index}
                        ref={(el) => { otpRefs.current[index] = el; }}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        className="w-12 h-14 rounded-xl bg-zinc-50 border border-zinc-200 text-center text-2xl font-black text-[#1a5d68] outline-none focus:bg-white focus:border-[#268999] focus:ring-4 focus:ring-[#268999]/10 transition-all"
                      />
                    ))}
                  </div>

                  {otpMessage && (
                    <p className="text-sm text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-lg text-center border border-emerald-100">
                        {otpMessage}
                    </p>
                  )}

                  {errorMessage && (
                    <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl text-sm font-semibold border border-red-100 text-center">
                        {errorMessage}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isOtpLoading || combinedOtp.length !== 6}
                    className="w-full h-14 rounded-2xl bg-[#268999] text-white font-extrabold text-lg hover:bg-[#1a5d68] transition-all disabled:opacity-50 shadow-lg shadow-[#268999]/20"
                  >
                    {isOtpLoading ? "Verifying..." : "Verify & Login"}
                  </button>

                  {/* Channel Exhaustion Warning */}
                  {usedChannels.length >= 3 && countdown === 0 && (
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
                        <p className="text-xs font-bold text-orange-700">
                           Used all methods and still failing?<br/> Email: tech@apexcelmove.com
                        </p>
                    </div>
                  )}

                  {/* Enhanced OTP Fallback Logic UI */}
                  {usedChannels.length < 3 && (
                    <div className="pt-4 mt-2 border-t border-zinc-100">
                      <div className="flex items-center justify-between mb-4">
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                              Didn&apos;t receive it?
                          </p>
                          {countdown > 0 && (
                              <span className="text-xs font-black text-orange-500 bg-orange-50 px-2 py-1 rounded-md">
                                  Wait {countdown}s
                              </span>
                          )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          disabled={countdown > 0 || isOtpLoading || usedChannels.includes("SMS")}
                          onClick={() => sendOtp("SMS")}
                          className={`h-12 flex items-center justify-center gap-2 rounded-xl border text-sm font-bold transition-all ${
                              usedChannels.includes("SMS") 
                              ? "bg-zinc-50 border-zinc-200 text-zinc-300 cursor-not-allowed" 
                              : "bg-white border-zinc-200 text-[#1a5d68] hover:border-[#268999] hover:bg-teal-50 disabled:opacity-40"
                          }`}
                        >
                          <MessageSquareText size={16} className={usedChannels.includes("SMS") ? "opacity-50" : "text-[#268999]"} />
                          Send via SMS
                        </button>
                        
                        <button
                          type="button"
                          disabled={countdown > 0 || isOtpLoading || usedChannels.includes("WHATSAPP")}
                          onClick={() => sendOtp("WHATSAPP")}
                          className={`h-12 flex items-center justify-center gap-2 rounded-xl border text-sm font-bold transition-all ${
                              usedChannels.includes("WHATSAPP") 
                              ? "bg-zinc-50 border-zinc-200 text-zinc-300 cursor-not-allowed" 
                              : "bg-white border-zinc-200 text-[#1a5d68] hover:border-green-500 hover:bg-green-50 hover:text-green-600 disabled:opacity-40"
                          }`}
                        >
                          {/* Custom WhatsApp Icon */}
                          <div className={`relative w-4 h-4 ${usedChannels.includes("WHATSAPP") ? "opacity-50 grayscale" : ""}`}>
                            <Image src="/whatsapp.png" alt="WA" fill className="object-contain" />
                          </div>
                          Send via WhatsApp
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}