"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  RefreshCw,
  Search
} from "lucide-react";

interface Consultation {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  physician: string;
  treatment: string;
  preferred_date: string;
  preferred_time: string;
  status: "confirmed" | "completed" | "cancelled" | "pending";
}

export default function AdminDashboard() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

  const fetchConsultations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching consultations:", error);
    } else {
      setConsultations(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const updateStatus = async (id: string, newStatus: Consultation["status"]) => {
    setStatusUpdating(id);
    const { error } = await supabase
      .from("consultations")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      setConsultations((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    }
    setStatusUpdating(null);
  };

  const filteredConsultations = consultations.filter((item) => {
    const matchesFilter = filter === "all" ? true : item.status === filter;
    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone?.includes(searchTerm) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.treatment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.physician?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">Confirmed</span>;
      case "completed":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-950/60 text-blue-400 border border-blue-800/50">Completed</span>;
      case "cancelled":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-950/60 text-rose-400 border border-rose-800/50">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-950/60 text-amber-400 border border-amber-800/50">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#e1e4ea] p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-mono">Clinical Management</span>
            <h1 className="text-3xl font-light text-white tracking-tight mt-1">Consultation Dashboard</h1>
          </div>
          <button
            onClick={fetchConsultations}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-all self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
            <p className="text-xs font-mono text-neutral-400 uppercase">Total Bookings</p>
            <p className="text-2xl font-light text-white mt-1">{consultations.length}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
            <p className="text-xs font-mono text-emerald-400/80 uppercase">Confirmed</p>
            <p className="text-2xl font-light text-emerald-400 mt-1">
              {consultations.filter((c) => c.status === "confirmed").length}
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
            <p className="text-xs font-mono text-blue-400/80 uppercase">Completed</p>
            <p className="text-2xl font-light text-blue-400 mt-1">
              {consultations.filter((c) => c.status === "completed").length}
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
            <p className="text-xs font-mono text-rose-400/80 uppercase">Cancelled</p>
            <p className="text-2xl font-light text-rose-400 mt-1">
              {consultations.filter((c) => c.status === "cancelled").length}
            </p>
          </div>
        </div>

        {/* Controls: Search & Filter Tabs */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by patient, phone, email, physician..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880]/60"
            />
          </div>

          <div className="flex items-center gap-1 bg-white/[0.03] p-1 border border-white/10 rounded-lg self-start md:self-auto overflow-x-auto">
            {["all", "confirmed", "completed", "cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-md text-xs uppercase tracking-wider transition-all ${
                  filter === tab
                    ? "bg-[#C5A880] text-black font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table / List */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-neutral-500 text-sm">Loading consultations...</div>
          ) : filteredConsultations.length === 0 ? (
            <div className="p-12 text-center text-neutral-500 text-sm">No consultation requests found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.02] border-b border-white/10 text-xs uppercase text-neutral-400 font-mono">
                  <tr>
                    <th className="py-4 px-6">Patient</th>
                    <th className="py-4 px-6">Treatment & Physician</th>
                    <th className="py-4 px-6">Appointment Slot</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-light">
                  {filteredConsultations.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.015] transition-colors">
                      
                      {/* Patient Info */}
                      <td className="py-4 px-6">
                        <div className="font-normal text-white">{item.name}</div>
                        <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                          <Phone className="w-3 h-3 text-neutral-500" />
                          <a href={`tel:${item.phone}`} className="hover:text-[#C5A880]">{item.phone}</a>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                          <Mail className="w-3 h-3 text-neutral-500" />
                          <a href={`mailto:${item.email}`} className="hover:text-[#C5A880]">{item.email}</a>
                        </div>
                      </td>

                      {/* Treatment & Physician */}
                      <td className="py-4 px-6">
                        <div className="text-white">{item.treatment || "General Triage"}</div>
                        <div className="flex items-center gap-1.5 text-xs text-[#C5A880] mt-1">
                          <Stethoscope className="w-3 h-3" />
                          {item.physician}
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-white">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                          {item.preferred_date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                          <Clock className="w-3 h-3 text-neutral-500" />
                          {item.preferred_time}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {getStatusBadge(item.status)}
                      </td>

                      {/* Action Dropdown / Buttons */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {item.status !== "completed" && (
                            <button
                              disabled={statusUpdating === item.id}
                              onClick={() => updateStatus(item.id, "completed")}
                              className="p-1.5 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/40 text-blue-400 rounded-md transition-colors"
                              title="Mark as Completed"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                          {item.status !== "cancelled" && (
                            <button
                              disabled={statusUpdating === item.id}
                              onClick={() => updateStatus(item.id, "cancelled")}
                              className="p-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-400 rounded-md transition-colors"
                              title="Mark as Cancelled"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          {item.status !== "confirmed" && (
                            <button
                              disabled={statusUpdating === item.id}
                              onClick={() => updateStatus(item.id, "confirmed")}
                              className="p-1.5 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 text-emerald-400 rounded-md transition-colors"
                              title="Reconfirm"
                            >
                              <AlertCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}