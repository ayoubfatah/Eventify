"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addNewEvent } from "@/lib/server-utils";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { eventQueryKeys } from "@/app/reactQuery/events/getCurrentUserEvents";

interface NewEventData {
  name: string;
  slug: string;
  city: string;
  location: string;
  date: string;
  organizerName: string;
  imageUrl: string;
  description: string;
}
const initialFormData: NewEventData = {
  name: "GITEX Global 2030",
  slug: "gitex-global-2030",
  city: "Dubai",
  location: "Dubai World Trade Centre",
  date: "2030-10-14T09:00",
  organizerName: "GITEX Global",
  imageUrl:
    "https://images.unsplash.com/photo-1760553120296-afe0e7692768?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  description:
    "GITEX Global is a major technology event bringing together innovators, startups, developers, investors, and technology leaders from around the world to explore the latest advancements in AI, cloud computing, cybersecurity, robotics, and emerging technologies.",
};

export default function AddEventPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<NewEventData>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError("");

    try {
      queryClient.invalidateQueries({ queryKey: eventQueryKeys.currentUser() });

      const createdEvent = await addNewEvent(formData as any);
      console.log("Created event:", createdEvent);
      toast.success("New Event Added successfully");
      router.push("/my-events");
      router.refresh();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating the event.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen  py-12">
      <div className="mx-auto w-full ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Add Event
          </h1>

          <p className="mt-2 text-white/50">
            Create a new event and share it with everyone.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 shadow-2xl">
          {/* Event Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
              Event Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Enter event name"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="tech-conference"
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Marrakesh"
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
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Conference Center"
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
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
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
              value={formData.organizerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="John Doe"
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
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Describe your event..."
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6  select-end block  ml-auto !w-[30%] py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
