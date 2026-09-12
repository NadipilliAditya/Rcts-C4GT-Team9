import React, { useState, useEffect } from 'react';
import Header from '../../components/admin/Header';
import SummaryCards from '../../components/admin/SummaryCards';
import DepartmentBarChart from '../../components/admin/charts/DepartmentBarChart';
import EngagementLineChart from '../../components/admin/charts/EngagementLineChart';
import IndustryPieChart from '../../components/admin/charts/IndustryPieChart';
import EventAreaChart from '../../components/admin/charts/EventAreaChart';
import MentorshipDomainBarChart from '../../components/admin/charts/MentorshipDomainBarChart';
import EngagedAlumniTable from '../../components/admin/EngagedAlumniTable';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { 
  getOverview, 
  getByDepartment, 
  getByIndustry, 
  getEngagementTrend, 
  getMentorshipDomains, 
  getEventParticipation 
} from '../../api/analyticsApi';
import { Filter, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [timeframe, setTimeframe] = useState('8m');
  const [department, setDepartment] = useState('all');

  // Analytics State
  const [overview, setOverview] = useState(null);
  const [departmentData, setDepartmentData] = useState([]);
  const [industryData, setIndustryData] = useState([]);
  const [engagementTrend, setEngagementTrend] = useState([]);
  const [mentorshipDomains, setMentorshipDomains] = useState([]);
  const [eventParticipation, setEventParticipation] = useState([]);

  const fetchAllAnalytics = async (isRefetch = false) => {
    if (isRefetch) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const [
        overviewRes,
        deptRes,
        industryRes,
        trendRes,
        domainsRes,
        eventsRes
      ] = await Promise.all([
        getOverview({ timeframe, department }),
        getByDepartment(),
        getByIndustry(),
        getEngagementTrend({ timeframe }),
        getMentorshipDomains(),
        getEventParticipation()
      ]);

      setOverview(overviewRes.data);
      setDepartmentData(deptRes.data);
      setIndustryData(industryRes.data);
      setEngagementTrend(trendRes.data);
      setMentorshipDomains(domainsRes.data);
      setEventParticipation(eventsRes.data);
    } catch (err) {
      console.error('Failed to load analytics:', err);
      setError(err.message || 'Error connecting to analytics services');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllAnalytics();
  }, [timeframe, department]);

  return (
    <div className="flex-1 min-w-0 bg-slate-950 pb-12">
      <Header 
        title="Admin Analytics Dashboard" 
        subtitle="Platform engagement performance & key alumni metrics"
        onRefresh={() => fetchAllAnalytics(true)}
        isRefreshing={refreshing}
      />

      <main className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Controls & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <Filter className="w-4 h-4 text-blue-400" />
            <span>Dashboard Filters</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Timeframe Selector */}
            <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400 ml-2" />
              <button
                onClick={() => setTimeframe('3m')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  timeframe === '3m' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                3 Months
              </button>
              <button
                onClick={() => setTimeframe('6m')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  timeframe === '6m' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                6 Months
              </button>
              <button
                onClick={() => setTimeframe('8m')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  timeframe === '8m' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Year to Date
              </button>
            </div>

            {/* Department Filter */}
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Eng">Electrical Eng</option>
              <option value="Mechanical Eng">Mechanical Eng</option>
              <option value="Business Admin">Business Admin</option>
              <option value="Biotechnology">Biotechnology</option>
            </select>
          </div>
        </div>

        {/* Global Loading / Error */}
        {loading ? (
          <LoadingSpinner message="Fetching live analytics from Team 4 REST API..." />
        ) : error ? (
          <ErrorAlert message={error} onRetry={() => fetchAllAnalytics()} />
        ) : (
          <>
            {/* 1. Summary Cards */}
            <SummaryCards data={overview} />

            {/* 2. Primary Analytics Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DepartmentBarChart data={departmentData} />
              <EngagementLineChart data={engagementTrend} />
            </div>

            {/* 3. Secondary Analytics Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <IndustryPieChart data={industryData} />
              <EventAreaChart data={eventParticipation} />
              <MentorshipDomainBarChart data={mentorshipDomains} />
            </div>

            {/* 4. Most Engaged Alumni Ranked Table */}
            <EngagedAlumniTable alumni={overview?.topEngagedAlumni || []} />
          </>
        )}
      </main>
    </div>
  );
}
