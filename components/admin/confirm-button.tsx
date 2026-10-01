"use client";

export function ConfirmButton({
  message,
  label,
}: {
  message: string;
  label: string;
}) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!confirm(message)) {
          event.preventDefault();
        }
      }}
      className="rounded border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
    >
      {label}
    </button>
  );
}
