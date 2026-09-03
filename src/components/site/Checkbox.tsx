export function Checkbox({
  id,
  checked,
  onChange,
  children,
  required,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer gap-3 text-sm leading-relaxed"
    >
      <span className="relative mt-0.5 shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          required={required}
          onChange={(e) => onChange(e.target.checked)}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-brand-black bg-white transition checked:border-brand-black checked:bg-brand-orange focus:outline-none focus:ring-4 focus:ring-brand-orange/30"
          style={error ? { borderColor: "#EB582F" } : undefined}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute inset-0 m-auto hidden h-4 w-4 stroke-brand-cream peer-checked:block"
          fill="none"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span>{children}</span>
    </label>
  );
}
