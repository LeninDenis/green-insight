import React, { useState } from 'react';
import '../styles/EditProfileModal.css';
import UserService from '../api/UserService';
import { toast } from 'react-toastify';
import Loader from "./UI/Loader";
import { useTranslation } from 'react-i18next';

const EditProfileModal = ({ user, onClose, refresh }) => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    fname: user.fname,
    lname: user.lname
  });
  const [loading, setLoading] = useState(false);

  const handleDataEdit = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await UserService.update(user.id, data);
      if (res.status === 200) {
        toast.success(t('edit_profile.success'));
        onClose();
      } else {
        toast.error(res.data?.message || t('edit_profile.update_error'));
      }
    } catch (e) {
      toast.error(t('common.server_error'));
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async () => {
    setLoading(true);
    try {
      const res = await UserService.promote(user.id, "article.write");
      if (res.status === 200) {
        toast.success(t('edit_profile.promote_success'));
        await refresh();
        onClose();
      } else {
        toast.error(res.data?.message || t('edit_profile.update_error'));
      }
    } catch (e) {
      toast.error(t('common.server_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await UserService.verify(user.id);
      if (res.status === 200) {
        toast.success(t('edit_profile.verify_success'));
        onClose();
      } else {
        toast.error(res.data?.message || t('edit_profile.verify_error'));
      }
    } catch (e) {
      toast.error(t('common_1.server_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile">
      <button className="close-button" onClick={onClose} aria-label={t('edit_profile.close')}>
        &times;
      </button>
      {loading ? (<Loader />) : (
        <div className="edit-profile-inner">
          <h2>{t('edit_profile.title')}</h2>

          <div className="form-group">
            <label>{t('edit_profile.first_name')}</label>
            <input name="fname" type="text" value={data.fname} onChange={handleDataEdit} />
          </div>

          <div className="form-group">
            <label>{t('edit_profile.last_name')}</label>
            <input name="lname" type="text" value={data.lname} onChange={handleDataEdit} />
          </div>

          <div className="edit-profile-actions">
            {user.role === 'USER' && user.scopes && !user.scopes.includes("article.write") && (
              <button className="author-btn" onClick={handlePromote}>{t('edit_profile.become_author')}</button>
            )}
            <button className="save-btn" onClick={handleSave}>{t('edit_profile.save')}</button>
            <button className="cancel-btn" onClick={onClose}>{t('edit_profile.cancel')}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModal;
