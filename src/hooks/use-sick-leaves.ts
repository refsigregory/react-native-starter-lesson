import {useState} from 'react';
import {sickLeaveApi} from '../api';
import {SickLeave, CreateSickLeaveData} from '../types';

export const useSickLeaves = () => {
  const [sickLeaves, setSickLeaves] = useState<SickLeave[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMySickLeaves = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sickLeaveApi.getMySickLeaves(page, limit);
      setSickLeaves(response.data);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch sick leaves');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createSickLeave = async (data: CreateSickLeaveData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sickLeaveApi.create(data);
      setSickLeaves(prev => [response.data, ...prev]);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to create sick leave');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSickLeave = async (id: number, data: Partial<CreateSickLeaveData>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sickLeaveApi.update(id, data);
      setSickLeaves(prev =>
        prev.map(leave => (leave.id === id ? response.data : leave)),
      );
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to update sick leave');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSickLeave = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await sickLeaveApi.delete(id);
      setSickLeaves(prev => prev.filter(leave => leave.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete sick leave');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sickLeaves,
    loading,
    error,
    fetchMySickLeaves,
    createSickLeave,
    updateSickLeave,
    deleteSickLeave,
  };
};
