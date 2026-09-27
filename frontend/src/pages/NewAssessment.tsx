import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload, Camera, CheckCircle2, AlertCircle, Sparkles, FileText,
  ShieldCheck, RefreshCw, HelpCircle, Layers, ArrowRight, CornerDownRight
} from 'lucide-react';
import { GradeBadge, StatusBadge } from '@/components/ui/Cards';
import { assessmentService } from '@/services/apiServices';

export default function NewAssessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showLowQualityRejection, setShowLowQualityRejection] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);

  // Workflow steps 1 through 10
  const steps = [
    'Upload Image', 'Quality Check', 'Ref Object', 'Calibrate',
    'Defect Segmentation', 'Classify Variety', 'Calculate Score',
    'Generate Grade', 'Estimate Price', 'Certificate'
  ];

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setStep(2);

    // Simulate 10 steps progress
    for (let s = 2; s <= 10; s++) {
      await new Promise(r => setTimeout(r, 300));
      setStep(s);
    }

    const result = await assessmentService.analyzeImage('sample.jpg');
    setAssessmentResult(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Onion Quality Assessment</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Upload batch photos with reference object for automated YOLOv8-seg defect segmentation & grading.
          </p>
        </div>
      </div>

      {/* 10-Step Progress Stepper */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Assessment Workflow Steps (10/10)
        </p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 text-center">
          {steps.map((label, idx) => {
            const stepNum = idx + 1;
            const isDone = step > stepNum || assessmentResult;
            const isCurrent = step === stepNum && isAnalyzing;
            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    isDone
                      ? 'bg-green-600 text-white'
                      : isCurrent
                      ? 'bg-gold-500 text-white animate-pulse'
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-700'
                  }`}
                >
                  {isDone ? <CheckCircle2 size={14} /> : stepNum}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 truncate max-w-full font-medium">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Workflow Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Upload & Image Preview */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">1. Sample Image Capture</h3>

          {/* Upload Dropzone */}
          {!hasImage ? (
            <div
              onClick={() => setHasImage(true)}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-600 rounded-2xl p-8 text-center cursor-pointer transition bg-gray-50/50 dark:bg-gray-900/30 flex flex-col items-center justify-center min-h-[300px]"
            >
              <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-primary-300 flex items-center justify-center mb-3">
                <Upload size={28} />
              </div>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                Click to upload batch image or drag & drop
              </p>
              <p className="text-xs text-gray-500 mt-1">Accepts JPG, PNG, WEBP (Max 15MB)</p>

              <button
                type="button"
                onClick={e => { e.stopPropagation(); setHasImage(true); }}
                className="mt-4 btn-primary text-xs flex items-center gap-2 py-2 px-4"
              >
                <Camera size={14} /> Use Mobile Camera
              </button>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-black min-h-[300px] flex items-center justify-center">
              {/* Simulated Onion Image with Segmentation Overlay */}
              <div className="relative w-full h-80 bg-gradient-to-br from-amber-900/40 via-amber-800/60 to-red-950 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-amber-600/90 border-4 border-amber-400 flex items-center justify-center relative shadow-2xl">
                  <span className="text-white font-extrabold text-sm tracking-widest uppercase opacity-70">
                    Nashik Red
                  </span>

                  {/* Reference Coin ₹5 */}
                  <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-yellow-400 border-2 border-yellow-200 text-yellow-950 font-black text-[10px] flex items-center justify-center shadow">
                    ₹5 Coin
                  </div>

                  {/* Defect Masks Overlays */}
                  {showOverlay && assessmentResult && (
                    <>
                      {/* Rot Defect (Red) */}
                      <div className="absolute top-8 left-8 w-10 h-10 rounded-full bg-red-600/70 border border-red-300 animate-pulse flex items-center justify-center text-[9px] text-white font-bold">
                        Rot 1%
                      </div>
                      {/* Bruising Defect (Orange) */}
                      <div className="absolute bottom-6 right-8 w-14 h-10 rounded-full bg-orange-500/70 border border-orange-300 flex items-center justify-center text-[9px] text-white font-bold">
                        Bruise 3%
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Overlay Toggle Switch */}
              {assessmentResult && (
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
                  <Layers size={14} className="text-gold-400" />
                  <span>Defect Overlay</span>
                  <button
                    onClick={() => setShowOverlay(!showOverlay)}
                    className={`w-8 h-4 rounded-full transition relative ${showOverlay ? 'bg-green-500' : 'bg-gray-600'}`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.25 transition ${showOverlay ? 'left-4' : 'left-0.5'}`} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Reference Object Instruction Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-xs text-blue-900 dark:text-blue-300 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <HelpCircle size={14} className="text-blue-600" /> Calibration Instruction:
            </p>
            <p>Place a standard <strong>₹5 coin</strong> or official ID card next to the onion batch for size calibration & distance calculation.</p>
          </div>

          {/* Rejection State Toggle Demo */}
          <div className="flex items-center justify-between text-xs pt-2">
            <button
              type="button"
              onClick={() => setShowLowQualityRejection(!showLowQualityRejection)}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              Toggle Low-Quality Image Rejection Demo
            </button>
          </div>

          {showLowQualityRejection && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-xs space-y-1">
              <p className="font-bold flex items-center gap-1">
                <AlertCircle size={14} /> Image Quality Rejected
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-red-700">
                <li>The image is too dark.</li>
                <li>Move closer to the batch.</li>
                <li>Hold the camera steady.</li>
                <li>Capture onions in natural daylight.</li>
              </ul>
            </div>
          )}

          {/* Analyze Action Button */}
          {!assessmentResult && (
            <button
              onClick={handleStartAnalysis}
              disabled={!hasImage || isAnalyzing}
              className="w-full btn-primary py-3 font-bold text-sm flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={16} className="animate-spin text-gold-400" />
                  <span>Running YOLOv8-seg Analysis... ({step}/10)</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} className="text-gold-400" />
                  <span>Start AI Quality Assessment</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Right Side: Assessment Result Panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-5">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">2. Analysis Result Panel</h3>

          {!assessmentResult ? (
            <div className="h-80 flex flex-col items-center justify-center text-center text-gray-400 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <Sparkles size={36} className="mb-2 text-gray-300" />
              <p className="font-medium text-sm">Upload an image and run AI assessment to view complete quality breakdown.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Score & Grade Header */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-center">
                <div>
                  <p className="text-[11px] text-gray-500">Quality Score</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">91/100</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">Assigned Grade</p>
                  <div className="mt-1"><GradeBadge grade="A" /></div>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">AI Confidence</p>
                  <p className="text-sm font-bold text-green-600 mt-1">96%</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">Variety</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">Nashik Red</p>
                </div>
              </div>

              {/* Estimates */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-gray-500">Estimated Shelf Life</p>
                  <p className="text-base font-bold text-green-800 dark:text-green-300 mt-0.5">18–22 days</p>
                </div>
                <div className="p-3 rounded-lg bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-800">
                  <p className="text-gray-500">Estimated Price Range</p>
                  <p className="text-base font-bold text-gold-900 dark:text-gold-300 mt-0.5">₹2,800 – ₹3,150 / quintal</p>
                </div>
              </div>

              {/* Defect Breakdown List */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Defect Segmentation Breakdown (Total Defect Area: 4.2%)
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
                    <span className="flex items-center gap-2 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Rot
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">1.0%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
                    <span className="flex items-center gap-2 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Bruising
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">3.0%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
                    <span className="flex items-center gap-2 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-lime-500" /> Sprouting
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">0%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
                    <span className="flex items-center gap-2 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Discoloration
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">2.0%</span>
                  </div>
                </div>
              </div>

              {/* Explainable AI Box */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-xs space-y-2">
                <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles size={14} className="text-gold-500" /> Plain-Language AI Explanation:
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  “Grade A was assigned because the total detected defect area is below the 5% threshold. Rot is minimal at 1%, bruising is within acceptable limits at 3%. Overall skin integrity and neck tightness conform to premium APMC export standards.”
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                <button
                  onClick={() => handleStartAnalysis()}
                  className="btn-secondary text-xs py-2 flex items-center justify-center gap-1"
                >
                  <RefreshCw size={12} /> Reanalyze
                </button>
                <button
                  onClick={() => navigate('/reports')}
                  className="btn-primary text-xs py-2 flex items-center justify-center gap-1"
                >
                  <FileText size={12} /> Generate Report
                </button>
                <button
                  onClick={() => navigate('/blockchain-certificates')}
                  className="btn-gold text-xs py-2 flex items-center justify-center gap-1 col-span-2 sm:col-span-1"
                >
                  <ShieldCheck size={12} /> Issue Certificate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
