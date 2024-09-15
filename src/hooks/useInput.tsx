import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import "./input.css";

// input with validation
export const useInput = (placeholder: string, invalidHint: string) => {
  const ref = useRef<HTMLInputElement>(null);
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState("");

  const clear = useCallback(() => {
    setValue("");
    setValid(true);
  }, []);

  const onInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setValid(true);
  }, []);

  const input = useMemo(() => {
    return (
      <>
        <input
          ref={ref}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onInputChange}
        />
        {!valid && <div className="invalid-hint">{invalidHint}</div>}
      </>
    );
  }, [placeholder, value, valid, invalidHint, onInputChange]);

  return {
    input,
    value,
    setValid,
    clear,
    ref,
  };
};
