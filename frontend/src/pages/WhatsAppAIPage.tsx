import React, { useState } from 'react';
import { whatsappConversations } from '@/data/mockData';
import { MessageCircle, Mic, CheckCircle2, Phone, Sparkles, Send, Globe } from 'lucide-react';

export default function WhatsAppAIPage() {
  const [selectedConv, setSelectedConv] = useState(whatsappConversations[0]);
  const sampleCommands = [
    '“Assess this onion.”',
    '“Show batch ON1042.”',
    '“Generate my report.”',
    '“Compare my last two batches.”',
    '“Verify this certificate.”',
    '“Why did I get Grade B?”',
    '“Send the certificate.”',
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageCircle size={24} className="text-green-600" /> WhatsApp AI Assistant Integration
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Voice-note transcription via Whisper AI, multilingual intent detection, and automated WhatsApp report delivery.
          </p>
        </div>
      </div>

      {/* Integration Flow Diagram Banner */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card">
        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-3">Multilingual WhatsApp AI Pipeline</h3>
        <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-green-50/50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-xs font-semibold text-green-900 dark:text-green-300">
          <span>WhatsApp Message / Voice Note</span>
          <span>→</span>
          <span className="flex items-center gap-1"><Mic size={12} /> Whisper Audio Speech-to-Text</span>
          <span>→</span>
          <span>Language Detection (HI/MR/EN/Hinglish)</span>
          <span>→</span>
          <span>Intent Parser</span>
          <span>→</span>
          <span className="text-primary-800 font-bold">OnionTrust API Response</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Recent WhatsApp Conversations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Farmer Conversations</h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {whatsappConversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={`p-4 hover:bg-gray-50/70 dark:hover:bg-gray-700/40 cursor-pointer transition ${
                  selectedConv.id === conv.id ? 'bg-green-50/50 dark:bg-green-950/20' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">{conv.farmerName}</span>
                  <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">
                    {conv.language}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">“{conv.lastMessage}”</p>
                <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400">
                  <span>{conv.phoneNumber}</span>
                  <span>{conv.voiceNoteCount} Voice Notes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2-Cols: Chat Simulation & Commands */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-700 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">{selectedConv.farmerName}</h3>
              <p className="text-xs text-gray-500">{selectedConv.phoneNumber} • {selectedConv.language} User</p>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              Connected & Active
            </span>
          </div>

          {/* Sample Chat Bubble */}
          <div className="space-y-3 text-xs">
            <div className="flex flex-col items-start">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl max-w-md text-gray-800 dark:text-gray-200">
                <p className="font-bold text-[11px] text-green-700 mb-0.5 flex items-center gap-1">
                  <Mic size={12} /> Voice Note (Transcribed via Whisper AI):
                </p>
                “{selectedConv.lastMessage}”
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="bg-green-700 text-white p-3 rounded-2xl max-w-md space-y-1">
                <p className="font-bold text-[11px] text-gold-300">Agro Mitra Response:</p>
                <p>“आपका बैच ON-2026-1042 का ग्रेड **Grade A** है। क्वालिटी स्कोर: 91/100। रिपोर्ट डाउनलोड करने के लिए यहाँ क्लिक करें: oniontrust.ai/report/ON1042”</p>
              </div>
            </div>
          </div>

          {/* Supported WhatsApp Commands List */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
            <h4 className="font-bold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Supported Voice & Text WhatsApp Commands
            </h4>
            <div className="flex flex-wrap gap-2">
              {sampleCommands.map((cmd, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-xs font-mono text-gray-800 dark:text-gray-200"
                >
                  {cmd}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
