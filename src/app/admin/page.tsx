"use client";
import { useState, useEffect, useCallback } from "react";

const ADMIN_PASS = "swiftfix2026";
const SLOTS = ["9:00 - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 - 3:00 PM", "3:00 - 5:00 PM", "5:00 - 7:00 PM"];

function getNext14Days() {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" });
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const value = d.toISOString().split("T")[0];
    days.push({ label: `${dayName}, ${label}`, value });
  }
  return days;
}

type Booking = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address: string;
  device: string;
  repair: string;
  bookingType: "asap" | "scheduled";
  date?: string;
  slot?: string;
  bookedAt: string;
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [blockedSlots, setBlockedSlots] = useState<Record<string, string[]>>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tab, setTab] = useState<"schedule" | "asap" | "block">("asap");

  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        const data = await res.json();
        setBlockedSlots(data.blockedSlots || {});
        setBookings(data.bookings || []);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  const toggleBlock = async (date: string, slot: string) => {
    const current = blockedSlots[date] || [];
    const updated = current.includes(slot)
      ? current.filter(s => s !== slot)
      : [...current, slot];
    const newBlocked = { ...blockedSlots, [date]: updated };
    setBlockedSlots(newBlocked);
    await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blockedSlots: newBlocked }),
    });
  };

  const blockFullDay = async (date: string) => {
    const newBlocked = { ...blockedSlots, [date]: [...SLOTS] };
    setBlockedSlots(newBlocked);
    await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blockedSlots: newBlocked }),
    });
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full">
          <h1 className="text-xl font-bold mb-1">Admin Login</h1>
          <p className="text-[#c7c7cc] text-sm mb-6">SwiftFix Management</p>
          <form onSubmit={(e) => { e.preventDefault(); if (pass === ADMIN_PASS) setAuthed(true); else alert("Wrong password"); }}>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border border-[#e8e8ed] rounded-xl px-4 py-3 mb-4 text-sm"
              autoFocus
            />
            <button type="submit" className="w-full bg-[#0071e3] text-white py-3 rounded-xl font-semibold cursor-pointer">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const asapBookings = bookings.filter(b => b.bookingType === "asap");
  const scheduledBookings = bookings.filter(b => b.bookingType === "scheduled");

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <nav className="bg-white border-b border-[#e8e8ed] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="font-bold text-lg">SwiftFix Admin</h1>
          <button onClick={() => setAuthed(false)} className="text-sm text-[#c7c7cc] cursor-pointer">Logout</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "asap" as const, label: "ASAP Queue", count: asapBookings.length },
            { id: "schedule" as const, label: "Scheduled", count: scheduledBookings.length },
            { id: "block" as const, label: "Block Dates" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition ${
                tab === t.id ? "bg-[#0071e3] text-white" : "bg-white border border-[#e8e8ed] text-[#1d1d1f]"
              }`}
            >
              {t.label} {t.count !== undefined && <span className="ml-1 opacity-70">({t.count})</span>}
            </button>
          ))}
        </div>

        {/* ASAP Queue */}
        {tab === "asap" && (
          <div className="space-y-3">
            {asapBookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center">
                <p className="text-[#c7c7cc]">No ASAP bookings in queue</p>
              </div>
            ) : asapBookings.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl p-4 border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">ASAP</span>
                  <span className="text-[10px] text-[#c7c7cc]">{new Date(b.bookedAt).toLocaleString()}</span>
                </div>
                <p className="font-semibold">{b.name}</p>
                <p className="text-sm text-[#c7c7cc]">{b.device} - {b.repair}</p>
                <p className="text-sm">{b.address}</p>
                <div className="flex gap-3 mt-2 text-xs text-[#0071e3]">
                  {b.phone && <a href={`tel:${b.phone}`}>{b.phone}</a>}
                  {b.email && <a href={`mailto:${b.email}`}>{b.email}</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scheduled */}
        {tab === "schedule" && (
          <div className="space-y-3">
            {scheduledBookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center">
                <p className="text-[#c7c7cc]">No scheduled bookings yet</p>
              </div>
            ) : scheduledBookings.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl p-4 border-l-4 border-[#0071e3]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {b.date} at {b.slot}
                  </span>
                  <span className="text-[10px] text-[#c7c7cc]">{new Date(b.bookedAt).toLocaleString()}</span>
                </div>
                <p className="font-semibold">{b.name}</p>
                <p className="text-sm text-[#c7c7cc]">{b.device} - {b.repair}</p>
                <p className="text-sm">{b.address}</p>
                <div className="flex gap-3 mt-2 text-xs text-[#0071e3]">
                  {b.phone && <a href={`tel:${b.phone}`}>{b.phone}</a>}
                  {b.email && <a href={`mailto:${b.email}`}>{b.email}</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Block Dates */}
        {tab === "block" && (
          <div className="space-y-4">
            {getNext14Days().map((day) => {
              const dayBlocked = blockedSlots[day.value] || [];
              const allBlocked = dayBlocked.length === SLOTS.length;
              return (
                <div key={day.value} className="bg-white rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-sm">{day.label}</p>
                    <button
                      onClick={() => allBlocked
                        ? (() => { const nb = {...blockedSlots}; delete nb[day.value]; setBlockedSlots(nb); fetch("/api/admin/data", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({blockedSlots: nb}) }); })()
                        : blockFullDay(day.value)
                      }
                      className={`text-xs px-3 py-1 rounded-full cursor-pointer ${
                        allBlocked ? "bg-red-100 text-red-700" : "bg-[#f5f5f7] text-[#c7c7cc]"
                      }`}
                    >
                      {allBlocked ? "Unblock All" : "Block Full Day"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SLOTS.map((slot) => {
                      const isBlocked = dayBlocked.includes(slot);
                      return (
                        <button
                          key={slot}
                          onClick={() => toggleBlock(day.value, slot)}
                          className={`p-2 rounded-xl text-xs font-medium transition cursor-pointer border ${
                            isBlocked
                              ? "bg-red-50 border-red-300 text-red-700"
                              : "bg-white border-[#e8e8ed] text-[#1d1d1f] hover:border-[#0071e3]/40"
                          }`}
                        >
                          {slot} {isBlocked ? "X" : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
