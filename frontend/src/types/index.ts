// ============================================================
// OnionTrust AI — TypeScript Interfaces
// ============================================================

export type UserRole = 'farmer' | 'procurement_officer' | 'agricultural_expert' | 'buyer' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  region: string;
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  procurementCenter?: string;
  createdAt: string;
}

export interface Defect {
  type: 'rot' | 'bruising' | 'sprouting' | 'cuts' | 'cracks' | 'discoloration';
  percentage: number;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  maskUrl?: string;
}

export type Grade = 'A' | 'B' | 'C' | 'Rejected';

export interface Assessment {
  id: string;
  batchId: string;
  imageUrl: string;
  qualityScore: number;
  grade: Grade;
  confidence: number;
  variety: string;
  defects: Defect[];
  totalDefectArea: number;
  shelfLife: { min: number; max: number };
  estimatedPrice: { min: number; max: number };
  modelVersion: string;
  status: 'pending' | 'analyzing' | 'completed' | 'failed' | 'review_needed';
  explanation: string;
  farmer: string;
  procurementCenter: string;
  createdAt: string;
  updatedAt: string;
}

export interface GradeDistribution {
  A: number;
  B: number;
  C: number;
  Rejected: number;
}

export interface Batch {
  id: string;
  farmerId: string;
  farmerName: string;
  procurementCenter: string;
  variety: string;
  sampleCount: number;
  gradeDistribution: GradeDistribution;
  averageScore: number;
  defectRate: number;
  finalGrade: Grade;
  certificateId?: string;
  disputeStatus?: 'none' | 'submitted' | 'under_review' | 'resolved' | 'rejected';
  status: 'draft' | 'grading' | 'finalized' | 'certified';
  confidence: number;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  batchId: string;
  farmerName: string;
  procurementCenter: string;
  qualityScore: number;
  grade: Grade;
  variety: string;
  assessmentDate: string;
  modelVersion: string;
  imageHash: string;
  blockchainHash: string;
  transactionId: string;
  verificationStatus: 'verified' | 'pending' | 'failed';
  qrCode: string;
  createdAt: string;
}

export interface Dispute {
  id: string;
  batchId: string;
  farmerId: string;
  farmerName: string;
  procurementCenter: string;
  originalGrade: Grade;
  humanGrade?: Grade;
  originalScore: number;
  confidenceGap: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'submitted' | 'under_review' | 'expert_assigned' | 'resolved' | 'rejected' | 'escrow_locked';
  assignedExpert?: string;
  farmerComment: string;
  expertComment?: string;
  batchValue: number;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegionalRisk {
  region: string;
  lat: number;
  lng: number;
  riskScore: number;
  qualityScore: number;
  defectRate: number;
  rainfall: number;
  humidity: number;
  temperature: number;
  satelliteHealth: number;
  priceTrend: number;
  forecastConfidence: number;
  totalBatches: number;
}

export interface ProcurementCenter {
  id: string;
  name: string;
  code: string;
  region: string;
  lat: number;
  lng: number;
  averageQuality: number;
  gradeAPercentage: number;
  gradeBPercentage: number;
  gradeCPercentage: number;
  rejectionRate: number;
  processingVolume: number;
  avgAssessmentTime: number;
  disputeRate: number;
  offlineSyncStatus: 'synced' | 'pending' | 'offline';
  lastSyncTime: string;
  status: 'active' | 'maintenance' | 'offline';
}

export interface MarketListing {
  id: string;
  batchId: string;
  variety: string;
  grade: Grade;
  qualityScore: number;
  quantity: number;
  unit: string;
  region: string;
  defectPercentage: number;
  estimatedPrice: { min: number; max: number };
  availableDate: string;
  certificateVerified: boolean;
  farmerName: string;
  reputationScore: number;
  imageUrl: string;
  storageType: string;
  shelfLife: { min: number; max: number };
}

export interface Report {
  id: string;
  batchId: string;
  type: 'assessment' | 'batch' | 'analytics' | 'regional';
  status: 'generating' | 'ready' | 'failed';
  certificateStatus: 'pending' | 'issued' | 'verified';
  downloadUrl: string;
  farmerName: string;
  grade: Grade;
  qualityScore: number;
  createdAt: string;
}

export interface IntegrityAlert {
  id: string;
  type: 'grade_override' | 'duplicate_batch' | 'quality_change' | 'unusual_login' | 'high_dispute_rate' | 'grading_anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affectedUser?: string;
  affectedCenter?: string;
  evidence: string;
  status: 'new' | 'investigating' | 'resolved' | 'dismissed';
  recommendedAction: string;
  createdAt: string;
}

export interface ModelVersion {
  id: string;
  version: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  modelDrift: number;
  lastRetrainDate: string;
  datasetSize: number;
  status: 'deployed' | 'testing' | 'archived';
  lowConfidenceCount: number;
}

export interface WhatsAppConversation {
  id: string;
  phoneNumber: string;
  farmerName: string;
  language: string;
  lastMessage: string;
  lastMessageTime: string;
  status: 'active' | 'resolved' | 'pending';
  messageCount: number;
  voiceNoteCount: number;
}

export interface KnowledgeGraphNode {
  id: string;
  type: 'farmer' | 'batch' | 'assessment' | 'grade' | 'center' | 'mandi' | 'price' | 'payment';
  label: string;
  properties: Record<string, string | number>;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  relationship: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  resource: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface WeatherData {
  region: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface PriceData {
  date: string;
  mandi: string;
  variety: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  volume: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface DashboardKPIs {
  totalAssessments: number;
  todayBatches: number;
  averageQualityScore: number;
  gradeAPercentage: number;
  activeDisputes: number;
  blockchainCertificates: number;
  pendingReviews: number;
  integrityAlerts: number;
}

export interface AnalyticsFilter {
  dateRange: { start: string; end: string };
  region?: string;
  center?: string;
  variety?: string;
  grade?: Grade;
  farmer?: string;
}

export type Language = 'en' | 'hi' | 'mr';

export interface DigitalTwinCenter {
  id: string;
  name: string;
  queueLength: number;
  activeAssessments: number;
  averageGrade: string;
  disputes: number;
  offlineSessions: number;
  lastSyncTime: string;
  processingCapacity: number;
  capacityUsed: number;
  qualityTrend: 'improving' | 'stable' | 'declining';
  healthStatus: 'healthy' | 'warning' | 'critical';
}
