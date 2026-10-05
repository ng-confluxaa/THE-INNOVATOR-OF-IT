import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, Lock, Download, Trash2, Plus, Edit3, CheckCircle, RefreshCw, 
  X, Search, Mail, Phone, BookOpen, Building, Users, Briefcase, Settings, FileText, AlertCircle, LogOut 
} from 'lucide-react';

export const AdminPanel = () => {
  const { 
    isAdminPanelOpen, setIsAdminPanelOpen, closeAdminPanel,
    isAdminLoggedIn, setIsAdminLoggedIn,
    siteConfig, setSiteConfig,
    courses, addCourse, updateCourse, deleteCourse,
    companies, addCompany, deleteCompany,
    placedStudents, addPlacedStudent, deletePlacedStudent,
    internships, addInternship, deleteInternship,
    enquiries, updateEnquiryStatus, deleteEnquiry, downloadEnquiriesCSV,
    emailLogs, resetAllDataToDefault
  } = useApp();


  // Admin login form state
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab State: 'leads' | 'courses' | 'companies' | 'placements' | 'internships' | 'config' | 'maillog'
  const [activeTab, setActiveTab] = useState('leads');

  // Search & Filter State for Enquiries
  const [searchLead, setSearchLead] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // New Course Form State
  const [newCourseForm, setNewCourseForm] = useState({
    title: '', category: 'Full Stack', duration: '6 Months', fee: '₹35,000',
    tags: '', description: '', modules: '', image: ''
  });
  const [editingCourseId, setEditingCourseId] = useState(null);

  // New Company Form State
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyLogo, setNewCompanyLogo] = useState('🏢');

  // New Placed Student Form State
  const [newPlacedStudent, setNewPlacedStudent] = useState({
    name: '', company: '', ctc: '₹12 LPA', role: '', course: '', quote: '', image: ''
  });

  // New Internship Form State
  const [newInternForm, setNewInternForm] = useState({
    role: '', company: '', stipend: '₹15,000 / month', duration: '3 Months', location: 'Bengaluru', requirements: ''
  });

  if (!isAdminPanelOpen) return null;

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput === 'admin' && passwordInput === 'admin123') {
      setIsAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Admin Username or Password. (Default: admin / admin123)');
    }
  };

  // Handle Course Add/Edit
  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (!newCourseForm.title) return alert('Course title required!');

    const formattedData = {
      ...newCourseForm,
      tags: typeof newCourseForm.tags === 'string' ? newCourseForm.tags.split(',').map(t => t.trim()) : newCourseForm.tags,
      modules: typeof newCourseForm.modules === 'string' ? newCourseForm.modules.split('\n').filter(Boolean) : newCourseForm.modules
    };

    if (editingCourseId) {
      updateCourse(editingCourseId, formattedData);
      setEditingCourseId(null);
    } else {
      addCourse(formattedData);
    }

    setNewCourseForm({
      title: '', category: 'Full Stack', duration: '6 Months', fee: '₹35,000',
      tags: '', description: '', modules: '', image: ''
    });
  };

  const handleEditCourseClick = (course) => {
    setEditingCourseId(course.id);
    setNewCourseForm({
      title: course.title,
      category: course.category,
      duration: course.duration,
      fee: course.fee,
      tags: course.tags ? course.tags.join(', ') : '',
      description: course.description || '',
      modules: course.modules ? course.modules.join('\n') : '',
      image: course.image || ''
    });
  };

  // Handle Add Company
  const handleAddCompanySubmit = (e) => {
    e.preventDefault();
    if (!newCompanyName) return;
    addCompany(newCompanyName, newCompanyLogo || '🏢');
    setNewCompanyName('');
    setNewCompanyLogo('🏢');
  };

  // Handle Add Placed Student
  const handleAddPlacedStudentSubmit = (e) => {
    e.preventDefault();
    if (!newPlacedStudent.name || !newPlacedStudent.company) return alert('Name and Company required!');
    addPlacedStudent(newPlacedStudent);
    setNewPlacedStudent({
      name: '', company: '', ctc: '₹12 LPA', role: '', course: '', quote: '', image: ''
    });
  };

  // Handle Add Internship
  const handleAddInternshipSubmit = (e) => {
    e.preventDefault();
    if (!newInternForm.role || !newInternForm.company) return alert('Role and Company required!');
    addInternship(newInternForm);
    setNewInternForm({
      role: '', company: '', stipend: '₹15,000 / month', duration: '3 Months', location: 'Bengaluru', requirements: ''
    });
  };

  // Filter Enquiries
  const filteredEnquiries = enquiries.filter(item => {
    const matchSearch = item.studentName.toLowerCase().includes(searchLead.toLowerCase()) ||
                        item.email.toLowerCase().includes(searchLead.toLowerCase()) ||
                        item.mobile.includes(searchLead) ||
                        item.course.toLowerCase().includes(searchLead.toLowerCase());
    const matchStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Admin Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                ADMIN CMS CONTROL PANEL
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {siteConfig.instituteName}
                </span>
              </h2>
              <p className="text-xs text-slate-400">Full System Control: Manage Courses, Tickers, Leads & Exports</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAdminLoggedIn && (
              <button
                onClick={() => setIsAdminLoggedIn(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1 border border-slate-700"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={closeAdminPanel}
              className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* LOGIN SCREEN */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto text-center w-full">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Admin Authentication</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">Enter secure credentials to access institute management panel</p>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2 text-left">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Username</label>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg hover:from-blue-500 hover:to-cyan-500 transition-all"
              >
                Access Dashboard
              </button>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 text-center">
                Demo Credentials: Username <strong className="text-white">admin</strong> • Password <strong className="text-white">admin123</strong>
              </div>
            </form>
          </div>
        ) : (
          /* LOGGED IN DASHBOARD */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tab Navigation */}
            <div className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-1 overflow-y-auto flex-shrink-0">
              <button
                onClick={() => setActiveTab('leads')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'leads' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Enquiries & CSV ({enquiries.length})</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'courses' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Courses ({courses.length})</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab('companies')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'companies' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>Tie-Up Ticker ({companies.length})</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab('placements')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'placements' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Placed Students ({placedStudents.length})</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab('internships')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'internships' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Internships ({internships.length})</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab('maillog')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'maillog' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Dispatch Logs ({emailLogs.length})</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab('config')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'config' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Site Config (CMS)</span>
                </span>
              </button>

              <div className="pt-6 border-t border-slate-800">
                <button
                  onClick={resetAllDataToDefault}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 text-xs font-semibold flex items-center space-x-2 border border-slate-800"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            </div>

            {/* Content Body Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-900">
              
              {/* TAB 1: ENQUIRIES & CSV DOWNLOAD */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Student Lead Enquiries</h3>
                      <p className="text-xs text-slate-400">View incoming student registration leads and download CSV report</p>
                    </div>

                    <button
                      onClick={downloadEnquiriesCSV}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download CSV Format</span>
                    </button>
                  </div>

                  {/* Search & Filter bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Search leads by name, email, phone or course..."
                        value={searchLead}
                        onChange={(e) => setSearchLead(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none"
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">Status: New</option>
                      <option value="Contacted">Status: Contacted</option>
                      <option value="Enrolled">Status: Enrolled</option>
                      <option value="Closed">Status: Closed</option>
                    </select>
                  </div>

                  {/* Enquiries Data Table */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                        <tr>
                          <th className="p-3.5">Student Name</th>
                          <th className="p-3.5">Email ID</th>
                          <th className="p-3.5">Mobile Number</th>
                          <th className="p-3.5">Selected Course</th>
                          <th className="p-3.5">Batch</th>
                          <th className="p-3.5">Date</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-slate-200">
                        {filteredEnquiries.length > 0 ? (
                          filteredEnquiries.map(item => (
                            <tr key={item.id} className="hover:bg-slate-800/50">
                              <td className="p-3.5 font-bold text-white">{item.studentName}</td>
                              <td className="p-3.5 text-cyan-300">{item.email}</td>
                              <td className="p-3.5 font-mono text-slate-300">{item.mobile}</td>
                              <td className="p-3.5">{item.course}</td>
                              <td className="p-3.5 text-slate-400">{item.batch}</td>
                              <td className="p-3.5 text-slate-400">{item.submittedAt}</td>
                              <td className="p-3.5">
                                <select
                                  value={item.status}
                                  onChange={(e) => updateEnquiryStatus(item.id, e.target.value)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                                    item.status === 'New' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                                    item.status === 'Contacted' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                                    item.status === 'Enrolled' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                                    'bg-slate-800 text-slate-400 border-slate-700'
                                  }`}
                                >
                                  <option value="New" className="bg-slate-900 text-white">New</option>
                                  <option value="Contacted" className="bg-slate-900 text-white">Contacted</option>
                                  <option value="Enrolled" className="bg-slate-900 text-white">Enrolled</option>
                                  <option value="Closed" className="bg-slate-900 text-white">Closed</option>
                                </select>
                              </td>
                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => deleteEnquiry(item.id)}
                                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/30"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="p-6 text-center text-slate-400">
                              No student enquiries found matching your search.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: COURSE MANAGEMENT (CRUD) */}
              {activeTab === 'courses' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white">Manage Courses (Add & Edit)</h3>
                    <p className="text-xs text-slate-400">Add Java Fullstack, Web Dev, Python or custom IT courses dynamically</p>
                  </div>

                  {/* Add / Edit Form */}
                  <form onSubmit={handleSaveCourse} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-blue-400">
                      {editingCourseId ? 'Edit Existing Course' : 'Create New Course'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Course Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Java Fullstack Masterclass"
                          value={newCourseForm.title}
                          onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                        <select
                          value={newCourseForm.category}
                          onChange={(e) => setNewCourseForm({ ...newCourseForm, category: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                        >
                          <option value="Full Stack">Full Stack</option>
                          <option value="Web Dev">Web Dev</option>
                          <option value="Data & AI">Data & AI</option>
                          <option value="Cloud">Cloud</option>
                          <option value="Programming">Programming</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Duration</label>
                        <input
                          type="text"
                          placeholder="6 Months"
                          value={newCourseForm.duration}
                          onChange={(e) => setNewCourseForm({ ...newCourseForm, duration: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Fee Structure</label>
                        <input
                          type="text"
                          placeholder="₹35,000"
                          value={newCourseForm.fee}
                          onChange={(e) => setNewCourseForm({ ...newCourseForm, fee: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Tags (comma separated)</label>
                        <input
                          type="text"
                          placeholder="Java, Spring Boot, React, SQL"
                          value={newCourseForm.tags}
                          onChange={(e) => setNewCourseForm({ ...newCourseForm, tags: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                      <textarea
                        rows="2"
                        placeholder="Comprehensive summary..."
                        value={newCourseForm.description}
                        onChange={(e) => setNewCourseForm({ ...newCourseForm, description: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Syllabus Modules (1 per line)</label>
                      <textarea
                        rows="3"
                        placeholder="Module 1: Core Fundamentals&#10;Module 2: Advanced Backend Architecture"
                        value={newCourseForm.modules}
                        onChange={(e) => setNewCourseForm({ ...newCourseForm, modules: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono"
                      ></textarea>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      {editingCourseId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCourseId(null);
                            setNewCourseForm({
                              title: '', category: 'Full Stack', duration: '6 Months', fee: '₹35,000',
                              tags: '', description: '', modules: '', image: ''
                            });
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                        >
                          Cancel Edit
                        </button>
                      )}
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                      >
                        {editingCourseId ? 'Update Course' : 'Add Course'}
                      </button>
                    </div>
                  </form>

                  {/* Course List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map(c => (
                      <div key={c.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{c.category} • {c.duration}</span>
                          <h4 className="font-bold text-white text-sm">{c.title}</h4>
                          <p className="text-xs text-emerald-400 font-semibold mt-1">{c.fee}</p>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-1">{c.description}</p>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleEditCourseClick(c)}
                            className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/30"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteCourse(c.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/30"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: TIE-UP COMPANIES TICKER MANAGEMENT */}
              {activeTab === 'companies' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Tie-Up Companies Ticker</h3>
                    <p className="text-xs text-slate-400">Add or remove recruiting partners. Updates scroll live from left-to-right on the landing page.</p>
                  </div>

                  <form onSubmit={handleAddCompanySubmit} className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center gap-3">
                    <input
                      type="text"
                      placeholder="Company Name (e.g. Microsoft)"
                      value={newCompanyName}
                      onChange={(e) => setNewCompanyName(e.target.value)}
                      className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs flex-1 min-w-[200px]"
                    />
                    <input
                      type="text"
                      placeholder="Icon/Emoji (e.g. 💻)"
                      value={newCompanyLogo}
                      onChange={(e) => setNewCompanyLogo(e.target.value)}
                      className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs w-28"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Partner</span>
                    </button>
                  </form>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {companies.map(comp => (
                      <div key={comp.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{comp.logo}</span>
                          <span className="text-xs font-semibold text-white">{comp.name}</span>
                        </div>
                        <button
                          onClick={() => deleteCompany(comp.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PLACED STUDENTS MANAGEMENT */}
              {activeTab === 'placements' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Placed Students Showcase</h3>
                    <p className="text-xs text-slate-400">Manage student placement records displayed on the public landing page</p>
                  </div>

                  <form onSubmit={handleAddPlacedStudentSubmit} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-blue-400">Add Placed Student Success Record</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Student Name *"
                        value={newPlacedStudent.name}
                        onChange={(e) => setNewPlacedStudent({ ...newPlacedStudent, name: e.target.value })}
                        className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Hired Company *"
                        value={newPlacedStudent.company}
                        onChange={(e) => setNewPlacedStudent({ ...newPlacedStudent, company: e.target.value })}
                        className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                      <input
                        type="text"
                        placeholder="CTC Package (e.g. ₹15 LPA)"
                        value={newPlacedStudent.ctc}
                        onChange={(e) => setNewPlacedStudent({ ...newPlacedStudent, ctc: e.target.value })}
                        className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Role (e.g. Fullstack Engineer)"
                        value={newPlacedStudent.role}
                        onChange={(e) => setNewPlacedStudent({ ...newPlacedStudent, role: e.target.value })}
                        className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Course Taken"
                        value={newPlacedStudent.course}
                        onChange={(e) => setNewPlacedStudent({ ...newPlacedStudent, course: e.target.value })}
                        className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>

                    <textarea
                      rows="2"
                      placeholder="Student quote or testimonial statement..."
                      value={newPlacedStudent.quote}
                      onChange={(e) => setNewPlacedStudent({ ...newPlacedStudent, quote: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    ></textarea>

                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                    >
                      Publish Record
                    </button>
                  </form>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {placedStudents.map(st => (
                      <div key={st.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-white text-sm">{st.name}</h4>
                            <span className="text-xs font-bold text-amber-400">{st.ctc}</span>
                          </div>
                          <p className="text-xs text-cyan-400 mt-0.5">{st.company} • {st.role}</p>
                          <p className="text-xs text-slate-400 italic mt-1 font-serif">"{st.quote}"</p>
                        </div>
                        <button
                          onClick={() => deletePlacedStudent(st.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: INTERNSHIPS MANAGEMENT */}
              {activeTab === 'internships' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Active Internship Opportunities</h3>
                    <p className="text-xs text-slate-400">Post new internship announcements for enrolled students</p>
                  </div>

                  <form onSubmit={handleAddInternshipSubmit} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Internship Role *"
                        value={newInternForm.role}
                        onChange={(e) => setNewInternForm({ ...newInternForm, role: e.target.value })}
                        className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Hiring Company *"
                        value={newInternForm.company}
                        onChange={(e) => setNewInternForm({ ...newInternForm, company: e.target.value })}
                        className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Stipend (e.g. ₹15,000 / month)"
                        value={newInternForm.stipend}
                        onChange={(e) => setNewInternForm({ ...newInternForm, stipend: e.target.value })}
                        className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g. 3 Months)"
                        value={newInternForm.duration}
                        onChange={(e) => setNewInternForm({ ...newInternForm, duration: e.target.value })}
                        className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Location (e.g. Remote / Hybrid)"
                        value={newInternForm.location}
                        onChange={(e) => setNewInternForm({ ...newInternForm, location: e.target.value })}
                        className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Requirements (e.g. Java, React, SQL)"
                      value={newInternForm.requirements}
                      onChange={(e) => setNewInternForm({ ...newInternForm, requirements: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />

                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                    >
                      Publish Internship
                    </button>
                  </form>

                  <div className="space-y-3">
                    {internships.map(intern => (
                      <div key={intern.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-white text-sm">{intern.role}</h4>
                          <p className="text-xs text-indigo-300">{intern.company} • {intern.stipend} • {intern.location}</p>
                        </div>
                        <button
                          onClick={() => deleteInternship(intern.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: EMAIL DISPATCH LOGS */}
              {activeTab === 'maillog' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Automated Lead Notification Email Logs</h3>
                    <p className="text-xs text-slate-400">All submitted student lead notifications dispatched to {siteConfig.adminNotifyEmail}</p>
                  </div>

                  <div className="space-y-3">
                    {emailLogs.length > 0 ? (
                      emailLogs.map(log => (
                        <div key={log.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                          <div className="flex justify-between items-center text-slate-400">
                            <span className="font-mono text-[11px] text-cyan-400">To: {log.to}</span>
                            <span>{log.sentAt}</span>
                          </div>
                          <p className="font-bold text-white text-sm">{log.subject}</p>
                          <p className="text-slate-300">
                            Student: <strong>{log.studentName}</strong> | Phone: <strong>{log.mobile}</strong> | Email: <strong>{log.email}</strong>
                          </p>
                          <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                            ✓ DISPATCHED TO MAIL RECIPIENT
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-400 text-xs">
                        No email notification logs recorded yet. Submit a student enquiry on the landing page to trigger email dispatch.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 7: GENERAL SITE CONFIG CMS */}
              {activeTab === 'config' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Website General Configuration (CMS)</h3>
                    <p className="text-xs text-slate-400">Modify institute name, contact details, hero banner text, and mail settings</p>
                  </div>

                  <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Institute Name</label>
                        <input
                          type="text"
                          value={siteConfig.instituteName}
                          onChange={(e) => setSiteConfig({ ...siteConfig, instituteName: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={siteConfig.tagline}
                          onChange={(e) => setSiteConfig({ ...siteConfig, tagline: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone Number</label>
                        <input
                          type="text"
                          value={siteConfig.phone}
                          onChange={(e) => setSiteConfig({ ...siteConfig, phone: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Public Admissions Email</label>
                        <input
                          type="email"
                          value={siteConfig.email}
                          onChange={(e) => setSiteConfig({ ...siteConfig, email: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Admin Lead Notification Recipient Email <span className="text-cyan-400">(Where enquiries are dispatched)</span>
                      </label>
                      <input
                        type="email"
                        value={siteConfig.adminNotifyEmail}
                        onChange={(e) => setSiteConfig({ ...siteConfig, adminNotifyEmail: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-950 border border-cyan-500/50 rounded-xl text-cyan-300 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Campus Physical Address</label>
                      <input
                        type="text"
                        value={siteConfig.address}
                        onChange={(e) => setSiteConfig({ ...siteConfig, address: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subheadline</label>
                      <textarea
                        rows="2"
                        value={siteConfig.heroSubheadline}
                        onChange={(e) => setSiteConfig({ ...siteConfig, heroSubheadline: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      ></textarea>
                    </div>

                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Changes saved automatically to system memory and local storage!</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
