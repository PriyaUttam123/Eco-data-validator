import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import KPICards from '../components/KPICards';
import RecentIngestions from '../components/RecentIngestions';
import IngestionBreakdown from '../components/IngestionBreakdown';
import AuditLogPanel from '../components/AuditLogPanel';

const Dashboard = ({ records, loading, onRefresh, onNewIngestion }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <DashboardHeader onNewIngestion={onNewIngestion} />
      <KPICards records={records} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecentIngestions records={records} loading={loading} onRefresh={onRefresh} />
        </div>
        <div className="space-y-8">
          <IngestionBreakdown />
          <AuditLogPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
