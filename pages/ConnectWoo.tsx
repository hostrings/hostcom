import React, { useState } from 'react';
import { Database, Link2, CheckCircle, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { analyzeMigrationLog } from '../services/geminiService';

const ConnectWoo = () => {
  const [step, setStep] = useState(1); // 1: Input, 2: Scanning, 3: Migrating, 4: Done
  const [url, setUrl] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState('');

  const handleConnect = () => {
    if (!url) return;
    setStep(2);
    // Simulate connection phase
    setTimeout(() => {
      setStep(3);
      startMigrationSimulation();
    }, 2000);
  };

  const startMigrationSimulation = () => {
    let currentProgress = 0;
    const interval = setInterval(async () => {
      currentProgress += Math.floor(Math.random() * 10) + 1;
      if (currentProgress > 100) currentProgress = 100;
      
      setProgress(currentProgress);
      
      const newLogs = [
        `[${new Date().toLocaleTimeString()}] Fetching products batch #${Math.ceil(currentProgress / 5)}...`,
        `[${new Date().toLocaleTimeString()}] Validating SKUs via Hook...`,
        `[${new Date().toLocaleTimeString()}] Importing customer records...`
      ];
      
      setLogs(prev => [...prev, ...newLogs]);

      if (currentProgress === 50) {
          // Trigger AI check halfway
          const analysis = await analyzeMigrationLog(newLogs);
          setAiAnalysis(analysis);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setStep(4);
      }
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-10">
      
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-3 bg-purple-100 text-purple-600 rounded-full mb-4">
            <Link2 size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Connect WooCommerce Direct</h2>
        <p className="text-gray-500 mt-2">Migrate your store without installing WordPress core. We connect directly to your repository hooks.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Progress Bar */}
        {(step === 2 || step === 3) && (
             <div className="h-1 bg-gray-100 w-full">
                <div className="h-full bg-indigo-600 transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
             </div>
        )}

        <div className="p-8">
            {step === 1 && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">WordPress/WooCommerce Site URL</label>
                        <div className="flex gap-2">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                https://
                            </span>
                            <input 
                                type="text" 
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="www.yourstore.com"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            * We will attempt to handshake via the WC-API endpoints without requiring a plugin install if REST API is enabled.
                        </p>
                    </div>
                    <button 
                        onClick={handleConnect}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Scan & Connect
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-gray-900">Handshaking with repository...</h3>
                    <p className="text-gray-500">Verifying WooCommerce version and API availability.</p>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                         <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                            <Database size={20} className="text-indigo-600"/> 
                            Migrating Data... {progress}%
                         </h3>
                         {aiAnalysis && (
                             <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200 flex items-center gap-1">
                                <CheckCircle size={12}/> AI Verified
                             </span>
                         )}
                    </div>
                    
                    <div className="bg-gray-900 rounded-lg p-4 h-48 overflow-y-auto font-mono text-xs text-green-400 space-y-1">
                        {logs.map((log, i) => (
                            <div key={i}>{log}</div>
                        ))}
                    </div>

                    {aiAnalysis && (
                        <div className="bg-indigo-50 p-3 rounded-md text-sm text-indigo-800 border border-indigo-100 flex gap-2">
                            <AlertCircle size={16} className="mt-0.5"/>
                            <p>{aiAnalysis}</p>
                        </div>
                    )}
                </div>
            )}

            {step === 4 && (
                <div className="text-center py-8 space-y-4">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Store Connected Successfully!</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Hostcom has successfully mirrored your WooCommerce products and orders. New orders will sync in real-time.
                    </p>
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mt-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">452</div>
                            <div className="text-xs text-gray-500 uppercase font-semibold">Products</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">3,421</div>
                            <div className="text-xs text-gray-500 uppercase font-semibold">Orders Imported</div>
                        </div>
                    </div>
                    <button 
                        onClick={() => window.location.hash = '#/'}
                        className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Go to Dashboard <ArrowRight className="ml-2" size={18} />
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ConnectWoo;