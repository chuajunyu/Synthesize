import React from 'react';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

export default function SidebarLink({ href, icon, text }: SidebarLinkProps) {
  return (
    <li>
      <a
        href={href}
        className="flex items-left justify-start rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
      >
        {icon}
        <span className="ml-4 whitespace-nowrap">{text}</span>
      </a>
    </li>
  );
}
