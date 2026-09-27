// ============================================================
// OnionTrust AI — Mock API Services
// Implements all frontend service modules prepared for backend API endpoints
// ============================================================

import {
  assessments, batches, certificates, disputes,
  regionalRisks, procurementCenters, marketListings,
  reports, integrityAlerts, modelVersions, whatsappConversations,
  auditLogs, priceData
} from '@/data/mockData';
import type {
  Assessment, Batch, Certificate, Dispute, RegionalRisk,
  ProcurementCenter, MarketListing, Report, IntegrityAlert,
  ModelVersion, WhatsAppConversation, AuditLogEntry, PriceData
} from '@/types';
import { generateId, sleep } from '@/lib/utils';

// Authentication API
export const authService = {
  login: async (email: string, role: string) => {
    await sleep(400);
    return { token: `demo-jwt-${Date.now()}`, user: { email, role } };
  },
  sendOTP: async (phone: string) => {
    await sleep(300);
    return { success: true, message: `OTP sent to ${phone}` };
  },
  verifyOTP: async (phone: string, otp: string) => {
    await sleep(400);
    return { success: true, token: `demo-jwt-otp-${Date.now()}` };
  },
  refresh: async () => {
    await sleep(200);
    return { token: `refreshed-jwt-${Date.now()}` };
  },
};

// Assessments API
export const assessmentService = {
  getAssessments: async () => {
    await sleep(300);
    return [...assessments];
  },
  getAssessmentById: async (id: string) => {
    await sleep(200);
    return assessments.find(a => a.id === id) || assessments[0];
  },
  analyzeImage: async (file: File | string) => {
    await sleep(1500); // Simulate ML analysis speed
    const newAssessment: Assessment = {
      id: `ASM-2026-${generateId().slice(0, 4).toUpperCase()}`,
      batchId: 'ON-2026-1043',
      imageUrl: typeof file === 'string' ? file : URL.createObjectURL(file),
      qualityScore: 91,
      grade: 'A',
      confidence: 96,
      variety: 'Nashik Red',
      defects: [
        { type: 'rot', percentage: 1.0, severity: 'low', confidence: 94 },
        { type: 'bruising', percentage: 3.0, severity: 'low', confidence: 92 },
        { type: 'sprouting', percentage: 0, severity: 'low', confidence: 98 },
        { type: 'discoloration', percentage: 2.0, severity: 'low', confidence: 95 },
      ],
      totalDefectArea: 4.2,
      shelfLife: { min: 18, max: 22 },
      estimatedPrice: { min: 2800, max: 3150 },
      modelVersion: 'v3.2.1',
      status: 'completed',
      explanation: 'Grade A was assigned because the total detected defect area is below the 5% threshold. Rot is minimal at 1%, bruising is within acceptable limits at 3%.',
      farmer: 'Rajesh Deshmukh',
      procurementCenter: 'Nashik Central',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    assessments.unshift(newAssessment);
    return newAssessment;
  },
};

// Batches API
export const batchService = {
  getBatches: async () => {
    await sleep(300);
    return [...batches];
  },
  getBatchById: async (id: string) => {
    await sleep(200);
    return batches.find(b => b.id === id) || batches[0];
  },
  finalizeBatch: async (id: string) => {
    await sleep(500);
    const batch = batches.find(b => b.id === id);
    if (batch) batch.status = 'finalized';
    return batch;
  },
};

// Certificates API
export const certificateService = {
  getCertificates: async () => {
    await sleep(300);
    return [...certificates];
  },
  getCertificateById: async (id: string) => {
    await sleep(200);
    return certificates.find(c => c.id === id) || certificates[0];
  },
  verifyCertificate: async (id: string) => {
    await sleep(400);
    const cert = certificates.find(c => c.id === id || c.batchId === id);
    return {
      isValid: true,
      certificate: cert || certificates[0],
      blockchainStatus: 'Verified on Polygon Mainnet',
      blockTimestamp: new Date().toISOString(),
    };
  },
};

// Reports API
export const reportService = {
  getReports: async () => {
    await sleep(300);
    return [...reports];
  },
  generateReport: async (batchId: string) => {
    await sleep(1000);
    const newReport: Report = {
      id: `RPT-${generateId().slice(0, 3).toUpperCase()}`,
      batchId,
      type: 'assessment',
      status: 'ready',
      certificateStatus: 'verified',
      downloadUrl: '#',
      farmerName: 'Rajesh Deshmukh',
      grade: 'A',
      qualityScore: 91,
      createdAt: new Date().toISOString(),
    };
    reports.unshift(newReport);
    return newReport;
  },
};

// Disputes API
export const disputeService = {
  getDisputes: async () => {
    await sleep(300);
    return [...disputes];
  },
  resolveDispute: async (id: string, humanGrade: string, comment: string) => {
    await sleep(600);
    const dispute = disputes.find(d => d.id === id);
    if (dispute) {
      dispute.status = 'resolved';
      dispute.humanGrade = humanGrade as any;
      dispute.expertComment = comment;
    }
    return dispute;
  },
};

// Regional Intelligence API
export const regionalService = {
  getRegionalRisks: async () => {
    await sleep(300);
    return [...regionalRisks];
  },
  getMarketPrices: async () => {
    await sleep(300);
    return [...priceData];
  },
};

// Integrity Alerts API
export const integrityService = {
  getAlerts: async () => {
    await sleep(300);
    return [...integrityAlerts];
  },
};

// Marketplace API
export const marketplaceService = {
  getListings: async () => {
    await sleep(300);
    return [...marketListings];
  },
};

// Admin API
export const adminService = {
  getModelVersions: async () => {
    await sleep(300);
    return [...modelVersions];
  },
  getAuditLogs: async () => {
    await sleep(300);
    return [...auditLogs];
  },
};
