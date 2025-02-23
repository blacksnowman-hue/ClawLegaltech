import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAllResignations, concludeResignation, getExitResponses } from '../../api';
import { ResignationRequest, ExitQuestionnaire } from '../../types';
import toast from 'react-hot-toast';

const HRDashboard: React.FC = () => {
  const [resignations, setResignations] = useState<ResignationRequest[]>([]);
  const [exitResponses, setExitResponses] = useState<ExitQuestionnaire[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'resignations' | 'responses'>('resignations');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resignationsRes, responsesRes] = await Promise.all([
        getAllResignations(),
        getExitResponses()
      ]);
      setResignations(resignationsRes.data);
      setExitResponses(responsesRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConcludeResignation = async (
    resignationId: string,
    approved: boolean,
    lwd: string
  ) => {
    try {
      await concludeResignation(resignationId, approved, lwd);
      toast.success(
        `Resignation ${approved ? 'approved' : 'rejected'} successfully`
      );
      fetchData();
    } catch (error) {
      toast.error('Failed to process resignation');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                HR Dashboard
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
          <div className="mb-6">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('resignations')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'resignations'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                Resignation Requests
              </button>
              <button
                onClick={() => setActiveTab('responses')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'responses'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Exit Responses
              </button>
            </nav>
          </div>

          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : activeTab === 'resignations' ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Resignation Requests
                </h2>
              </div>
              {resignations.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No resignation requests found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Working Day
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {resignations.map((resignation) => (
                        <tr key={resignation._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {resignation.employeeId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {resignation.lwd}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                resignation.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : resignation.status === 'approved'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {resignation.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {resignation.status === 'pending' && (
                              <div className="space-x-2">
                                <button
                                  onClick={() =>
                                    handleConcludeResignation(
                                      resignation._id,
                                      true,
                                      resignation.lwd
                                    )
                                  }
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleConcludeResignation(
                                      resignation._id,
                                      false,
                                      resignation.lwd
                                    )
                                  }
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Exit Interview Responses
                </h2>
              </div>
              {exitResponses.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No exit interview responses found
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {exitResponses.map((questionnaire, index) => (
                    <div key={index} className="p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Employee ID: {questionnaire.employeeId}
                      </h3>
                      <div className="space-y-4">
                        {questionnaire.responses.map((response, rIndex) => (
                          <div key={rIndex} className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              {response.questionText}
                            </p>
                            <p className="text-sm text-gray-600">
                              {response.response}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HRDashboard;