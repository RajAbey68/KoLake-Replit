'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  id: string;
  initialValue: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div' | 'strong';
  placeholder?: string;
  onSave?: (id: string, value: string) => void;
  adminMode?: boolean;
}

export function EditableText({ 
  id, 
  initialValue, 
  className = '', 
  element = 'p', 
  placeholder = 'Click to edit...',
  onSave,
  adminMode = false
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    try {
      if (onSave) {
        await onSave(id, value);
      }
      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  if (!adminMode) {
    const Element = element as keyof JSX.IntrinsicElements;
    return <Element className={className}>{value || initialValue}</Element>;
  }

  if (isEditing) {
    const isMultiline = element === 'div' || (value && value.length > 50);
    
    if (isMultiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full min-h-[100px] p-2 border-2 border-blue-500 rounded bg-white text-black resize-none',
            className
          )}
          placeholder={placeholder}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full p-2 border-2 border-blue-500 rounded bg-white text-black',
          className
        )}
        placeholder={placeholder}
      />
    );
  }

  const Element = element as keyof JSX.IntrinsicElements;
  return (
    <Element
      className={cn(
        'cursor-pointer hover:bg-blue-50 hover:outline hover:outline-4 hover:outline-blue-500 rounded p-2 transition-all duration-200 border-2 border-transparent hover:border-blue-500',
        saved && 'bg-green-100 outline outline-4 outline-green-500 border-green-500',
        className
      )}
      onClick={() => {
        console.log('EditableText clicked:', id, 'adminMode:', adminMode);
        setIsEditing(true);
      }}
      title={adminMode ? 'Click to edit' : undefined}
    >
      {value || initialValue || placeholder}
      {saved && <span className="ml-2 text-green-600 text-sm">✓ Saved</span>}
    </Element>
  );
}