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
    >
      {label}
    </button>
  );
}
