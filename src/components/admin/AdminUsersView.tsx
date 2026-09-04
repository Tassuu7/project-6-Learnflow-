import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Shield,
  CheckCircle2,
  XCircle,
  X,
  Mail,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { User, UserRole } from '../../types';
import { UserAvatar } from '../common/UserAvatar';

export const AdminUsersView: React.FC = () => {
  const { currentUser } = useAuth();
  const { users, createUser, updateUserStatus, recordAuditLog } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [isAddingUser, setIsAddingUser] = useState(false);

  // New user form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('STUDENT');
  const [newDepartment, setNewDepartment] = useState('Engineering');

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    createUser({
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      department: newDepartment,
      status: 'ACTIVE',
    });

    recordAuditLog(
      'USER_REGISTERED',
      'USER',
      newEmail,
      'SUCCESS',
      `Admin created user account for ${newName} with role ${newRole}`
    );

    setIsAddingUser(false);
    setNewName('');
    setNewEmail('');
  };

  const handleToggleStatus = (targetUser: User) => {
    const updatedStatus: 'ACTIVE' | 'SUSPENDED' =
      targetUser.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    updateUserStatus(targetUser.id, updatedStatus);
    recordAuditLog(
      'ROLE_UPDATED',
      'USER',
      targetUser.id,
      'SUCCESS',
      `User ${targetUser.name} active status set to ${updatedStatus}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
              Identity & Access Management
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
              User Accounts & Role Permissions
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Provision accounts across 3 role tiers (Student, Faculty Instructor, System Administrator) with role-based access.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddingUser(true)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" /> Provision User
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="px-3 py-1.5 text-xs border border-stone-300 rounded-lg w-64"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-stone-50 text-stone-800"
          >
            <option value="ALL">All Roles</option>
            <option value="STUDENT">Students</option>
            <option value="INSTRUCTOR">Faculty Instructors</option>
            <option value="ADMIN">Administrators</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-3.5">User</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Created</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <UserAvatar name={u.name} role={u.role} size="sm" />
                      <div>
                        <div className="font-bold text-stone-900">{u.name}</div>
                        <div className="text-[11px] text-stone-500 font-mono">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'ADMIN'
                          ? 'bg-stone-800 text-white'
                          : u.role === 'INSTRUCTOR'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {u.role === 'INSTRUCTOR' ? 'FACULTY' : u.role}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {u.status === 'ACTIVE' ? (
                      <span className="flex items-center gap-1 text-emerald-800 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-800 font-semibold text-[11px]">
                        <XCircle className="w-3.5 h-3.5" /> Suspended
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-stone-600 text-xs">
                    {u.department || 'General'}
                  </td>
                  <td className="p-3.5 text-stone-500 font-mono text-[11px]">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3.5 text-right">
                    {u.id !== currentUser?.id && (
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer border ${
                          u.status === 'ACTIVE'
                            ? 'border-stone-300 text-stone-700 hover:bg-rose-50 hover:text-rose-800 hover:border-rose-300'
                            : 'bg-emerald-800 text-white border-transparent hover:bg-emerald-700'
                        }`}
                      >
                        {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision User Modal */}
      {isAddingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-stone-200 p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold font-serif text-stone-900 text-base">
                Provision New User Account
              </h3>
              <button
                onClick={() => setIsAddingUser(false)}
                className="text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Dr. Arthur Pendelton"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. arthur@learnflow.org"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Role Assignment</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 text-stone-900"
                >
                  <option value="STUDENT">Student</option>
                  <option value="INSTRUCTOR">Faculty Instructor</option>
                  <option value="ADMIN">System Administrator</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Department</label>
                <input
                  type="text"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingUser(false)}
                  className="px-3 py-1.5 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-700 cursor-pointer shadow-xs"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
