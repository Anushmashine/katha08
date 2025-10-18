import React, { useState } from 'react';
<<<<<<< HEAD
import { Shield, Bell, CreditCard, User, Trash2 } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    enable2FA: true,
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    // Billing
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Add logic to save changes to the backend
    console.log('Saving changes:', formData);
    // You might want to show a toast notification here
  };

  const handleDeleteAccount = () => {
    // Add confirmation modal before deleting
    console.log('Deleting account...');
=======
import { Shield, Trash2 } from 'lucide-react'; 
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

// CRITICAL IMPORTS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/auth/AuthContext';


const AccountSettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // <-- NEW state for delete button
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Existing handleChangePassword function (omitted for brevity, assume it is here)
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
        return toast.error("Please fill in all password fields.");
    }
    if (formData.newPassword !== formData.confirmPassword) {
        return toast.error("New passwords do not match.");
    }
    if (formData.newPassword.length < 8) {
        return toast.error("New password must be at least 8 characters long.");
    }
    if (formData.currentPassword === formData.newPassword) {
         return toast.error("New password cannot be the same as the current password.");
    }
    
    setIsLoading(true);

    try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4028'}/api/auth/change-password`; 

        await axios.put(apiUrl, {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
        }, {
            withCredentials: true 
        });

        toast.success("Password updated successfully. You will now be logged out.");
        
        setTimeout(() => {
            logout(); 
            navigate("/login"); 
        }, 1500);

    } catch (error) {
        const message = error.response?.data?.error || 'Failed to change password. Please check your current password.';
        toast.error(message);
    } finally {
        setIsLoading(false);
    }
  };


  // ===================================
  // ✅ NEW: handleDeleteAccount function
  // ===================================
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "WARNING: Are you sure you want to permanently delete your account? This action is irreversible and all your data will be lost."
    );

    if (!confirmDelete) return;

    setIsDeleting(true);

    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4028'}/api/auth/me`;

      // 1. Send DELETE request to the protected route
      await axios.delete(apiUrl, {
        withCredentials: true,
      });

      // 2. Success, Logout, and Redirect
      toast.success("Account successfully deleted. Goodbye!", { duration: 2500 });
      
      // Clear client-side session immediately and redirect
      logout();
      navigate("/login"); 

    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete account. Please try again.';
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
  };

  return (
    <div className="space-y-12">
<<<<<<< HEAD
      {/* Security Settings */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-gray-700" />
          <h2 className="text-2xl font-semibold text-gray-800">Security</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            label="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <div />
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            label="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mt-6 flex items-center space-x-3">
          <Checkbox
            id="enable2FA"
            name="enable2FA"
            checked={formData.enable2FA}
            onCheckedChange={(checked) => handleChange({ target: { name: 'enable2FA', type: 'checkbox', checked } })}
          />
          <label htmlFor="enable2FA" className="text-sm font-medium text-gray-700">
            Enable Two-Factor Authentication (2FA)
          </label>
        </div>
      </section>

      {/* Notification Settings */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-gray-700" />
          <h2 className="text-2xl font-semibold text-gray-800">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="emailNotifications"
              name="emailNotifications"
              checked={formData.emailNotifications}
              onCheckedChange={(checked) => handleChange({ target: { name: 'emailNotifications', type: 'checkbox', checked } })}
            />
            <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
              Receive email notifications for messages and updates
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="pushNotifications"
              name="pushNotifications"
              checked={formData.pushNotifications}
              onCheckedChange={(checked) => handleChange({ target: { name: 'pushNotifications', type: 'checkbox', checked } })}
            />
            <label htmlFor="pushNotifications" className="text-sm font-medium text-gray-700">
              Enable push notifications on your devices
            </label>
          </div>
        </div>
=======
      {/* Security Settings (Password Change Only) */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-gray-700" />
          <h2 className="text-2xl font-semibold text-gray-800">Account Security</h2>
        </div>
        
        {/* Password Change Form */}
        <form onSubmit={handleChangePassword}>
            <h3 className="text-xl font-medium text-gray-700 mb-4 border-b pb-2">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ... Input Fields ... */}
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                label="Current Password"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
              <div /> 
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                label="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <Input
                id="confirmPassword"
                name="confirmPassword" 
                type="password"
                label="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mt-8 flex justify-start">
                <Button 
                    type="submit" 
                    isLoading={isLoading} 
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : 'Update Password and Log Out'}
                </Button>
            </div>
        </form>
        
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
      </section>

      {/* Account Deletion */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <Trash2 className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Account Management</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Permanently delete your account and all associated data. This action is irreversible.
        </p>
<<<<<<< HEAD
        <Button variant="destructive" onClick={handleDeleteAccount}>
          Delete My Account
        </Button>
      </section>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
=======
        <Button 
            variant="destructive" 
            onClick={handleDeleteAccount}
            isLoading={isDeleting}
            disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete My Account'}
        </Button>
      </section>
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
    </div>
  );
};

export default AccountSettings;