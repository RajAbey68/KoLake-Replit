import React, { createContext, useContext, ReactNode, HTMLAttributes } from 'react';

type TabsContextValue = { value: string; onValueChange?: (value: string) => void };
const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ value, onValueChange, className = '', children, ...props }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className} {...props}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={} {...props}>
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> { value: string }
export function TabsTrigger({ value, className = '', children, ...props }: TabsTriggerProps) {
  const ctx = useContext(TabsContext);
  const selected = ctx?.value === value;
  const base = 'px-3 py-1.5 text-sm rounded-md border';
  const selectedCls = selected ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
  return (
    <button
      type=button
      onClick={() => ctx?.onValueChange?.(value)}
      className={}
      aria-pressed={selected}
      {...props}
    >
      {children as ReactNode}
    </button>
  );
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> { value: string }
export function TabsContent({ value, className = '', children, ...props }: TabsContentProps) {
  const ctx = useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return (
    <div className={className} {...props}>{children}</div>
  );
}

export default Tabs;
