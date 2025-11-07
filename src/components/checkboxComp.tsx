"use client";


interface CheckboxCompProps {
  value: boolean;
  onChange: (value: boolean) => void;
  id?: string;
  label?: string;
}

export function CheckboxComp({
  value,
  onChange,
  id,
  label,
}: CheckboxCompProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label htmlFor={id} className="text-sm select-none">
        {label}
      </label>
    </div>
  );
}
