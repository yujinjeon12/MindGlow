import React, { useState } from "react";

export function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  return { value, onChangeValue };
}
