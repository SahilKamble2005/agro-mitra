import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import AppLayout from '@/components/layout/AppLayout';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

// Public pages
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import VerifyCertificate from '@/pages/VerifyCertificate';

// Authenticated pages
import Dashboard from '@/pages/Dashboard';
import AssessmentsList from '@/pages/AssessmentsList';
import NewAssessment from '@/pages/NewAssessment';
import AssessmentDetail from '@/pages/AssessmentDetail';
import BatchGrading from '@/pages/BatchGrading';
import LiveAssessments from '@/pages/LiveAssessments';
import QualityAnalytics from '@/pages/QualityAnalytics';
import RegionalIntelligencePage from '@/pages/RegionalIntelligencePage';
import ProcurementCentersPage from '@/pages/ProcurementCentersPage';
import BlockchainCertificatesPage from '@/pages/BlockchainCertificatesPage';
import ReportsPage from '@/pages/ReportsPage';
import DisputesPage from '@/pages/DisputesPage';
import IntegrityAlertsPage from '@/pages/IntegrityAlertsPage';
import MarketplacePage from '@/pages/MarketplacePage';
import PriceInsightsPage from '@/pages/PriceInsightsPage';
import WhatsAppAIPage from '@/pages/WhatsAppAIPage';
import AssessmentHistoryPage from '@/pages/AssessmentHistoryPage';
import KnowledgeGraphPage from '@/pages/KnowledgeGraphPage';
import DigitalTwinPage from '@/pages/DigitalTwinPage';
import SettingsPage from '@/pages/SettingsPage';

// Admin pages
import UsersPage from '@/pages/admin/UsersPage';
import ModelManagementPage from '@/pages/admin/ModelManagementPage';
import RetrainingQueuePage from '@/pages/admin/RetrainingQueuePage';
import SystemHealthPage from '@/pages/admin/SystemHealthPage';
import AuditLogsPage from '@/pages/admin/AuditLogsPage';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-certificate/:certificateId" element={<VerifyCertificate />} />
              <Route path="/marketplace" element={<MarketplacePage />} />

              {/* Authenticated Layout Routes */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assessments" element={<AssessmentsList />} />
                <Route path="/assessments/new" element={<NewAssessment />} />
                <Route path="/assessments/:id" element={<AssessmentDetail />} />
                <Route path="/batch-grading" element={<BatchGrading />} />
                <Route path="/live-assessments" element={<LiveAssessments />} />
                <Route path="/quality-analytics" element={<QualityAnalytics />} />
                <Route path="/regional-intelligence" element={<RegionalIntelligencePage />} />
                <Route path="/procurement-centers" element={<ProcurementCentersPage />} />
                <Route path="/blockchain-certificates" element={<BlockchainCertificatesPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/disputes" element={<DisputesPage />} />
                <Route path="/integrity-alerts" element={<IntegrityAlertsPage />} />
                <Route path="/marketplace/manage" element={<MarketplacePage />} />
                <Route path="/price-insights" element={<PriceInsightsPage />} />
                <Route path="/whatsapp-ai" element={<WhatsAppAIPage />} />
                <Route path="/assessment-history" element={<AssessmentHistoryPage />} />
                <Route path="/knowledge-graph" element={<KnowledgeGraphPage />} />
                <Route path="/digital-twin" element={<DigitalTwinPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                {/* Admin Routes */}
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/model-management" element={<ModelManagementPage />} />
                <Route path="/admin/retraining-queue" element={<RetrainingQueuePage />} />
                <Route path="/admin/system-health" element={<SystemHealthPage />} />
                <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Global AI Chatbot Widget */}
            <ChatbotWidget />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
