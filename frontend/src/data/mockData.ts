// ============================================================
// OnionTrust AI — Mock Data
// Realistic Indian agricultural demo data
// ALL data is DEMO DATA — clearly marked as such
// ============================================================

import type {
  Assessment, Batch, Certificate, Dispute, RegionalRisk,
  ProcurementCenter, MarketListing, Report, IntegrityAlert,
  ModelVersion, WhatsAppConversation, AuditLogEntry, PriceData,
  Notification, DashboardKPIs, DigitalTwinCenter, KnowledgeGraphNode,
  KnowledgeGraphEdge
} from '@/types';

// ---- Dashboard KPIs ----
export const dashboardKPIs: DashboardKPIs = {
  totalAssessments: 1248,
  todayBatches: 47,
  averageQualityScore: 87.4,
  gradeAPercentage: 68,
  activeDisputes: 12,
  blockchainCertificates: 892,
  pendingReviews: 23,
  integrityAlerts: 5,
};

// ---- Assessments ----
export const assessments: Assessment[] = [
  {
    id: 'ASM-2026-0001',
    batchId: 'ON-2026-1042',
    imageUrl: '',
    qualityScore: 91,
    grade: 'A',
    confidence: 96,
    variety: 'Nashik Red',
    defects: [
      { type: 'rot', percentage: 1.0, severity: 'low', confidence: 94, maskUrl: '' },
      { type: 'bruising', percentage: 3.0, severity: 'low', confidence: 92, maskUrl: '' },
      { type: 'sprouting', percentage: 0, severity: 'low', confidence: 98, maskUrl: '' },
      { type: 'discoloration', percentage: 0.2, severity: 'low', confidence: 95, maskUrl: '' },
    ],
    totalDefectArea: 4.2,
    shelfLife: { min: 18, max: 22 },
    estimatedPrice: { min: 2800, max: 3150 },
    modelVersion: 'v3.2.1',
    status: 'completed',
    explanation: 'Grade A was assigned because the total detected defect area is below the 5% threshold. Rot is minimal at 1%, bruising is within acceptable limits at 3%. The onions show good firmness and consistent coloring typical of premium Nashik Red variety.',
    farmer: 'Rajesh Deshmukh',
    procurementCenter: 'Nashik Central',
    createdAt: '2026-09-16T08:30:00Z',
    updatedAt: '2026-09-16T08:35:00Z',
  },
  {
    id: 'ASM-2026-0002',
    batchId: 'ON-2026-1041',
    imageUrl: '',
    qualityScore: 76,
    grade: 'B',
    confidence: 88,
    variety: 'Nashik Red',
    defects: [
      { type: 'rot', percentage: 4.0, severity: 'medium', confidence: 90, maskUrl: '' },
      { type: 'bruising', percentage: 6.5, severity: 'medium', confidence: 87, maskUrl: '' },
      { type: 'sprouting', percentage: 2.0, severity: 'low', confidence: 91, maskUrl: '' },
      { type: 'discoloration', percentage: 3.5, severity: 'low', confidence: 89, maskUrl: '' },
    ],
    totalDefectArea: 16.0,
    shelfLife: { min: 12, max: 16 },
    estimatedPrice: { min: 2200, max: 2600 },
    modelVersion: 'v3.2.1',
    status: 'completed',
    explanation: 'Grade B was assigned due to moderate bruising (6.5%) and rot (4%). While individual defect types are within Grade A limits, the cumulative defect area of 16% exceeds the Grade A threshold of 10%. Storage conditions should be monitored.',
    farmer: 'Anita Shinde',
    procurementCenter: 'Nashik Central',
    createdAt: '2026-09-16T07:15:00Z',
    updatedAt: '2026-09-16T07:20:00Z',
  },
  {
    id: 'ASM-2026-0003',
    batchId: 'ON-2026-1040',
    imageUrl: '',
    qualityScore: 93,
    grade: 'A',
    confidence: 97,
    variety: 'Bellary',
    defects: [
      { type: 'rot', percentage: 0.5, severity: 'low', confidence: 96, maskUrl: '' },
      { type: 'bruising', percentage: 1.5, severity: 'low', confidence: 95, maskUrl: '' },
      { type: 'sprouting', percentage: 0, severity: 'low', confidence: 99, maskUrl: '' },
      { type: 'discoloration', percentage: 0.5, severity: 'low', confidence: 97, maskUrl: '' },
    ],
    totalDefectArea: 2.5,
    shelfLife: { min: 20, max: 26 },
    estimatedPrice: { min: 3000, max: 3400 },
    modelVersion: 'v3.2.1',
    status: 'completed',
    explanation: 'Excellent quality Bellary variety with minimal defects. Total defect area of 2.5% is well below the Grade A threshold. Extended shelf life expected due to low moisture and good skin integrity.',
    farmer: 'Vikram Jadhav',
    procurementCenter: 'Pune West',
    createdAt: '2026-09-15T14:30:00Z',
    updatedAt: '2026-09-15T14:35:00Z',
  },
  {
    id: 'ASM-2026-0004',
    batchId: 'ON-2026-1039',
    imageUrl: '',
    qualityScore: 62,
    grade: 'C',
    confidence: 82,
    variety: 'White Onion',
    defects: [
      { type: 'rot', percentage: 8.0, severity: 'high', confidence: 85, maskUrl: '' },
      { type: 'bruising', percentage: 10.0, severity: 'high', confidence: 83, maskUrl: '' },
      { type: 'sprouting', percentage: 5.0, severity: 'medium', confidence: 86, maskUrl: '' },
      { type: 'discoloration', percentage: 4.0, severity: 'medium', confidence: 84, maskUrl: '' },
    ],
    totalDefectArea: 27.0,
    shelfLife: { min: 6, max: 10 },
    estimatedPrice: { min: 1400, max: 1800 },
    modelVersion: 'v3.2.1',
    status: 'review_needed',
    explanation: 'Grade C due to significant rot (8%) and bruising (10%). Sprouting indicates storage issues. Recommend immediate processing or sale. Expert review suggested due to lower confidence.',
    farmer: 'Suresh Gaikwad',
    procurementCenter: 'Ahmednagar East',
    createdAt: '2026-09-15T11:00:00Z',
    updatedAt: '2026-09-15T11:10:00Z',
  },
  {
    id: 'ASM-2026-0005',
    batchId: 'ON-2026-1038',
    imageUrl: '',
    qualityScore: 42,
    grade: 'Rejected',
    confidence: 91,
    variety: 'Red Onion',
    defects: [
      { type: 'rot', percentage: 18.0, severity: 'high', confidence: 93, maskUrl: '' },
      { type: 'bruising', percentage: 12.0, severity: 'high', confidence: 90, maskUrl: '' },
      { type: 'sprouting', percentage: 8.0, severity: 'high', confidence: 92, maskUrl: '' },
      { type: 'cuts', percentage: 3.0, severity: 'medium', confidence: 88, maskUrl: '' },
      { type: 'discoloration', percentage: 7.0, severity: 'high', confidence: 91, maskUrl: '' },
    ],
    totalDefectArea: 48.0,
    shelfLife: { min: 2, max: 5 },
    estimatedPrice: { min: 600, max: 900 },
    modelVersion: 'v3.2.1',
    status: 'completed',
    explanation: 'Rejected due to extensive rot (18%) and high overall defect area (48%). These onions are not suitable for direct sale. Recommend processing for dehydration or reject.',
    farmer: 'Manoj Pawar',
    procurementCenter: 'Solapur South',
    createdAt: '2026-09-14T16:00:00Z',
    updatedAt: '2026-09-14T16:08:00Z',
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `ASM-2026-${String(6 + i).padStart(4, '0')}`,
    batchId: `ON-2026-${1037 - i}`,
    imageUrl: '',
    qualityScore: Math.floor(Math.random() * 40 + 55),
    grade: (['A', 'A', 'A', 'B', 'B', 'C', 'A', 'B', 'A', 'A', 'B', 'A', 'C', 'A', 'B'] as const)[i],
    confidence: Math.floor(Math.random() * 15 + 82),
    variety: (['Nashik Red', 'Bellary', 'White Onion', 'Red Onion', 'Nashik Red'])[i % 5],
    defects: [
      { type: 'rot' as const, percentage: Math.random() * 5, severity: 'low' as const, confidence: 90, maskUrl: '' },
      { type: 'bruising' as const, percentage: Math.random() * 8, severity: 'low' as const, confidence: 88, maskUrl: '' },
    ],
    totalDefectArea: Math.random() * 15 + 2,
    shelfLife: { min: 10 + Math.floor(Math.random() * 10), max: 16 + Math.floor(Math.random() * 10) },
    estimatedPrice: { min: 1800 + Math.floor(Math.random() * 1000), max: 2400 + Math.floor(Math.random() * 1000) },
    modelVersion: 'v3.2.1',
    status: 'completed' as const,
    explanation: 'Standard assessment completed.',
    farmer: (['Rajesh Deshmukh', 'Anita Shinde', 'Vikram Jadhav', 'Suresh Gaikwad', 'Manoj Pawar', 'Prashant Bhosale', 'Kavita More'])[i % 7],
    procurementCenter: (['Nashik Central', 'Pune West', 'Ahmednagar East'])[i % 3],
    createdAt: new Date(2026, 8, 14 - Math.floor(i / 3), 8 + i).toISOString(),
    updatedAt: new Date(2026, 8, 14 - Math.floor(i / 3), 8 + i, 5).toISOString(),
  })),
];

// ---- Batches ----
export const batches: Batch[] = [
  {
    id: 'ON-2026-1042',
    farmerId: 'USR-F001',
    farmerName: 'Rajesh Deshmukh',
    procurementCenter: 'Nashik Central',
    variety: 'Nashik Red',
    sampleCount: 100,
    gradeDistribution: { A: 68, B: 24, C: 6, Rejected: 2 },
    averageScore: 87,
    defectRate: 8,
    finalGrade: 'A',
    certificateId: 'CERT-2026-0892',
    disputeStatus: 'none',
    status: 'certified',
    confidence: 94,
    createdAt: '2026-09-16T08:00:00Z',
    updatedAt: '2026-09-16T09:00:00Z',
  },
  {
    id: 'ON-2026-1041',
    farmerId: 'USR-F002',
    farmerName: 'Anita Shinde',
    procurementCenter: 'Nashik Central',
    variety: 'Nashik Red',
    sampleCount: 80,
    gradeDistribution: { A: 42, B: 28, C: 8, Rejected: 2 },
    averageScore: 76,
    defectRate: 16,
    finalGrade: 'B',
    disputeStatus: 'submitted',
    status: 'finalized',
    confidence: 88,
    createdAt: '2026-09-16T07:00:00Z',
    updatedAt: '2026-09-16T08:00:00Z',
  },
  {
    id: 'ON-2026-1040',
    farmerId: 'USR-F003',
    farmerName: 'Vikram Jadhav',
    procurementCenter: 'Pune West',
    variety: 'Bellary',
    sampleCount: 120,
    gradeDistribution: { A: 96, B: 20, C: 3, Rejected: 1 },
    averageScore: 93,
    defectRate: 2.5,
    finalGrade: 'A',
    certificateId: 'CERT-2026-0891',
    disputeStatus: 'none',
    status: 'certified',
    confidence: 97,
    createdAt: '2026-09-15T14:00:00Z',
    updatedAt: '2026-09-15T15:00:00Z',
  },
  {
    id: 'ON-2026-1039',
    farmerId: 'USR-F004',
    farmerName: 'Suresh Gaikwad',
    procurementCenter: 'Ahmednagar East',
    variety: 'White Onion',
    sampleCount: 60,
    gradeDistribution: { A: 18, B: 22, C: 14, Rejected: 6 },
    averageScore: 62,
    defectRate: 27,
    finalGrade: 'C',
    disputeStatus: 'under_review',
    status: 'finalized',
    confidence: 82,
    createdAt: '2026-09-15T11:00:00Z',
    updatedAt: '2026-09-15T12:00:00Z',
  },
];

// ---- Certificates ----
export const certificates: Certificate[] = [
  {
    id: 'CERT-2026-0892',
    batchId: 'ON-2026-1042',
    farmerName: 'Rajesh Deshmukh',
    procurementCenter: 'Nashik Central',
    qualityScore: 91,
    grade: 'A',
    variety: 'Nashik Red',
    assessmentDate: '2026-09-16T08:35:00Z',
    modelVersion: 'v3.2.1',
    imageHash: 'sha256:a1b2c3d4e5f6...7890abcdef',
    blockchainHash: '0x7f8e9d0c1b2a3456789012345678901234567890abcdef1234567890abcdef12',
    transactionId: '0xabc123def456...789012',
    verificationStatus: 'verified',
    qrCode: '',
    createdAt: '2026-09-16T09:00:00Z',
  },
  {
    id: 'CERT-2026-0891',
    batchId: 'ON-2026-1040',
    farmerName: 'Vikram Jadhav',
    procurementCenter: 'Pune West',
    qualityScore: 93,
    grade: 'A',
    variety: 'Bellary',
    assessmentDate: '2026-09-15T14:35:00Z',
    modelVersion: 'v3.2.1',
    imageHash: 'sha256:b2c3d4e5f678...901234abcd',
    blockchainHash: '0x8e9d0c1b2a345678901234567890abcdef1234567890abcdef1234567890abcd',
    transactionId: '0xdef789ghi012...345678',
    verificationStatus: 'verified',
    qrCode: '',
    createdAt: '2026-09-15T15:30:00Z',
  },
];

// ---- Disputes ----
export const disputes: Dispute[] = [
  {
    id: 'DIS-2026-0012',
    batchId: 'ON-2026-1041',
    farmerId: 'USR-F002',
    farmerName: 'Anita Shinde',
    procurementCenter: 'Nashik Central',
    originalGrade: 'B',
    humanGrade: 'A',
    originalScore: 76,
    confidenceGap: 12,
    priority: 'high',
    status: 'under_review',
    assignedExpert: 'Dr. Meena Kulkarni',
    farmerComment: 'I believe the AI misjudged the bruising. The dark spots are natural coloring of the Nashik Red variety, not bruising.',
    batchValue: 186000,
    createdAt: '2026-09-16T09:30:00Z',
    updatedAt: '2026-09-16T10:00:00Z',
  },
  {
    id: 'DIS-2026-0011',
    batchId: 'ON-2026-1039',
    farmerId: 'USR-F004',
    farmerName: 'Suresh Gaikwad',
    procurementCenter: 'Ahmednagar East',
    originalGrade: 'C',
    originalScore: 62,
    confidenceGap: 18,
    priority: 'medium',
    status: 'expert_assigned',
    assignedExpert: 'Dr. Meena Kulkarni',
    farmerComment: 'The images were taken in poor lighting conditions. Request re-assessment.',
    batchValue: 92000,
    createdAt: '2026-09-15T12:00:00Z',
    updatedAt: '2026-09-15T14:00:00Z',
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `DIS-2026-${String(10 - i).padStart(4, '0')}`,
    batchId: `ON-2026-${1035 - i}`,
    farmerId: `USR-F${String(5 + i).padStart(3, '0')}`,
    farmerName: (['Prashant Bhosale', 'Kavita More', 'Dinesh Wagh', 'Sunita Patil', 'Ramesh Chavan', 'Neha Bhagat', 'Ganesh Mane', 'Jyoti Kadam', 'Sanjay Nikam', 'Pooja Shejwal'])[i],
    procurementCenter: (['Nashik Central', 'Pune West', 'Ahmednagar East'])[i % 3],
    originalGrade: (['B', 'C', 'B', 'C', 'Rejected', 'B', 'C', 'B', 'B', 'C'] as const)[i],
    originalScore: [74, 58, 72, 64, 38, 70, 55, 75, 69, 61][i],
    confidenceGap: [8, 15, 10, 20, 5, 12, 18, 7, 14, 16][i],
    priority: (['medium', 'high', 'low', 'critical', 'low', 'medium', 'high', 'low', 'medium', 'high'] as const)[i],
    status: (['submitted', 'resolved', 'submitted', 'under_review', 'rejected', 'resolved', 'expert_assigned', 'submitted', 'resolved', 'under_review'] as const)[i],
    assignedExpert: i % 3 === 0 ? 'Dr. Meena Kulkarni' : undefined,
    farmerComment: 'Request re-assessment of this batch.',
    batchValue: 50000 + Math.floor(Math.random() * 150000),
    createdAt: new Date(2026, 8, 14 - i, 10).toISOString(),
    updatedAt: new Date(2026, 8, 14 - i, 12).toISOString(),
  })),
];

// ---- Regional Risk ----
export const regionalRisks: RegionalRisk[] = [
  { region: 'Nashik', lat: 19.9975, lng: 73.7898, riskScore: 22, qualityScore: 89, defectRate: 6.5, rainfall: 12, humidity: 65, temperature: 28, satelliteHealth: 82, priceTrend: 6.2, forecastConfidence: 88, totalBatches: 420 },
  { region: 'Pune', lat: 18.5204, lng: 73.8567, riskScore: 35, qualityScore: 84, defectRate: 10.2, rainfall: 18, humidity: 72, temperature: 26, satelliteHealth: 76, priceTrend: 3.1, forecastConfidence: 82, totalBatches: 280 },
  { region: 'Ahmednagar', lat: 19.0948, lng: 74.7480, riskScore: 48, qualityScore: 77, defectRate: 15.8, rainfall: 8, humidity: 58, temperature: 32, satelliteHealth: 68, priceTrend: -2.4, forecastConfidence: 75, totalBatches: 195 },
  { region: 'Solapur', lat: 17.6599, lng: 75.9064, riskScore: 55, qualityScore: 72, defectRate: 18.3, rainfall: 5, humidity: 52, temperature: 35, satelliteHealth: 62, priceTrend: -4.8, forecastConfidence: 70, totalBatches: 145 },
  { region: 'Satara', lat: 17.6805, lng: 74.0183, riskScore: 30, qualityScore: 86, defectRate: 8.1, rainfall: 22, humidity: 70, temperature: 25, satelliteHealth: 80, priceTrend: 4.5, forecastConfidence: 85, totalBatches: 168 },
];

// ---- Procurement Centers ----
export const procurementCenters: ProcurementCenter[] = [
  { id: 'PC-001', name: 'Nashik Central', code: 'NC', region: 'Nashik', lat: 19.9975, lng: 73.7898, averageQuality: 91, gradeAPercentage: 72, gradeBPercentage: 23, gradeCPercentage: 5, rejectionRate: 2, processingVolume: 450, avgAssessmentTime: 3.2, disputeRate: 4, offlineSyncStatus: 'synced', lastSyncTime: '2026-09-16T12:05:00Z', status: 'active' },
  { id: 'PC-002', name: 'Pune West', code: 'PW', region: 'Pune', lat: 18.5204, lng: 73.8567, averageQuality: 85, gradeAPercentage: 61, gradeBPercentage: 31, gradeCPercentage: 8, rejectionRate: 4, processingVolume: 320, avgAssessmentTime: 4.1, disputeRate: 7, offlineSyncStatus: 'synced', lastSyncTime: '2026-09-16T12:02:00Z', status: 'active' },
  { id: 'PC-003', name: 'Ahmednagar East', code: 'AE', region: 'Ahmednagar', lat: 19.0948, lng: 74.7480, averageQuality: 77, gradeAPercentage: 49, gradeBPercentage: 38, gradeCPercentage: 13, rejectionRate: 8, processingVolume: 180, avgAssessmentTime: 5.3, disputeRate: 12, offlineSyncStatus: 'pending', lastSyncTime: '2026-09-16T11:45:00Z', status: 'active' },
];

// ---- Market Listings ----
export const marketListings: MarketListing[] = [
  { id: 'ML-001', batchId: 'ON-2026-1042', variety: 'Nashik Red', grade: 'A', qualityScore: 91, quantity: 50, unit: 'quintals', region: 'Nashik', defectPercentage: 4.2, estimatedPrice: { min: 2800, max: 3150 }, availableDate: '2026-09-18', certificateVerified: true, farmerName: 'Rajesh Deshmukh', reputationScore: 92, imageUrl: '', storageType: 'Cold storage', shelfLife: { min: 18, max: 22 } },
  { id: 'ML-002', batchId: 'ON-2026-1040', variety: 'Bellary', grade: 'A', qualityScore: 93, quantity: 75, unit: 'quintals', region: 'Pune', defectPercentage: 2.5, estimatedPrice: { min: 3000, max: 3400 }, availableDate: '2026-09-17', certificateVerified: true, farmerName: 'Vikram Jadhav', reputationScore: 95, imageUrl: '', storageType: 'Cold storage', shelfLife: { min: 20, max: 26 } },
  { id: 'ML-003', batchId: 'ON-2026-1036', variety: 'White Onion', grade: 'B', qualityScore: 78, quantity: 30, unit: 'quintals', region: 'Satara', defectPercentage: 12.5, estimatedPrice: { min: 2200, max: 2600 }, availableDate: '2026-09-19', certificateVerified: true, farmerName: 'Prashant Bhosale', reputationScore: 84, imageUrl: '', storageType: 'Sack storage', shelfLife: { min: 12, max: 16 } },
  { id: 'ML-004', batchId: 'ON-2026-1035', variety: 'Red Onion', grade: 'A', qualityScore: 88, quantity: 40, unit: 'quintals', region: 'Nashik', defectPercentage: 6.1, estimatedPrice: { min: 2600, max: 3000 }, availableDate: '2026-09-20', certificateVerified: true, farmerName: 'Kavita More', reputationScore: 89, imageUrl: '', storageType: 'Open air', shelfLife: { min: 14, max: 18 } },
  { id: 'ML-005', batchId: 'ON-2026-1034', variety: 'Nashik Red', grade: 'B', qualityScore: 74, quantity: 65, unit: 'quintals', region: 'Ahmednagar', defectPercentage: 14.0, estimatedPrice: { min: 2000, max: 2400 }, availableDate: '2026-09-18', certificateVerified: false, farmerName: 'Dinesh Wagh', reputationScore: 78, imageUrl: '', storageType: 'Sack storage', shelfLife: { min: 10, max: 14 } },
];

// ---- Reports ----
export const reports: Report[] = [
  { id: 'RPT-001', batchId: 'ON-2026-1042', type: 'assessment', status: 'ready', certificateStatus: 'verified', downloadUrl: '', farmerName: 'Rajesh Deshmukh', grade: 'A', qualityScore: 91, createdAt: '2026-09-16T09:00:00Z' },
  { id: 'RPT-002', batchId: 'ON-2026-1041', type: 'assessment', status: 'ready', certificateStatus: 'pending', downloadUrl: '', farmerName: 'Anita Shinde', grade: 'B', qualityScore: 76, createdAt: '2026-09-16T08:00:00Z' },
  { id: 'RPT-003', batchId: 'ON-2026-1040', type: 'batch', status: 'ready', certificateStatus: 'verified', downloadUrl: '', farmerName: 'Vikram Jadhav', grade: 'A', qualityScore: 93, createdAt: '2026-09-15T15:30:00Z' },
  { id: 'RPT-004', batchId: 'ON-2026-1039', type: 'assessment', status: 'generating', certificateStatus: 'pending', downloadUrl: '', farmerName: 'Suresh Gaikwad', grade: 'C', qualityScore: 62, createdAt: '2026-09-15T12:00:00Z' },
];

// ---- Integrity Alerts ----
export const integrityAlerts: IntegrityAlert[] = [
  { id: 'IA-001', type: 'grade_override', severity: 'high', title: 'Frequent grade overrides detected', description: 'Officer Rahul Mehta at Ahmednagar East has overridden AI grades 14 times in the last 7 days, significantly above the center average of 3.', affectedUser: 'Rahul Mehta', affectedCenter: 'Ahmednagar East', evidence: '14 overrides in 7 days vs. center avg of 3. 85% were upgrades from B→A.', status: 'investigating', recommendedAction: 'Review override history and cross-check with expert assessments. Consider audit.', createdAt: '2026-09-16T06:00:00Z' },
  { id: 'IA-002', type: 'duplicate_batch', severity: 'medium', title: 'Potential duplicate batch submission', description: 'Batch ON-2026-1028 shows 94% image similarity with batch ON-2026-1015 submitted 3 days earlier.', affectedUser: 'Suresh Gaikwad', affectedCenter: 'Ahmednagar East', evidence: '94% perceptual hash similarity. Same farmer, same variety, 3-day gap.', status: 'new', recommendedAction: 'Verify batch identity with physical inspection. Flag for procurement officer review.', createdAt: '2026-09-15T18:00:00Z' },
  { id: 'IA-003', type: 'quality_change', severity: 'critical', title: 'Sudden quality drop at Center C', description: 'Ahmednagar East average quality dropped from 82 to 71 in the last 48 hours, a 13.4% decline.', affectedCenter: 'Ahmednagar East', evidence: 'Quality score trend: 82→78→74→71 over 4 assessment windows. Defect rate up 45%.', status: 'new', recommendedAction: 'Investigate potential environmental factors, equipment issues, or data integrity problems.', createdAt: '2026-09-16T04:00:00Z' },
  { id: 'IA-004', type: 'unusual_login', severity: 'low', title: 'Login from new location', description: 'Admin user Priya Joshi logged in from an IP in Delhi, which is outside the usual Maharashtra region.', affectedUser: 'Priya Joshi', evidence: 'IP geolocation: Delhi (28.6°N, 77.2°E). Usual location: Pune (18.5°N, 73.9°E).', status: 'dismissed', recommendedAction: 'Confirm with user. If unauthorized, reset credentials and audit recent actions.', createdAt: '2026-09-14T22:00:00Z' },
  { id: 'IA-005', type: 'grading_anomaly', severity: 'medium', title: 'Statistical grading anomaly', description: 'Center C shows significant grading variation compared with other centers. Grade A rate is 20pp below network average.', affectedCenter: 'Ahmednagar East', evidence: 'Grade A: 49% vs. network avg 67%. Isolation Forest anomaly score: 0.78.', status: 'investigating', recommendedAction: 'Cross-validate with expert assessments. Review calibration and environmental factors.', createdAt: '2026-09-15T10:00:00Z' },
];

// ---- Model Versions ----
export const modelVersions: ModelVersion[] = [
  { id: 'MDL-001', version: 'v3.2.1', accuracy: 94.2, precision: 93.8, recall: 94.6, f1Score: 94.2, modelDrift: 1.2, lastRetrainDate: '2026-09-01T00:00:00Z', datasetSize: 48500, status: 'deployed', lowConfidenceCount: 23 },
  { id: 'MDL-002', version: 'v3.2.0', accuracy: 93.5, precision: 93.1, recall: 93.9, f1Score: 93.5, modelDrift: 2.1, lastRetrainDate: '2026-08-15T00:00:00Z', datasetSize: 45200, status: 'archived', lowConfidenceCount: 31 },
  { id: 'MDL-003', version: 'v3.3.0-beta', accuracy: 95.1, precision: 94.7, recall: 95.5, f1Score: 95.1, modelDrift: 0.5, lastRetrainDate: '2026-09-10T00:00:00Z', datasetSize: 52000, status: 'testing', lowConfidenceCount: 12 },
];

// ---- WhatsApp Conversations ----
export const whatsappConversations: WhatsAppConversation[] = [
  { id: 'WA-001', phoneNumber: '+91 98765 XXXXX', farmerName: 'Rajesh Deshmukh', language: 'Hindi', lastMessage: 'मेरी रिपोर्ट भेजो', lastMessageTime: '2026-09-16T10:30:00Z', status: 'active', messageCount: 12, voiceNoteCount: 3 },
  { id: 'WA-002', phoneNumber: '+91 87654 XXXXX', farmerName: 'Anita Shinde', language: 'Marathi', lastMessage: 'माझा बॅच तपासा ON-2026-1041', lastMessageTime: '2026-09-16T09:15:00Z', status: 'resolved', messageCount: 8, voiceNoteCount: 1 },
  { id: 'WA-003', phoneNumber: '+91 76543 XXXXX', farmerName: 'Vikram Jadhav', language: 'English', lastMessage: 'What grade did I get?', lastMessageTime: '2026-09-16T08:45:00Z', status: 'resolved', messageCount: 5, voiceNoteCount: 0 },
  { id: 'WA-004', phoneNumber: '+91 65432 XXXXX', farmerName: 'Dinesh Wagh', language: 'Hinglish', lastMessage: 'Bhai mera certificate kab aayega?', lastMessageTime: '2026-09-15T16:20:00Z', status: 'pending', messageCount: 3, voiceNoteCount: 2 },
];

// ---- Audit Logs ----
export const auditLogs: AuditLogEntry[] = [
  { id: 'AUD-001', action: 'CERTIFICATE_ISSUED', userId: 'USR-P001', userName: 'Sahil Kamble', userRole: 'procurement_officer', resource: 'CERT-2026-0892', details: 'Blockchain certificate issued for batch ON-2026-1042', ipAddress: '192.168.1.xxx', timestamp: '2026-09-16T09:00:00Z' },
  { id: 'AUD-002', action: 'GRADE_OVERRIDE', userId: 'USR-P003', userName: 'Rahul Mehta', userRole: 'procurement_officer', resource: 'ASM-2026-0004', details: 'Manual grade override: C → B (Reason: Environmental factors)', ipAddress: '192.168.2.xxx', timestamp: '2026-09-16T08:45:00Z' },
  { id: 'AUD-003', action: 'DISPUTE_SUBMITTED', userId: 'USR-F002', userName: 'Anita Shinde', userRole: 'farmer', resource: 'DIS-2026-0012', details: 'Dispute submitted for batch ON-2026-1041', ipAddress: '10.0.0.xxx', timestamp: '2026-09-16T09:30:00Z' },
  { id: 'AUD-004', action: 'MODEL_DEPLOYED', userId: 'USR-A001', userName: 'Priya Joshi', userRole: 'admin', resource: 'MDL-001', details: 'Model v3.2.1 deployed to production', ipAddress: '192.168.1.xxx', timestamp: '2026-09-01T00:30:00Z' },
  { id: 'AUD-005', action: 'USER_LOGIN', userId: 'USR-A001', userName: 'Priya Joshi', userRole: 'admin', resource: 'Session', details: 'Login from Delhi IP — flagged for review', ipAddress: '103.25.xxx.xxx', timestamp: '2026-09-14T22:00:00Z' },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `AUD-${String(6 + i).padStart(3, '0')}`,
    action: (['ASSESSMENT_CREATED', 'BATCH_FINALIZED', 'REPORT_GENERATED', 'USER_LOGIN', 'CERTIFICATE_ISSUED'])[i % 5],
    userId: `USR-${(['F', 'P', 'E', 'A'])[i % 4]}${String(1 + (i % 3)).padStart(3, '0')}`,
    userName: (['Rajesh Deshmukh', 'Sahil Kamble', 'Dr. Meena Kulkarni', 'Priya Joshi', 'Anita Shinde'])[i % 5],
    userRole: (['farmer', 'procurement_officer', 'agricultural_expert', 'admin', 'farmer'] as const)[i % 5],
    resource: `Resource-${i}`,
    details: `Automated audit log entry #${i + 6}`,
    ipAddress: '192.168.x.xxx',
    timestamp: new Date(2026, 8, 16 - Math.floor(i / 4), 8 + (i % 12)).toISOString(),
  })),
];

// ---- Price Data ----
export const priceData: PriceData[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2026, 7, 18 + i).toISOString().split('T')[0],
  mandi: 'Lasalgaon',
  variety: 'Nashik Red',
  minPrice: 2200 + Math.floor(Math.random() * 400),
  maxPrice: 3000 + Math.floor(Math.random() * 400),
  avgPrice: 2600 + Math.floor(Math.sin(i / 5) * 300),
  volume: 800 + Math.floor(Math.random() * 400),
}));

// ---- Notifications ----
export const notifications: Notification[] = [
  { id: 'N-001', title: 'New batch assessed', message: '7 new batch photos are waiting for quality review.', type: 'info', read: false, link: '/assessments', createdAt: '2026-09-16T10:00:00Z' },
  { id: 'N-002', title: 'Dispute resolved', message: 'Dispute DIS-2026-0010 has been resolved in favor of the farmer.', type: 'success', read: false, link: '/disputes', createdAt: '2026-09-16T09:00:00Z' },
  { id: 'N-003', title: 'Integrity alert', message: 'Frequent grade overrides detected at Ahmednagar East.', type: 'warning', read: false, link: '/integrity-alerts', createdAt: '2026-09-16T06:00:00Z' },
  { id: 'N-004', title: 'Certificate issued', message: 'Blockchain certificate CERT-2026-0892 verified successfully.', type: 'success', read: true, link: '/blockchain-certificates', createdAt: '2026-09-16T09:00:00Z' },
  { id: 'N-005', title: 'Model update available', message: 'Model v3.3.0-beta is ready for testing with 95.1% accuracy.', type: 'info', read: true, link: '/admin/model-management', createdAt: '2026-09-15T12:00:00Z' },
];

// ---- Digital Twin Centers ----
export const digitalTwinCenters: DigitalTwinCenter[] = [
  { id: 'PC-001', name: 'Nashik Central', queueLength: 8, activeAssessments: 3, averageGrade: 'A', disputes: 2, offlineSessions: 0, lastSyncTime: '2026-09-16T12:05:00Z', processingCapacity: 20, capacityUsed: 15, qualityTrend: 'improving', healthStatus: 'healthy' },
  { id: 'PC-002', name: 'Pune West', queueLength: 5, activeAssessments: 2, averageGrade: 'B', disputes: 3, offlineSessions: 1, lastSyncTime: '2026-09-16T12:02:00Z', processingCapacity: 15, capacityUsed: 10, qualityTrend: 'stable', healthStatus: 'healthy' },
  { id: 'PC-003', name: 'Ahmednagar East', queueLength: 12, activeAssessments: 1, averageGrade: 'C', disputes: 5, offlineSessions: 2, lastSyncTime: '2026-09-16T11:45:00Z', processingCapacity: 12, capacityUsed: 11, qualityTrend: 'declining', healthStatus: 'warning' },
];

// ---- Knowledge Graph ----
export const knowledgeGraphNodes: KnowledgeGraphNode[] = [
  { id: 'KG-F1', type: 'farmer', label: 'R. Deshmukh', properties: { region: 'Nashik', batches: 42, avgGrade: 'A' } },
  { id: 'KG-F2', type: 'farmer', label: 'A. Shinde', properties: { region: 'Nashik', batches: 28, avgGrade: 'B' } },
  { id: 'KG-B1', type: 'batch', label: 'ON-2026-1042', properties: { grade: 'A', score: 91 } },
  { id: 'KG-B2', type: 'batch', label: 'ON-2026-1041', properties: { grade: 'B', score: 76 } },
  { id: 'KG-A1', type: 'assessment', label: 'ASM-0001', properties: { confidence: 96, defects: 4.2 } },
  { id: 'KG-G1', type: 'grade', label: 'Grade A', properties: { threshold: 85, count: 848 } },
  { id: 'KG-G2', type: 'grade', label: 'Grade B', properties: { threshold: 65, count: 299 } },
  { id: 'KG-C1', type: 'center', label: 'Nashik Central', properties: { volume: 450, quality: 91 } },
  { id: 'KG-M1', type: 'mandi', label: 'Lasalgaon', properties: { avgPrice: 2850, volume: 1200 } },
  { id: 'KG-P1', type: 'price', label: '₹2,850/q', properties: { trend: '+6.2%', date: '2026-09-16' } },
  { id: 'KG-PM1', type: 'payment', label: 'PAY-001', properties: { amount: 142500, status: 'completed' } },
];

export const knowledgeGraphEdges: KnowledgeGraphEdge[] = [
  { source: 'KG-F1', target: 'KG-B1', relationship: 'submitted' },
  { source: 'KG-F2', target: 'KG-B2', relationship: 'submitted' },
  { source: 'KG-B1', target: 'KG-A1', relationship: 'assessed_by' },
  { source: 'KG-A1', target: 'KG-G1', relationship: 'graded_as' },
  { source: 'KG-B1', target: 'KG-C1', relationship: 'processed_at' },
  { source: 'KG-C1', target: 'KG-M1', relationship: 'supplies_to' },
  { source: 'KG-M1', target: 'KG-P1', relationship: 'current_price' },
  { source: 'KG-B1', target: 'KG-PM1', relationship: 'payment' },
  { source: 'KG-F2', target: 'KG-B2', relationship: 'submitted' },
  { source: 'KG-B2', target: 'KG-G2', relationship: 'graded_as' },
];

// ---- Chart Data Helpers ----
export const gradeDistributionData = [
  { name: 'Grade A', value: 68, color: '#22c55e' },
  { name: 'Grade B', value: 24, color: '#f59e0b' },
  { name: 'Grade C', value: 6, color: '#f97316' },
  { name: 'Rejected', value: 2, color: '#ef4444' },
];

export const weeklyAssessmentTrend = [
  { week: 'Week 1', assessments: 180, quality: 85 },
  { week: 'Week 2', assessments: 210, quality: 86 },
  { week: 'Week 3', assessments: 245, quality: 87 },
  { week: 'Week 4', assessments: 290, quality: 88 },
  { week: 'Week 5', assessments: 323, quality: 87 },
];

export const defectDistributionData = [
  { name: 'Rot', value: 18, color: '#ef4444' },
  { name: 'Bruising', value: 32, color: '#f97316' },
  { name: 'Sprouting', value: 12, color: '#84cc16' },
  { name: 'Cuts', value: 8, color: '#ec4899' },
  { name: 'Cracks', value: 10, color: '#8b5cf6' },
  { name: 'Discoloration', value: 20, color: '#eab308' },
];

export const monthlyDefectTrend = [
  { month: 'Apr', rot: 5.2, bruising: 8.1, sprouting: 2.4, discoloration: 3.8 },
  { month: 'May', rot: 4.8, bruising: 7.5, sprouting: 2.1, discoloration: 3.5 },
  { month: 'Jun', rot: 6.1, bruising: 9.2, sprouting: 3.0, discoloration: 4.2 },
  { month: 'Jul', rot: 5.5, bruising: 8.8, sprouting: 2.8, discoloration: 3.9 },
  { month: 'Aug', rot: 4.2, bruising: 7.0, sprouting: 1.8, discoloration: 3.2 },
  { month: 'Sep', rot: 3.8, bruising: 6.5, sprouting: 1.5, discoloration: 2.8 },
];

export const centerComparisonData = [
  { center: 'Nashik Central', gradeA: 72, gradeB: 23, gradeC: 5, quality: 91 },
  { center: 'Pune West', gradeA: 61, gradeB: 31, gradeC: 8, quality: 85 },
  { center: 'Ahmednagar East', gradeA: 49, gradeB: 38, gradeC: 13, quality: 77 },
];
