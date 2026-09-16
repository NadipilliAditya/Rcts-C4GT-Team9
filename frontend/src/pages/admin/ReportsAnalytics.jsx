import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3, 
  PieChart, 
  CheckCircle2, 
  ArrowUpRight,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';

export default function ReportsAnalytics() {
  const [reportType, setReportType] = useState('annual');
  const [downloading, setDownloading] = useState(null);

  const reports = [
    {
      id: 'REP-01',
      title: 'Annual Alumni Engagement & Mentorship Audit (2023-2024)',
      type: 'Comprehensive PDF',
      size: '4.8 MB',
      date: 'Aug 30, 2024',
      downloads: 142,
      category: 'Auditing'
    },
    {
      id: 'REP-02',
      title: 'Q3 Department-wise Placement & Referral Conversion Matrix',
      type: 'Excel Sheet (.xlsx)',
      size: '1.4 MB',
      date: 'Sep 01, 2024',
      downloads: 89,
      category: 'Placements'
    },
    {
      id: 'REP-03',
      title: 'Global Alumni Geographical Distribution & Company Census',
      type: 'CSV Dataset',
      size: '850 KB',
      date: 'Sep 10, 2024',
      downloads: 215,
      category: 'Demographics'
    },
    {
      id: 'REP-04',
      title: 'Mentorship Track Satisfaction & Feedback Scorecard',
      type: 'Executive Summary PDF',
      size: '2.1 MB',
      date: 'Sep 12, 2024',
      downloads: 67,
      category: 'Mentorship'
    }
  ];

  const handleDownload = (id) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      alert('Report generated and downloaded successfully!');
    }, 1000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            Analytics & Official Reports
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Export accreditation documents, engagement data matrices, and demographic benchmarks.
          </p>
        </div>

        <button 
          onClick={() => alert('Generating customized real-time data export...')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Custom Export</span>
        </button>
      </div>

      {/* Summary highlight cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-slate-900/80 border border-blue-800/40 backdrop-blur-xl">
          <div className="flex items-center justify-between text-blue-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Accreditation Ready</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">NAAC / NIRF Data Sync</h3>
          <p className="text-xs text-slate-300">All alumni engagement hours, contributions, and placement metrics are pre-formatted for compliance.</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-slate-900/80 border border-indigo-800/40 backdrop-blur-xl">
          <div className="flex items-center justify-between text-indigo-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Real-time Telemetry</span>
            <BarChart3 className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Live Query Engine</h3>
          <p className="text-xs text-slate-300">Query over 5,200 alumni records across 14 batches with multi-parameter filtering.</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-slate-900/80 border border-emerald-800/40 backdrop-blur-xl">
          <div className="flex items-center justify-between text-emerald-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Automated Delivery</span>
            <Calendar className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Weekly Digest Scheduled</h3>
          <p className="text-xs text-slate-300">Dean & HOD executive briefings sent every Monday morning automatically.</p>
        </div>
      </div>

      {/* Available Documents List */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-base">Archived & Pre-Compiled Reports</h3>
          <span className="text-xs text-slate-400">Showing all verified platform audits</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {reports.map((r) => (
            <div key={r.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-blue-400 flex items-center justify-center shrink-0 border border-slate-700">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm hover:text-blue-300 transition-colors cursor-pointer">
                    {r.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold">{r.category}</span>
                    <span>{r.type}</span>
                    <span>•</span>
                    <span>{r.size}</span>
                    <span>•</span>
                    <span>Updated {r.date}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(r.id)}
                disabled={downloading === r.id}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>{downloading === r.id ? 'Preparing…' : 'Download'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
