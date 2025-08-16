import { useEffect, useRef, useState, useMemo } from "react";

export default function SelectDropDown({
  options,
  value,
  onChange,
  placeholder = "Select…",
  className = "",
}) {
  const fullOptions = useMemo(() => {
    const hasPlaceholder = options.some((o) => o.value === "");
    return hasPlaceholder
      ? options
      : [{ value: "", label: placeholder, isPlaceholder: true }, ...options];
  }, [options, placeholder]);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    Math.max(
      0,
      fullOptions.findIndex((o) => o.value === value)
    )
  );
  const boxRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!boxRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const selected = fullOptions.find((o) => o.value === value);
  const isButtonPlaceholder = !value || selected?.isPlaceholder;

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((i) => Math.min(fullOptions.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) {
        const opt = fullOptions[activeIndex];
        if (opt) onChange(opt.value);
        setOpen(false);
      } else {
        setOpen(true);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      className={`nice-select ${open ? "is-open" : ""}`}
      ref={boxRef}
      aria-expanded={open}
    >
      <button
        type="button"
        className={`nice-select__button ${className} ${
          isButtonPlaceholder ? "is-placeholder" : ""
        }`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-controls="nice-listbox"
      >
        <span className="nice-select__label">
          {selected ? selected.label : placeholder}
        </span>
        <span className="nice-select__chevron" aria-hidden />
      </button>

      {open && (
        <div
          className="nice-select__menu"
          role="listbox"
          id="nice-listbox"
          ref={listRef}
        >
          {fullOptions.map((opt, i) => {
            const isSel = opt.value === value;
            return (
              <div
                key={`${opt.value}-${i}`}
                role="option"
                aria-selected={isSel}
                tabIndex={-1}
                className={`nice-select__option ${isSel ? "is-selected" : ""} ${
                  opt.isPlaceholder ? "is-placeholder" : ""
                }`}
                data-index={i}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
