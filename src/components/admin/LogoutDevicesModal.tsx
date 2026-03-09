"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Monitor, Smartphone, Tablet, LogOut, Loader2, ShieldCheck, User } from "lucide-react";
import { useRouter } from "next/navigation";

// ... Types (same as before)

export default function LogoutDevicesModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [ownDevices, setOwnDevices] = useState<DeviceItem[]>([]);
  const [superior, setSuperior] = useState<SuperiorBlock>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loggingOutSessionId, setLoggingOutSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const loadDevices = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const res = await fetch("/api/admin/auth/devices", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok || !data?.success) {
          setErrorMessage(data?.message || "Unable to load active devices.");
          return;
        }
        setOwnDevices(data.ownDevices || []);
        setSuperior(data.superior || null);
      } catch (error) {
        setErrorMessage("Something went wrong while loading devices.");
      } finally {
        setIsLoading(false);
      }
    };
    loadDevices();
  }, [isOpen]);

  const getDeviceIcon = (deviceType?: string | null) => {
    if (deviceType === "MOBILE") return <Smartphone size={20} />;
    if (deviceType === "TABLET") return <Tablet size={20} />;
    return <Monitor size={20} />;
  };

  const getDeviceTitle = (device: DeviceItem) => {
    if (device.deviceName?.trim()) return device.deviceName;
    return device.deviceType || "Unknown Device";
  };

  const formatRelativeTime = (dateValue?: string | null) => {
    if (!dateValue) return "N/A";
    const date = new Date(dateValue);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleLogoutDevice = async (sessionId: string) => {
    try {
      setLoggingOutSessionId(sessionId);
      const res = await fetch("/api/admin/auth/logout-device", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        alert(data?.message || "Logout failed");
        return;
      }
      if (data?.isCurrentDevice) {
        router.replace("/");
        router.refresh();
        return;
      }
      setOwnDevices((prev) => prev.filter((item) => item.sessionId !== sessionId));
    } catch (error) {
      alert("Error logging out.");
    } finally {
      setLoggingOutSessionId(null);
    }
  };

  const hasAnyData = useMemo(() => {
    return ownDevices.length > 0 || (superior && superior.devices.length > 0);
  }, [ownDevices, superior]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Blur Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl border border-teal-50 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-teal-50 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#1a5d68]">Device Security</h2>
              <p className="text-xs font-bold text-[#268999]/60 uppercase tracking-wider">Manage Active Sessions</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-zinc-100 hover:bg-red-50 text-zinc-500 hover:text-red-500 flex items-center justify-center transition-all group"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-[#F8FAFB]">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-teal-500" size={40} />
              <p className="text-sm font-black text-[#1a5d68] uppercase tracking-widest">Scanning Sessions...</p>
            </div>
          ) : errorMessage ? (
            <div className="bg-red-50 rounded-2xl border border-red-100 p-4 text-center">
              <p className="text-sm font-bold text-red-600">{errorMessage}</p>
            </div>
          ) : !hasAnyData ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                <Monitor size={32} />
              </div>
              <h3 className="text-lg font-black text-[#1a5d68]">No Active Sessions</h3>
              <p className="text-sm font-medium text-zinc-500">Your account is currently secure.</p>
            </div>
          ) : (
            <>
              {/* Own Devices Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <User size={16} className="text-teal-600" />
                  <h3 className="text-sm font-black text-[#1a5d68] uppercase tracking-wider">Your Active Sessions</h3>
                </div>

                <div className="grid gap-3">
                  {ownDevices.map((device) => (
                    <div
                      key={device.sessionId}
                      className="group bg-white rounded-3xl border border-teal-100/50 p-4 md:p-5 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5 transition-all"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${device.isCurrent ? 'bg-orange-100 text-orange-600' : 'bg-teal-50 text-teal-600'}`}>
                            {getDeviceIcon(device.deviceType)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-black text-[#1a5d68] truncate">{getDeviceTitle(device)}</h4>
                              {device.isCurrent && (
                                <span className="bg-orange-500 text-white text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">Current</span>
                              )}
                            </div>
                            <p className="text-[11px] font-bold text-zinc-400 truncate">
                              {device.browser} on {device.os} • {device.ip}
                            </p>
                            <p className="text-[10px] font-black text-teal-600/70 uppercase mt-1">
                              Last Seen: {formatRelativeTime(device.lastSeenAt)}
                            </p>
                          </div>
                        </div>

                        {device.canLogout && (
                          <button
                            onClick={() => handleLogoutDevice(device.sessionId)}
                            disabled={loggingOutSessionId === device.sessionId}
                            className="p-3 rounded-2xl bg-zinc-50 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                            title="Logout Device"
                          >
                            {loggingOutSessionId === device.sessionId ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Superior Devices Section */}
              {superior && superior.devices.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <ShieldCheck size={16} className="text-orange-500" />
                    <h3 className="text-sm font-black text-[#1a5d68] uppercase tracking-wider">Superior Admin Devices</h3>
                  </div>

                  <div className="grid gap-3">
                    {superior.devices.map((device) => (
                      <div
                        key={device.sessionId}
                        className="bg-orange-50/30 rounded-3xl border border-orange-100 p-4 md:p-5"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                            {getDeviceIcon(device.deviceType)}
                          </div>
                          <div>
                            <h4 className="font-black text-[#1a5d68]">{getDeviceTitle(device)}</h4>
                            <p className="text-[11px] font-bold text-zinc-400">
                              {device.os} • {device.location || 'Unknown Location'}
                            </p>
                            <span className="text-[9px] font-black text-orange-600/60 uppercase mt-1 block tracking-widest italic">Protected Session</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Info */}
        <div className="px-8 py-4 border-t border-teal-50 bg-white text-center">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Always logout from public devices to keep your account safe
          </p>
        </div>
      </div>
    </div>
  );
}