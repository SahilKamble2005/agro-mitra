import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.name': 'Agro Mitra',
    'app.tagline': 'Transparent quality. Fair pricing. Trusted procurement.',
    'nav.overview': 'Overview',
    'nav.assessments': 'Assessments',
    'nav.batchGrading': 'Batch Grading',
    'nav.liveAssessments': 'Live Assessments',
    'nav.analytics': 'Quality Analytics',
    'nav.regional': 'Regional Intelligence',
    'nav.centers': 'Procurement Centers',
    'nav.certificates': 'Blockchain Certificates',
    'nav.reports': 'Reports',
    'nav.disputes': 'Disputes',
    'nav.integrity': 'Integrity Alerts',
    'nav.marketplace': 'Marketplace',
    'nav.priceInsights': 'Price Insights',
    'nav.whatsapp': 'WhatsApp AI',
    'nav.history': 'Assessment History',
    'nav.knowledgeGraph': 'Knowledge Graph',
    'nav.digitalTwin': 'Digital Twin',
    'nav.settings': 'Settings',
    'nav.users': 'User Management',
    'nav.modelMgmt': 'Model Management',
    'nav.retraining': 'Retraining Queue',
    'nav.systemHealth': 'System Health',
    'nav.auditLogs': 'Audit Logs',
    'nav.farmers': 'Farmers',
    'dashboard.greeting': 'Good morning',
    'dashboard.totalAssessments': 'Total assessments',
    'dashboard.avgQuality': 'Average quality',
    'dashboard.gradeA': 'Grade A batches',
    'dashboard.disputes': 'Active disputes',
    'dashboard.newAssessment': 'New assessment',
    'dashboard.qualityOverview': 'Quality overview',
    'dashboard.harvestWatch': 'Harvest watch',
    'dashboard.fieldNote': 'Field note',
    'status.online': 'Online',
    'status.offline': 'Offline',
    'status.syncing': 'Syncing',
    'common.search': 'Search batches, farmers...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.export': 'Export',
    'common.filter': 'Filter',
    'common.loading': 'Loading...',
    'common.noData': 'No data available',
    'common.error': 'Something went wrong',
    'sync.fieldSync': 'Field sync',
    'sync.lastSync': 'Last sync',
  },
  hi: {
    'app.name': 'OnionTrust AI',
    'app.tagline': 'पारदर्शी गुणवत्ता। उचित मूल्य। विश्वसनीय खरीद।',
    'nav.overview': 'अवलोकन',
    'nav.assessments': 'मूल्यांकन',
    'nav.batchGrading': 'बैच ग्रेडिंग',
    'nav.analytics': 'गुणवत्ता विश्लेषण',
    'nav.regional': 'क्षेत्रीय जानकारी',
    'nav.centers': 'खरीद केंद्र',
    'nav.certificates': 'प्रमाणपत्र',
    'nav.reports': 'रिपोर्ट',
    'nav.disputes': 'विवाद',
    'nav.marketplace': 'बाज़ार',
    'nav.settings': 'सेटिंग्स',
    'dashboard.greeting': 'सुप्रभात',
    'dashboard.totalAssessments': 'कुल मूल्यांकन',
    'dashboard.avgQuality': 'औसत गुणवत्ता',
    'dashboard.gradeA': 'ग्रेड A बैच',
    'dashboard.disputes': 'सक्रिय विवाद',
    'dashboard.newAssessment': 'नया मूल्यांकन',
    'status.online': 'ऑनलाइन',
    'status.offline': 'ऑफलाइन',
    'common.search': 'बैच, किसान खोजें...',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'sync.fieldSync': 'फ़ील्ड सिंक',
    'sync.lastSync': 'अंतिम सिंक',
  },
  mr: {
    'app.name': 'OnionTrust AI',
    'app.tagline': 'पारदर्शक गुणवत्ता। योग्य किंमत। विश्वासार्ह खरेदी।',
    'nav.overview': 'सिंहावलोकन',
    'nav.assessments': 'मूल्यांकन',
    'nav.batchGrading': 'बॅच ग्रेडिंग',
    'nav.analytics': 'गुणवत्ता विश्लेषण',
    'nav.regional': 'प्रादेशिक माहिती',
    'nav.centers': 'खरेदी केंद्रे',
    'nav.certificates': 'प्रमाणपत्रे',
    'nav.reports': 'अहवाल',
    'nav.disputes': 'वाद',
    'nav.marketplace': 'बाजारपेठ',
    'nav.settings': 'सेटिंग्ज',
    'dashboard.greeting': 'सुप्रभात',
    'dashboard.totalAssessments': 'एकूण मूल्यांकन',
    'dashboard.avgQuality': 'सरासरी गुणवत्ता',
    'dashboard.gradeA': 'ग्रेड A बॅच',
    'dashboard.disputes': 'सक्रिय वाद',
    'dashboard.newAssessment': 'नवीन मूल्यांकन',
    'status.online': 'ऑनलाइन',
    'status.offline': 'ऑफलाइन',
    'common.search': 'बॅच, शेतकरी शोधा...',
    'common.save': 'जतन करा',
    'common.cancel': 'रद्द करा',
    'sync.fieldSync': 'फील्ड सिंक',
    'sync.lastSync': 'शेवटचा सिंक',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('oniontrust_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('oniontrust_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
