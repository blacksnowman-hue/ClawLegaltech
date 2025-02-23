import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submitResignation, submitExitQuestionnaire } from '../../api';
import toast from 'react-hot-toast';

const exitQuestions = [
  "What is your primary reason for leaving?",
  "How would you rate your overall experience with the company?",
  "What suggestions do you have for improving the work environment?",
  "Would you consider returning to the company in the future?",
  "How would you rate the support from your immediate supervisor?"
];

const EmployeeDashboard: React.FC = () => {
  const [lwd, setLwd] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitResignation(lwd);
      toast.success('Resignation submitted successfully');
      setLwd('');
      setShowQuestionnaire(true);
    } catch (error) {
      toast.error('Failed to submit resignation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionnaireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formattedResponses = exitQuestions.map(question => ({
        questionText: question,
        response: responses[question] || ''
      }));

      await submitExitQuestionnaire(formattedResponses);
      toast.success('Exit questionnaire submitted successfully');
      setShowQuestionnaire(false);
      setResponses({});
    } catch (error) {
      toast.error('Failed to submit exit questionnaire');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Employee Dashboard
              </span>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-600">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {!showQuestionnaire ? (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Submit Resignation
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="lwd"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Working Day
                  </label>
                  <input
                    type="date"
                    id="lwd"
                    name="lwd"
                    required
                    min={today}
                    value={lwd}
                    onChange={(e) => setLwd(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Resignation'}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">
                  Exit Questionnaire
                </h2>
              </div>
              <form onSubmit={handleQuestionnaireSubmit} className="space-y-6">
                {exitQuestions.map((question, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {question}
                    </label>
                    <textarea
                      required
                      value={responses[question] || ''}
                      onChange={(e) =>
                        setResponses((prev) => ({
                          ...prev,
                          [question]: e.target.value,
                        }))
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      rows={3}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;