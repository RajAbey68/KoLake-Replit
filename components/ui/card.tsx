import { ReactNode } from "react";

export function Card({children, className=""}:{children:ReactNode; className?:string}) {
  return <section className={`rounded-2xl border border-gray-200 bg-white p-5 ${className}`}>{children}</section>;
}

export function CardHeader({children, className=""}:{children:ReactNode; className?:string}) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
}

export function CardTitle({children, className=""}:{children:ReactNode; className?:string}) {
  return <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
}

export function CardContent({children, className=""}:{children:ReactNode; className?:string}) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

export function CardDescription({children, className=""}:{children:ReactNode; className?:string}) {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
}

export function Button({href, onClick, children, variant="solid", size="default"}:
  {href?:string; onClick?:()=>void; children:ReactNode; variant?: "solid"|"outline"; size?: "default"|"sm"}) {
  const base="inline-flex items-center justify-center rounded-lg font-medium transition-colors";
  const defaultSize="px-4 py-2 text-sm";
  const smallSize="px-3 py-1.5 text-xs";
  const solid="bg-emerald-600 text-white hover:bg-emerald-700";
  const outline="border border-gray-300 text-gray-700 hover:bg-gray-50";
  const cls=`${base} ${size==="sm"?smallSize:defaultSize} ${variant==="solid"?solid:outline}`;
  return href ? <a href={href} className={cls} target={href.startsWith("http")?"_blank":undefined} rel="noopener">{children}</a>
               : <button className={cls} onClick={onClick}>{children}</button>;
}
