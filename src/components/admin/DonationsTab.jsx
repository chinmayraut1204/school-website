import React, { useState } from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import { Trash2, Plus, PlusCircle, Check } from 'lucide-react';
import Button from '../common/Button';

const categories = ['Infrastructure', 'Learning Material', 'Sports Equipment', 'Scholarships', 'Nutrition', 'General'];

const DonationsTab = () => {
  const { donations, addDonation, deleteDonation } = useSchoolData();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Infrastructure');
  const [message, setMessage] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = parseInt(amount, 10);

    if (!name.trim()) {
      showToast('Please fill out the name field.', 'error');
      return;
    }
    if (isNaN(finalAmount) || finalAmount <= 0) {
      showToast('Please fill out a valid amount.', 'error');
      return;
    }

    addDonation({
      name,
      amount: finalAmount,
      category,
      message: message.trim() || 'Wishing you the best!'
    });

    showToast(`Donation of ₹${finalAmount.toLocaleString()} logged for ${name}.`, 'success');
    
    // reset form
    setName('');
    setAmount('');
    setCategory('Infrastructure');
    setMessage('');
    setIsOpenForm(false);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Donors Directory List
        </h3>
        <Button 
          variant={isOpenForm ? 'outline' : 'secondary'} 
          size="sm"
          onClick={() => setIsOpenForm(!isOpenForm)}
          icon={isOpenForm ? null : <Plus className="w-4 h-4" />}
        >
          {isOpenForm ? 'Close Form' : 'Log Manual Donation'}
        </Button>
      </div>

      {/* Accordion Form overlay */}
      {isOpenForm && (
        <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 max-w-xl transition-all">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Record Contributor Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Donor Full Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Amount (₹)</label>
                <input 
                  type="number"
                  required
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Funds Designation</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Donor Note</label>
                <input 
                  type="text"
                  placeholder="e.g. library books support"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="sm" className="w-full font-bold">
              Confirm Ledger Entry
            </Button>
          </form>
        </div>
      )}

      {/* Table grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-850 text-slate-450 uppercase font-bold">
                <th className="py-4 px-6">Donor</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Allocation</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Message</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 font-semibold text-slate-700 dark:text-slate-300">
              {donations.map((don) => (
                <tr key={don.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-slate-100">{don.name}</td>
                  <td className="py-4 px-6 text-emerald-600 dark:text-emerald-400 font-extrabold">₹{Number(don.amount).toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-[10px]">
                      {don.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{don.date}</td>
                  <td className="py-4 px-6 text-slate-500 line-clamp-1 max-w-[200px]" title={don.message}>{don.message}</td>
                  <td className="py-4 px-6 text-center">
                    <button 
                      onClick={() => {
                        if (confirm(`Remove donation entry for ${don.name}?`)) {
                          deleteDonation(don.id);
                          showToast('Donation entry removed from ledger.', 'info');
                        }
                      }}
                      className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationsTab;
