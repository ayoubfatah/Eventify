type DeleteConfirmModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
};

export default function DeleteConfirmModal({
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-white">Are you sure?</h2>

        <p className="mt-2 text-sm text-zinc-400">
          This action cannot be undone. This will permanently delete this item.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
