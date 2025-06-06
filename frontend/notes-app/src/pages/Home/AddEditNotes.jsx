import React, { useState } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../utils/axiosInstance';

const AddEditNotes = ({
  noteData = {},  // default empty object to avoid undefined error
  type = 'add',   // default to 'add' mode
  getAllNotes,
  onClose,
  showToastMessage
}) => {
  const [title, setTitle] = useState(noteData?.title || '');
  const [content, setContent] = useState(noteData?.content || '');
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const handleValidation = () => {
    if (!title.trim()) {
      setError('Please enter the title');
      return false;
    }

    if (!content.trim()) {
      setError('Please enter the content');
      return false;
    }

    setError(null);
    return true;
  };


  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post('/add-note', {
        title,
        content,
        tags,
      });

      if (response.data?.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to add note.');
    }
  };


  const editNote = async () => {
    try {
      const noteId = noteData._id;
  
      if (!noteId) {
        setError('Note ID is missing. Cannot update note.');
        return;
      }
  
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
  
      if (response?.data?.note) {
        showToastMessage("Note Updated successfully");
        getAllNotes();
        onClose();
      } else {
        setError('No note returned from server after update.');
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'An error occurred while updating the note.';
      setError(errorMessage);
    }
  };
  

  const handleSubmit = () => {
    if (!handleValidation()) return;

    type === 'edit' ? editNote() : addNewNote();
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleSubmit}
      >
        {type === 'edit' ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  );
};

export default AddEditNotes;
