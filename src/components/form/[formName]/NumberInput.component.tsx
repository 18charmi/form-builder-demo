import * as React from 'react';
import { cn } from '@/lib/utils';

interface NumberInputProps extends React.HTMLAttributes<HTMLInputElement> { }

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(({ className, ...props }, ref) => {
    return (
        <input
            className={cn(
                'flex h-9 w-full rounded border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
export default NumberInput;
