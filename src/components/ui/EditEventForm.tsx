"use client";
import { Event } from "@/lib/types";
import { X } from "lucide-react";
import { useState } from "react";

interface EditEventFormProps {
  data: NonNullEvent;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: NonNullEvent) => void;
}

export type NonNullEvent = NonNullable<Event>;

export default function EditEventForm({
  data,
  isOpen,
  onClose,
  onSave,
}: EditEventFormProps) {
  const [formData, setFormData] = useState<NonNullEvent>(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-black rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-black/40 backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Edit Event
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Event Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Enter event name"
            />
          </div>

          {/* Organizer Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
              Organizer Name
            </label>
            <input
              type="text"
              name="organizerName"
              value={formData?.organizerName || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Enter organizer name"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
              Description
            </label>
            <textarea
              name="description"
              value={formData?.description || ""}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter event description"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData?.location || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Enter location"
            />
          </div>

          {/* Date & Time */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
              Date & Time
            </label>
            <input
              type="datetime-local"
              name="date"
              value={
                formData?.date
                  ? new Date(formData.date).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  date: e.target.value,
                }));
              }}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData?.imageUrl || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Enter image URL"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 active:scale-95"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-transparent border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
