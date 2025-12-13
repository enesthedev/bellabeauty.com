import * as React from 'react';

import { cn } from '@/lib/utils';

interface FloatingLabelInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: boolean;
}

const FloatingLabelInput = React.forwardRef<
    HTMLInputElement,
    FloatingLabelInputProps
>(({ className, type, label, error, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const isFloating = isFocused || hasValue;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(e.target.value.length > 0);
        props.onChange?.(e);
    };

    React.useEffect(() => {
        if (inputRef.current) {
            setHasValue(inputRef.current.value.length > 0);
        }
    }, []);

    return (
        <div className="group relative">
            <input
                type={type}
                id={id}
                ref={inputRef}
                data-slot="input"
                className={cn(
                    'peer flex h-12 w-full min-w-0 rounded-md border border-input bg-transparent px-3 pt-4 pb-1 text-base text-primary shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    error &&
                        !isFocused &&
                        'border-destructive text-destructive ring-destructive/20 dark:ring-destructive/40',
                    className,
                )}
                placeholder={label}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                {...props}
            />
            <label
                htmlFor={id}
                className={cn(
                    'pointer-events-none absolute left-3 text-muted-foreground transition-all duration-200 ease-out',
                    isFloating
                        ? 'top-1 text-xs'
                        : 'top-1/2 -translate-y-1/2 text-sm',
                    error && !isFocused && 'text-destructive',
                )}
            >
                {label}
            </label>
        </div>
    );
});

FloatingLabelInput.displayName = 'FloatingLabelInput';

export { FloatingLabelInput };
