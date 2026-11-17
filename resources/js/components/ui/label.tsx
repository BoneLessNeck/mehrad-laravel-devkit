import { cn } from '@/lib/utils';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-sm leading-none font-medium text-zinc-800 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-200',
      className
    )}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;
