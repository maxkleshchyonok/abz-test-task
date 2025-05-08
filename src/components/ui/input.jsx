import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  label,
  value,
  onChange,
  ariaInvalid,
  ...props
}) {
  const [fileName, setFileName] = React.useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="relative w-full">
      {type === "file" ? (
        <div className="custom-file-input-wrapper">
          <label
            className={cn(
              "text-[#7E7E7E] custom-file-label flex items-center justify-start gap-3 h-[54px] w-full max-w-[380px] max-sm:w-[328px] sm:w-[380px] md:w-[380px] lg:w-[380px] rounded-[4px] border bg-transparent text-base shadow-xs transition-[color,box-shadow,border-color] outline-none cursor-pointer",
              ariaInvalid ? "border-[#CB3D40]" : "border-[#D0CFCF]",
              className
            )}
          >
            <div className="text-black px-3 rounded-l-[4px] h-[54px] border flex items-center justify-center">
              Upload
            </div>
            {fileName || "Upload your photo"}
            <input
              type="file"
              onChange={handleFileChange}
              aria-invalid={ariaInvalid || false}
              className="hidden"
              {...props}
            />
          </label>
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          data-slot="input"
          aria-invalid={ariaInvalid || false}
          className={cn(
            "peer file:text-foreground placeholder-transparent selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-[#D0CFCF] flex h-[54px] w-full max-w-[380px] max-sm:w-[328px] sm:w-[380px] md:w-[380px] lg:w-[380px] rounded-[4px] border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "aria-invalid:ring-[#CB3D40] dark:aria-invalid:ring-destructive/40 aria-invalid:border-[#CB3D40] aria-invalid:border-2",
            className
          )}
          {...props}
        />
      )}
      {label && type !== "file" && (
        <label
          className={cn(
            `absolute left-5 top-1/2 transform -translate-y-1/2 bg-[#F8F8F8] px-1 transition-all pointer-events-none 
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] 
          peer-focus:top-[-2px] peer-focus:text-xs peer-focus:translate-y-[-50%]`,
            ariaInvalid
              ? "text-[#CB3D40] peer-placeholder-shown:text-[#CB3D40] peer-focus:text-[#CB3D40]"
              : "text-[#7E7E7E] peer-placeholder-shown:text-[#7E7E7E] peer-focus:text-[#7E7E7E]"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export { Input };
