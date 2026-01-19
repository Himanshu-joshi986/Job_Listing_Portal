import React from "react";

export function FloatingLabelInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder = " ",
  rightSlot,
  message,
  state = "default",
  autoComplete,
  ...rest
}) {
  const hasValue = value != null && String(value).length > 0;
  const stateStyles = {
    error:
      "border-rose-400/60 bg-rose-200/5 focus:border-rose-300/80 focus:bg-rose-100/5",
    success:
      "border-emerald-400/60 bg-emerald-200/5 focus:border-emerald-300/80 focus:bg-emerald-100/5",
  };

  const labelState =
    state === "error"
      ? "peer-focus:text-rose-100 text-rose-100"
      : state === "success"
        ? "peer-focus:text-emerald-100 text-emerald-100"
        : "";

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={state === "error"}
        className={[
          "peer input pr-12",
          stateStyles[state] || "",
          rightSlot ? "pr-14" : "",
        ].join(" ")}
        {...rest}
      />
      <label
        className={[
          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/45 transition-all",
          "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-white/60",
          hasValue ? "top-3 translate-y-0 text-xs text-white/60" : "",
          labelState,
        ].join(" ")}
      >
        {label}
      </label>
      {rightSlot ? (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightSlot}
        </div>
      ) : null}
      {message ? (
        <p
          className={[
            "mt-2 text-xs",
            state === "error"
              ? "text-rose-100"
              : state === "success"
                ? "text-emerald-100"
                : "text-white/60",
          ].join(" ")}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

