import React from "react";

export function FloatingLabelInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder = " ",
  rightSlot,
}) {
  const hasValue = value != null && String(value).length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="peer input pr-10"
      />
      <label
        className={[
          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/45 transition-all",
          "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-white/60",
          hasValue ? "top-3 translate-y-0 text-xs text-white/60" : "",
        ].join(" ")}
      >
        {label}
      </label>
      {rightSlot ? (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightSlot}
        </div>
      ) : null}
    </div>
  );
}

