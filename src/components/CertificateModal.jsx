import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const CertificateModal = ({ isOpen, onClose, certificate }) => {
    if (!isOpen || !certificate) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col"
                >
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{certificate.title}</h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    <div className="p-4 overflow-y-auto flex-1 flex flex-col items-center">
                        <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                            {/* Replace with actual certificate image */}
                            {certificate.image ? (
                                <img src={certificate.image} alt={certificate.title} className="max-w-full max-h-full object-contain" />
                            ) : (
                                <span className="text-gray-500">Certificate Image Placeholder</span>
                            )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl">
                            {certificate.description}
                        </p>

                        <div className="mt-6 flex gap-4">
                            <a
                                href={certificate.verifyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-accent text-white rounded-full hover:shadow-lg hover:scale-105 transition-all"
                            >
                                Verify Credential
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CertificateModal;
